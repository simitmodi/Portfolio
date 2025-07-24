
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

export const LiveTime = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            };
            setTime(now.toLocaleTimeString('en-IN', timeOptions));
        };
        
        if (typeof window !== 'undefined') {
            updateClock();
            const timerId = setInterval(updateClock, 1000);
            return () => clearInterval(timerId);
        }
    }, []);

    return (
        <div className="flex h-10 items-center justify-center rounded-full border border-border/40 bg-background/5 backdrop-blur-xl px-4 text-xs font-mono shadow-lg">
            {time ? <span>{time}</span> : <div className="h-4 w-10 bg-muted/50 rounded-md animate-pulse" />}
        </div>
    );
};

export const LiveWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.03&longitude=72.58&current_weather=true');
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
            fetchWeather();
            const timerId = setInterval(fetchWeather, 60 * 15 * 1000); // Update every 15 mins
            return () => clearInterval(timerId);
        }
    }, []);
    
    return (
        <div className="flex h-12 w-16 items-center justify-center rounded-full border border-border/40 bg-background/5 backdrop-blur-xl text-sm font-mono px-2 shadow-lg">
           {weather ? (
                <div className="flex items-center gap-1">
                    <WeatherIcon weathercode={weather.weathercode} />
                    <span>{Math.round(weather.temperature)}°C</span>
                </div>
            ) : (
                <div className="h-5 w-8 bg-muted/50 rounded-md animate-pulse" />
            )}
        </div>
    );
};
