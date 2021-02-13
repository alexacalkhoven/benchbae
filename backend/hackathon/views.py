from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from rest_framework import viewsets
# Create your views here.

class PopulateDatabase(viewsets.ViewSet):
    def post(self, request, format=None):
        df = pd.read_csv("../data/Parks_Seating.csv")
        for row in df.itertuples(index=False):
            print(row)
    @classmethod
    def get_extra_actions(cls):
        return []

    

