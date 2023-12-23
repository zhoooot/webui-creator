import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import your reducers here
import { reducer as exampleReducer } from './exampleSlice';
import { reducer as anotherReducer } from './anotherSlice';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  example: exampleReducer,
  another: anotherReducer,
});

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Create the store with the root reducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
