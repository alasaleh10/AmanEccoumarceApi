const calculateDistance = ( lat2, lon2) => {
    const R = 6371; 
    const lat1=15.937052050103414;
    const lon1=48.79237283779519;
    const toRadians = (degree) => degree * (Math.PI / 180); 
  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; 
    return   Math.floor( distance *500);
  };

  module.exports = calculateDistance
  