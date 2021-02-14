export default interface Bench {
  id: number;
  latitude: number;
  longitude: number;
  location_detail?: string;
  orientation: string;
  lifeCycleStatus: string;
};