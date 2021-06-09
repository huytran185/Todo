import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/Tasks/taskSlice';

const rootReducer={
    tasks: taskReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;