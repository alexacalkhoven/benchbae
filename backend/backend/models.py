from django.db import models

class Bench(models.Model):
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    location_detail = models.CharField(max_length=200, null=False)
    orientation = models.CharField(max_length=200, null=False)
    life_cycle_status = models.CharField(max_length=200, null=False)