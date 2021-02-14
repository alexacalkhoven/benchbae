from .serializers import BenchSerializer
from .models import Bench
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.core import serializers
import csv
import json

# Create your views here.

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
