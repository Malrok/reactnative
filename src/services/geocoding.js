export const API_KEY = 'AIzaSyCJhO9SPTit2418hkttbpn_KFxL-G3yyPM';

const LATITUDE = '$LATITUDE';
const LONGITUDE = '$LONGITUDE';
const ADDRESS = '$ADDRESS';
const GEOCODE_POSITION_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + LATITUDE + ',' + LONGITUDE + '&sensor=true&key=' + API_KEY;
const GEOCODE_ADDRESS_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + ADDRESS + '&key=' + API_KEY;

export class Geocoder {

  static geocodePosition(lat, lng) {
    return new Promise((resolve, reject) => {
      fetch(GEOCODE_POSITION_URL.replace(LATITUDE, lat).replace(LONGITUDE, lng))
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson.results[0]))
        .catch(err => reject(err));
    });
  }

  static geocodeAddress(address) {
    return new Promise((resolve, reject) => {
      fetch(GEOCODE_ADDRESS_URL.replace(ADDRESS, address))
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson.results))
        .catch(err => reject(err));
    });
  }

}
