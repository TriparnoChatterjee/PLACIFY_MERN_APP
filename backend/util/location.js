const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = "8c4eeabdba4e43598f88e678e182ef32";

const getCoordsForAddress = async (address) => {

//   return {
//     lat: 40.784474,
//     lng: -73.98712,
//   };
const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&format=json&apiKey=${API_KEY}`);
const data = response.data;
if(!data || data['results'].length === 0 ){
    const error = new HttpError('Could not find Location',422);
    throw(error);
}
// console.log(data);
 const lat = data['results'][0]['lat'];
 const lon = data['results'][0]['lon'];
 const coordinates = {
    lat:lat,
    lng:lon,
 }
 return coordinates;
};
module.exports = getCoordsForAddress;