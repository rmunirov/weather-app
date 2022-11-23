import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CityType } from '../model/cities';
import { DailyDataType, DailyForecastType, DailyUnitsType, WeatherType } from '../model/forecast';

const initialState: WeatherType<DailyForecastType<DailyUnitsType, DailyDataType>> = {
    isLoading: false,
    error: null,
    data: null,
};

const createGenericSlice = (name: string) => {
    const fetchDailyForecast = createAsyncThunk(
        `${name}/fetchDailyForecast`,
        async ({ start, end, location }: { start: string; end: string; location: CityType }) => {
            const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,windspeed_10m_max',
                    current_weather: true,
                    windspeed_unit: 'mph',
                    // TODO change to passed parameter
                    timezone: 'Europe/Moscow',
                    start_date: start,
                    end_date: end,
                },
            });
            return response.data;
        },
    );
    const slice = createSlice({
        name,
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchDailyForecast.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(fetchDailyForecast.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload;
                })
                .addCase(fetchDailyForecast.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload as string;
                });
        },
    });
    return { slice, fetchDailyForecast };
};

const daySlice = createGenericSlice('day');
const daysSlice = createGenericSlice('days');

export const { reducer: dayReducer, actions: dayActions } = daySlice.slice;
export const fetchDayForecast = daySlice.fetchDailyForecast;

export const { reducer: daysReducer, actions: daysActions } = daysSlice.slice;
export const fetchDaysForecast = daysSlice.fetchDailyForecast;
