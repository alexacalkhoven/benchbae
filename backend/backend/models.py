from django.db import models

class Bench(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    location_detail = models.CharField(max_length=200)
    orientation = models.CharField(max_length=10)
    life_cycle_status = models.CharField(max_length=200)