from rest_framework import serializers
from .models import Bench

class BenchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bench
        fields = ('latitude', 'longitude', 'location_detail', 'orientation', 'life_cycle_status')