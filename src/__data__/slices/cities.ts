import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CitiesType } from '../model/cities';

const initialState: CitiesType = {
    isLoading: false,
    error: null,
    cities: null,
    city: {
        country: 'RU',
        english: 'Moscow',
        full_english: 'Moscow (Moscow oblast, Central federalnij okrug)',
        full_name: 'Москва (Московская область, Центральный федеральный округ)',
        id: 1,
        iso: 'MOW',
        latitude: 55.7558,
        longitude: 37.6176,
        name: 'Москва',
        time_zone: 3,
    },
};

export const fetchCities = createAsyncThunk('cities/fetchCities', async (name: string) => {
    const response = await axios.get('https://htmlweb.ru/geo/api.php', {
        params: {
            json: '',
            city_name: name,
            fields: 'id,name,latitude,longitude,time_zone,english,country,iso,full_english,full_name,',
            // api_key: process.env.API_KEY,
        },
        transformResponse: [
            (data) => {
                const response = JSON.parse(data);
                return Object.values(response).filter((item) => typeof item === 'object');
            },
        ],
    });
    return response.data;
});

const slice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        updateCity: (state, action) => {
            state.city = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cities = action.payload;
                state.error = null;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.cities = null;
            });
    },
});

export const { actions: citiesActions, reducer: citiesReducer } = slice;
