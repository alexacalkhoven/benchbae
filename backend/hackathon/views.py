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

# Create your views here.

class ClosestEatery(APIView):

    def get(self, request, format=None):
        user_long = float(request.query_params["long"])
        user_lat = float(request.query_params["lat"])
        res = self.findPlace(lat=user_lat, long=user_long)
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

    def findPlace(self, lat, long, radius=50000):
        type = "restaurant"
        opennow = ""
        APIKEY = os.getenv("GOOGLE_API_KEY")
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius={radius}&type={type}&opennow={opennow}&key={APIKEY}".format(lat = lat, long = long, radius = radius, type = type, opennow = opennow, APIKEY = APIKEY)
        response = requests.get(url)
        res = json.loads(response.text)
        return res

class ClosestBench(APIView):
    def get(self, request, format=None):
        comp = CoordinateHandler()
        user_long = float(request.query_params["long"])
        user_lat = float(request.query_params["lat"])
        bench_list = Bench.objects.all().values()
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


class BenchView(viewsets.ReadOnlyModelViewSet):
    serializer_class = BenchSerializer
    queryset = Bench.objects.all()

class PopulateDatabase(APIView):
    def post(self, request, format=None):
        Bench.objects.all().delete()
        benches = []
        index = 0
        print('Deleted all benches')

        with open('data/benches.csv') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if(row["ORIENTATION"] == "NW" or row["ORIENTATION"] == "W" or row["ORIENTATION"] == "SW"):
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
