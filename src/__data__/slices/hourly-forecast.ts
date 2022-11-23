import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CityType } from '../model/cities';
import { HourlyForecastType, HourlyDataType, HourlyUnitsType, WeatherType } from '../model/forecast';

const initialState: WeatherType<HourlyForecastType<HourlyUnitsType, HourlyDataType>> = {
    isLoading: false,
    error: null,
    data: null,
};

export const fetchHourlyForecast = createAsyncThunk(
    'hourly/fetchHourlyForecast',
    async ({ start, end, location }: { start: string; end: string; location: CityType }) => {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: location.latitude,
                longitude: location.longitude,
                hourly: 'temperature_2m,weathercode',
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
    name: 'hourly',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHourlyForecast.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchHourlyForecast.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { reducer: hourlyReducer, actions: hourlyActions } = slice;
