export type WeatherType<Type> = {
    isLoading: boolean;
    error: string | null;
    data: Type | null;
};

export type HourlyForecastType<Units, Data> = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: Units;
    hourly: Data;
};

export type DailyForecastType<Units, Data> = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: CurrentWeatherType;
    daily_units: Units;
    daily: Data;
};

export type CurrentWeatherType = {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
};

export type DailyDataType = {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    rain_sum: number[];
    windspeed_10m_max: number[];
};

export type DailyUnitsType = {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    rain_sum: string;
    windspeed_10m_max: string;
};

export type HourlyDataType = {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
};

export type HourlyUnitsType = {
    time: string;
    temperature_2m: string;
    weathercode: string;
};
