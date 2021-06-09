import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios-task';

export const fetchTask = createAsyncThunk(
    'tasks/fetchTask',
    async ()=>{
        return axios.get('/tasklist.json')
        .then(response=>response.data)
        .catch(error=>console.log(error))
    }
)
export const postNewTask = createAsyncThunk(
    'tasks/postNewTask',
    async(task)=>{
        const data ={
            name: task,
        }
        return axios.post('/tasklist.json',data)
        .then(response=>[response.data, task])
        .catch(error=>console.log(error))
    }
)
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async(id)=>{
        return axios.delete(`/tasklist/${id}.json`)
        .then(response=> [response.data, id])
        .catch(error=>console.log(error))
    }
)
export const editTask = createAsyncThunk(
    'tasks/editTask',
    async(task)=>{
        const data ={
            name: task[1],
        }
        return axios.put(`/tasklist/${task[0]}.json`, data)
        .then(response=> [response.data, task[0], data])
        .catch(error=>console.log(error))
    }
)
const task = createSlice({
    name: 'tasks',
    initialState:{ list: {}, loading: 'loading' },
    // initialState:'',
    reducers:{
        addTask: (state,action)=>{
            state.list.push(action.payload)
        },
        removeTask:(state,action)=>{
            delete state.list[action.payload];
            // return state.list.filter((task, id)=>id !== action.payload); 
            //return state since we create new state by using filter
        },
        updateTask:(state,action)=>{
            const id = state.list.findIndex((task, id)=>id === action.payload[0]);
            if(id >= 0){
                state.list[id] = action.payload[1];
            }
        }
    },
    extraReducers:{
        [fetchTask.pending]: (state,action)=>{
            state.loading = 'loading'
        },
        [fetchTask.fulfilled]: (state, {payload})=>{
            state.list = payload;
            state.loading = 'success'
        },
        [fetchTask.rejected]:(state,action)=>{
            state.loading = 'failed'
        },
        [postNewTask.pending]: (state,action)=>{
            state.loading = 'loading'
        },
        [postNewTask.fulfilled]: (state, action)=>{
            state.list[action.payload[0]['name']] ={name: action.payload[1]} ;
            state.loading = 'success'
        },
        [postNewTask.rejected]:(state,action)=>{
            state.loading = 'failed'
        },
        [deleteTask.pending]: (state,action)=>{
            state.loading = 'loading'
        },
        [deleteTask.fulfilled]: (state, action)=>{
            delete state.list[action.payload[1]];
            state.loading = 'success'
        },
        [deleteTask.rejected]:(state,action)=>{
            state.status = 'failed'
        },
        [editTask.pending]: (state,action)=>{
            state.loading = 'loading'
        },
        [editTask.fulfilled]: (state, action)=>{
            state.list[action.payload[1]] =action.payload[2] ;
            // console.log(action)
            state.loading = 'success'
        },
        [editTask.rejected]:(state,action)=>{
            state.status = 'failed'
        },
    }
})

const {reducer, actions} = task;
export const {addTask, removeTask, updateTask} = actions;
export default reducer