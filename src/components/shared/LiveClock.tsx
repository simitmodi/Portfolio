
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Haze, Moon } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherData {
    temperature: number;
    weathercode: number;
    is_day: number;
}

const WeatherIcon = ({ weathercode, isDay }: { weathercode: number, isDay: number }) => {
    if (weathercode === 0) {
        return isDay === 1 ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
    }
    if (weathercode >= 1 && weathercode <= 3) return <Cloud className="w-5 h-5" />; // Mainly clear, partly cloudy, and overcast
    if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) return <CloudRain className="w-5 h-5" />; // Drizzle, Rain, and Showers
    if (weathercode >= 71 && weathercode <= 77) return <CloudSnow className="w-5 h-5" />; // Snow
    if (weathercode >= 95 && weathercode <= 99) return <CloudLightning className="w-5 h-5" />; // Thunderstorm
    return <Haze className="w-5 h-5" />; // Default for fog, etc.
}

export const LiveTime = () => {
    const [dateTime, setDateTime] = useState({ time: '', date: '' });
    const [desktopTime, setDesktopTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            const mobileTimeOptions: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            };

            const desktopTimeOptions: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };

            setDateTime({
                time: now.toLocaleTimeString('en-IN', mobileTimeOptions),
                date: format(now, "do MMMM, yyyy")
            });

            setDesktopTime(now.toLocaleTimeString('en-IN', desktopTimeOptions));
        };

        if (typeof window !== 'undefined') {
            updateClock();
            const timerId = setInterval(updateClock, 1000);
            return () => clearInterval(timerId);
        }
    }, []);

    return (
        <div className="flex items-center justify-center font-headline">
            {/* Mobile Time */}
            <div className="md:hidden flex h-10 items-center justify-center px-4 text-xs font-mono rounded-full border border-border/40 bg-background/5 backdrop-blur-xl shadow-ultimate">
                {dateTime.time ? <span>{dateTime.time}</span> : <div className="h-4 w-10 bg-muted/50 rounded-md animate-pulse" />}
            </div>
            {/* Desktop Time & Date */}
            <div className="hidden md:flex flex-col items-center justify-center h-16 w-44 p-2 text-center">
                {desktopTime ? (
                    <>
                        <span className="text-xl">{desktopTime}</span>
                        <span className="text-xs text-foreground/80">{dateTime.date}</span>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <div className="h-6 w-32 bg-muted/50 rounded-md animate-pulse" />
                        <div className="h-4 w-28 bg-muted/50 rounded-md animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
};

export const LiveWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Fetching weather for Ahmedabad, India
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=23.03&longitude=72.58&current_weather=true');
                const data = await response.json();
                if (data && data.current_weather) {
                    setWeather({
                        temperature: data.current_weather.temperature,
                        weathercode: data.current_weather.weathercode,
                        is_day: data.current_weather.is_day,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };

        if (typeof window !== 'undefined') {
            fetchWeather();
            // Update weather every 15 minutes
            const timerId = setInterval(fetchWeather, 60 * 15 * 1000);
            return () => clearInterval(timerId);
        }
    }, []);

    return (
        <div className="flex items-center justify-center font-headline">
            {/* Mobile / Default Weather Pill */}
            <div className="md:hidden flex h-10 w-16 items-center justify-center rounded-full border border-border/40 bg-background/5 backdrop-blur-xl text-sm font-mono px-2 shadow-ultimate">
                {weather ? (
                    <div className="flex items-center gap-1">
                        <span>{Math.round(weather.temperature)}°C</span>
                    </div>
                ) : (
                    <div className="h-5 w-8 bg-muted/50 rounded-md animate-pulse" />
                )}
            </div>

            {/* Desktop Weather (inside combined pill) */}
            <div className="hidden md:flex h-16 w-24 items-center justify-center text-xl px-2">
                {weather ? (
                    <div className="flex items-center gap-2">
                        <WeatherIcon weathercode={weather.weathercode} isDay={weather.is_day} />
                        <span>{Math.round(weather.temperature)}°C</span>
                    </div>
                ) : (
                    <div className="h-6 w-16 bg-muted/50 rounded-md animate-pulse" />
                )}
            </div>
        </div>
    );
};
