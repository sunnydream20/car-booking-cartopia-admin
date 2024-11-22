import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance'; // Import the axios instance

// Define the initial state
const initialState = {
    cars: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

// Async thunk for creating a category
export const createCar = createAsyncThunk('cars/create', async (newCar) => {
    const response = await axiosInstance.post('/api/car', newCar); // Adjust the URL accordingly
    return response.data;
});

// Async thunk for fetching categories
// get whole car
export const fetchCar = createAsyncThunk('car/fetch', async (bycat) => {
    const url = "/api/car/bycat/" + bycat;
    const response = await axiosInstance.get(url); // Adjust the URL accordingly
    return response.data;
});

// Create a slice
const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        // Add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
            })
            .addCase(fetchCar.fulfilled, (state, action) => {
                state.cars = action.payload;
            });
    },
});

// Export actions & reducer
// export const {} = categorySlice.actions; // Export actions if you add synchronous ones
export default carSlice.reducer;