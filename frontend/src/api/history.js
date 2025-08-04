// Historical weather data API service
const fetchTemperatureHistory = async () => {
  try {
    // Open-Meteo API for historical weather data (last 24 hours)
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=30.4278&longitude=-9.5981&hourly=temperature_2m&past_days=1&forecast_days=0'
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Get last 10 hours of temperature data
    const timestamps = data.hourly.time.slice(-10);
    const temperatures = data.hourly.temperature_2m.slice(-10);
    
    // Format timestamps for display
    const lastTimestamps = timestamps.map(time => {
      const date = new Date(time);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    });
    
    return {
      lastTimestamps,
      lastTemperatures: temperatures
    };
  } catch (error) {
    console.error('Error fetching temperature history:', error);
    // Return fallback data if API fails
    return generateFallbackTemperatureHistory();
  }
};

const generateFallbackTemperatureHistory = () => {
  const lastTimestamps = [];
  const lastTemperatures = [];
  const now = new Date();
  
  for (let i = 9; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
    lastTimestamps.push(time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }));
    lastTemperatures.push(Math.round(20 + Math.sin(i / 3) * 8 + Math.random() * 4));
  }
  
  return { lastTimestamps, lastTemperatures };
};

// Keep the original function for other components that might use it
const fetchHistoricalData = async () => {
  try {
    // Open-Meteo API for historical weather data
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=30.4278&longitude=-9.5981&hourly=temperature_2m,relative_humidity_2m&past_days=7&forecast_days=0'
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform data for charts
    const timestamps = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;
    const humidity = data.hourly.relative_humidity_2m;
    
    const historicalData = timestamps.map((time, index) => ({
      time: new Date(time).toLocaleString(),
      temperature: temperatures[index],
      humidity: humidity[index]
    }));
    
    return historicalData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    // Return fallback data if API fails
    return generateFallbackHistoricalData();
  }
};

const generateFallbackHistoricalData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 168; i >= 0; i--) { // 7 days * 24 hours
    const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
    data.push({
      time: time.toLocaleString(),
      temperature: Math.round(20 + Math.sin(i / 12) * 10 + Math.random() * 5),
      humidity: Math.round(50 + Math.cos(i / 8) * 20 + Math.random() * 10)
    });
  }
  
  return data;
};

export default fetchTemperatureHistory;
export { fetchHistoricalData };
