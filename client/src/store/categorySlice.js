import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance'; // Import the axios instance

// Define the initial state
const initialState = {
    categories: [],
    sliderImgs: [],
    banners: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

// Async thunk for creating a category
export const createCategory = createAsyncThunk('categories/create', async (newCategory) => {
    const response = await axiosInstance.post('/api/category', newCategory); // Adjust the URL accordingly
    return response.data;
});

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk('category/fetch', async () => {
    const response = await axiosInstance.get('/api/category'); // Adjust the URL accordingly
    return response.data;
});

// Async thunk for fetching home sliders
export const fetchHomeSliders = createAsyncThunk('slider/fetch', async () => {
    const response = await axiosInstance.get('/api/homesliders'); // Adjust the URL accordingly
    return response.data;
});

// Async thunk for fetching home sliders
export const fetchHomeBanners = createAsyncThunk('banner/fetch', async () => {
    const response = await axiosInstance.get('/api/homebanners'); // Adjust the URL accordingly
    return response.data;
});

// Create a slice
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        // Add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchHomeSliders.fulfilled, (state, action) => {
                state.sliderImgs = action.payload;
            })
            .addCase(fetchHomeBanners.fulfilled, (state, action) => {
                state.banners = action.payload;
            })
            ;
    },
});

// Export actions & reducer
// export const {} = categorySlice.actions; // Export actions if you add synchronous ones
export default categorySlice.reducer;