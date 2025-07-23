
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Haze } from 'lucide-react';

interface WeatherData {
  temperature: number;
  weathercode: number;
}

const WeatherIcon = ({ weathercode }: { weathercode: number }) => {
  if (weathercode === 0) return <Sun className="w-5 h-5" />; // Clear sky
  if (weathercode >= 1 && weathercode <= 3) return <Cloud className="w-5 h-5" />; // Mainly clear, partly cloudy, and overcast
  if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) return <CloudRain className="w-5 h-5" />; // Drizzle, Rain, and Showers
  if (weathercode >= 71 && weathercode <= 77) return <CloudSnow className="w-5 h-5" />; // Snow
  if (weathercode >= 95 && weathercode <= 99) return <CloudLightning className="w-5 h-5" />; // Thunderstorm
  return <Haze className="w-5 h-5" />; // Default for fog, etc.
}

const LiveClock = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Clock update logic
    const updateClock = () => {
      const now = new Date();
      
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      setTime(now.toLocaleTimeString('en-IN', timeOptions));
      setDate(now.toLocaleDateString('en-IN', dateOptions));
    };
    
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        // Using Open-Meteo API for Mumbai, India. No API key needed.
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.88&current_weather=true');
        const data = await response.json();
        if (data && data.current_weather) {
            setWeather({
                temperature: data.current_weather.temperature,
                weathercode: data.current_weather.weathercode,
            });
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };


    if (typeof window !== 'undefined') {
      updateClock(); // Set initial time
      fetchWeather(); // Fetch initial weather

      const clockTimerId = setInterval(updateClock, 1000); // Update clock every second
      const weatherTimerId = setInterval(fetchWeather, 60 * 15 * 1000); // Update weather every 15 minutes

      return () => {
        clearInterval(clockTimerId);
        clearInterval(weatherTimerId);
      };
    }
  }, []);

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 p-3 rounded-lg shadow-2xl",
      "bg-background/70 backdrop-blur-lg",
      "text-foreground text-sm font-mono text-right"
    )}>
      {time ? (
        <>
          <div className="flex items-center justify-end gap-2">
            {weather && (
              <>
                <WeatherIcon weathercode={weather.weathercode} />
                <span>{Math.round(weather.temperature)}°C</span>
                <span>|</span>
              </>
            )}
            <span>{time}</span>
          </div>
          <div className="text-xs opacity-80 mt-1">{date}</div>
        </>
      ) : (
        <div className="text-xs opacity-80">Loading...</div>
      )}
    </div>
  );
};

export default LiveClock;
