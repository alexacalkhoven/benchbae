from math import cos, asin, sqrt

class CoordinateHandler():
    """
        Handles all calculations done with coordinates.
    """

    def distance(self, lat1, lon1, lat2, lon2):
        """
            Returns the distance between two coordinates in km.

            Params:
            -------
            lat1 : latitude of the first coordinate.
            lon1 : longitude of the first coordinate.
            lat2 : latitude of the second coordinate.
            lon2 : longitude of the second coordinate.
        """
        p = 0.017453292519943295
        a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p)*cos(lat2*p) * (1-cos((lon2-lon1)*p)) / 2
        return 12742 * asin(sqrt(a))