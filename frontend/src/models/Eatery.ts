export default interface Eatery {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  opening_hours: {
    open_now: boolean;
  };
  price_level: number;
  rating: number;
  vicinity: string;
}
