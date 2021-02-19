from .serializers import BenchSerializer
from .models import Bench
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.core import serializers
from .computation import CoordinateHandler
import os
import requests
import csv
import json

class ClosestEatery(APIView):
    """
        Handles getting the closest restaurant from the user after the user hits the go button.
        
        Params:
        -------
        APIView : Django superclass that points user requests to the right endpoint.
    """

    def get(self, request, format=None):
        """
            Returns the single closest restaurant to the user's coordinates.

            Params:
            -------
            request : JSON request from frontend.
        """
        user_long = float(request.query_params["long"])
        user_lat = float(request.query_params["lat"])
        res = {}
        rad = 10000

        # try finding results close first, and increase radius if no results are found
        while rad <= 50000:
            print("Search with radius = " + str(rad))
            res = self.findPlace(lat=user_lat, long=user_long, radius=rad)
            if(len(res["results"]) != 0): break
            rad += 10000

        # check if no results were found
        if len(res["status"]) == 'ZERO_RESULTS':
            # no results were found at any radius
            print("No eatery results were found.")
            return Response(None)
        
        # find the closest out of the fetched results
        comp = CoordinateHandler()
        # default values
        min_dist = -1
        closest_eatery = None
        # traverse benches in database, calc distance for each one
        for result in res["results"]:
            dist = comp.distance(float(result["geometry"]["location"]["lat"]), float(result["geometry"]["location"]["lng"]), user_lat, user_long)
            if(min_dist == -1 or min_dist > dist):
                min_dist = dist
                closest_eatery = result
        return Response(closest_eatery)

    def findPlace(self, lat, long, radius=10000):
        """
            Calls a nearbysearch request to Google's Places API.

            Params:
            -------
            lat : latitude to search at.
            long : longitude to search at.
            radius : radius to search within. Defaults to max (50,000 meters).
        """
        type = "restaurant"
        opennow = "" # can be changed to fetch only open restaurants
        APIKEY = os.getenv("GOOGLE_API_KEY")
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius={radius}&type={type}&opennow={opennow}&key={APIKEY}".format(lat = lat, long = long, radius = radius, type = type, opennow = opennow, APIKEY = APIKEY)
        response = requests.get(url)
        res = json.loads(response.text)
        #print(len(res))
        #print(res)
        return res

class ClosestBench(APIView):
    """
        Handles getting the closest bench from the user after the user hits the go button.
        
        Params:
        -------
        APIView : Django superclass that points user requests to the right endpoint.
    """

    def get(self, request, format=None):
        """
            Returns the single closest west-facing bench to the user's coordinates.

            Params:
            -------
            request : JSON request from frontend.
        """
        comp = CoordinateHandler()
        user_long = float(request.query_params["long"]) # convert to float from string
        user_lat = float(request.query_params["lat"])
        bench_list = Bench.objects.all().values() # gets all benches from DB
        # default values
        min_dist = -1
        closest_bench = None
        # traverse benches in database, calc distance for each one
        for bench in bench_list:
            dist = comp.distance(float(bench['latitude']), float(bench['longitude']), user_lat, user_long)
            if(min_dist == -1 or min_dist > dist):
                min_dist = dist
                closest_bench = bench
        return Response(closest_bench)


class PopulateDatabase(APIView):
    """
        Handles populating the DB.
        
        Params:
        -------
        APIView : Django superclass that points user requests to the right endpoint.
    """

    def post(self, request, format=None):
        """
            Wipes then populates the DB with bench data.

            Params:
            -------
            request : JSON request from frontend.
        """
        Bench.objects.all().delete()
        benches = []
        index = 0
        print('Deleted all benches')

        with open('data/benches.csv') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if(row["ORIENTATION"] == "NW" or row["ORIENTATION"] == "W" or row["ORIENTATION"] == "SW"): # get only west benches
                    bench = Bench(
                        pk=index,
                        latitude=row['latitude'],
                        longitude=row['longitude'],
                        location_detail=row['LOCATION_DETAIL'],
                        orientation=row['ORIENTATION'],
                        life_cycle_status=row['LIFE_CYCLE_STATUS']
                    )
                    benches.append(bench)
                index += 1
        
        print('Created all benches from csv file')
        Bench.objects.bulk_create(benches)
        serializer = BenchSerializer(Bench.objects.all(), many=True)

        return Response(serializer.data)

class BenchView(viewsets.ReadOnlyModelViewSet):
    """
        Handles benches in the DB.
        
        Params:
        -------
        viewsets.ReadOnlyModelViewSet : Django superclass that handles DB usage.
    """
    serializer_class = BenchSerializer
    queryset = Bench.objects.all()