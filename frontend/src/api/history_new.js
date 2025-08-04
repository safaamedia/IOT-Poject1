import { API_BASE_URL } from '../config.js';
import authService from '../services/authService.js';

const fetchTemperatureHistory = async () => {
  try {
    // Use authenticated backend endpoint instead of direct API call
    const response = await authService.apiCall('/api/history');

    if (!response.ok) {
      console.error("Error fetching temperature history:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // The backend already processes and returns the historical temperature data
    return {
      timestamps: data.timestamps,
      temperatures: data.temperatures,
      count: data.count || data.timestamps?.length || 0
    };

  } catch (error) {
    console.error("Failed to fetch temperature history:", error);
    
    // Fallback to external API if backend fails (for development)
    try {
      const fallbackResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=30.4202&longitude=-9.5982&forecast_days=1&timezone=auto&hourly=temperature_2m`
      );

      if (!fallbackResponse.ok) {
        throw new Error("Fallback API also failed");
      }

      const fallbackData = await fallbackResponse.json();
      
      // Process fallback data
      const timestamps = fallbackData.hourly.time;
      const temperatures = fallbackData.hourly.temperature_2m;

      // Calculate the last 10 hours
      const startTime = new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString();

      // Find the index of the timestamp that is equal or greater than the start time
      const startIndex = timestamps.findIndex(
        (timestamp) => new Date(timestamp) >= new Date(startTime)
      );

      // Slice only the last 10 hours of data
      const lastTimestamps = timestamps.slice(startIndex, startIndex + 10);
      const lastTemperatures = temperatures.slice(startIndex, startIndex + 10);

      return {
        timestamps: lastTimestamps,
        temperatures: lastTemperatures,
        count: lastTimestamps.length
      };

    } catch (fallbackError) {
      console.error("Both backend and fallback failed:", fallbackError);
      throw fallbackError;
    }
  }
};

export default fetchTemperatureHistory;
