import { GeoPoint } from 'firebase/firestore';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface GeolocationError {
  code: number;
  message: string;
}

type SuccessCallbackType = (position: Position) => void;
type ErrorCallbackType = (error: GeolocationError) => void;

export const geolocationService = {
  getForCurrentPosition(
    successCallback: SuccessCallbackType,
    errorCallback: ErrorCallbackType
  ): void {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  },

  getGeopoint(coords: { latitude: number; longitude: number }) {
    return new GeoPoint(coords.latitude, coords.longitude);
  },
};
