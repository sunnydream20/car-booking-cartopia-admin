import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import carReducer from './carSlice';


const store = configureStore({
    reducer: {
        categories: categoryReducer,
        cars: carReducer
    },
});

export default store;