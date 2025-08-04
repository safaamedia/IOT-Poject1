const fetchLatestTemperature = async () => {
  try {
    // Fallback to external API (skip backend for now to avoid blocking)
    const fallbackResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=30.4202&longitude=-9.5982&current_weather=true&timezone=auto`
    );

    if (!fallbackResponse.ok) {
      throw new Error("API request failed");
    }

    const fallbackData = await fallbackResponse.json();
    
    // Process data
    const temperature = fallbackData.current_weather.temperature;
    const latestTemperature = localStorage.getItem("latestTemperature") || 0;

    let trend = "";
    if (temperature > latestTemperature) {
      trend = "up";
    } else if (temperature < latestTemperature) {
      trend = "down";
    } else {
      trend = "stable";
    }

    localStorage.setItem("latestTemperature", temperature);

    return {
      temperature: temperature,
      trend: trend,
      time: fallbackData.current_weather.time,
      location: 'Agadir, Morocco'
    };

  } catch (error) {
    console.error("Failed to fetch temperature:", error);
    // Return mock data to prevent UI breaking
    return {
      temperature: 25,
      trend: "stable",
      time: new Date().toISOString(),
      location: 'Agadir, Morocco (Mock Data)'
    };
  }
};

export default fetchLatestTemperature;
