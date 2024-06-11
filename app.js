const { ipToGeolocation } = require('location-from-ip');

const ipAddresses ='104.21.41.6';

const location = ipToGeolocation(ipAddresses).then(function (location) {
    return location.city 
  });
console.log(location);