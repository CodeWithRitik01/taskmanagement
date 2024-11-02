import { createSlice } from "@reduxjs/toolkit"

const INITIALSTATE = {
    user:null,
    tasks:[]
}

const mainSlice = createSlice({
    name:"tasks",
    initialState:INITIALSTATE,
    reducers:{
        setUser:(state, action)=>{
           state.user = action.payload;
        },
        setTasks:(state, action) =>{
            const task = action.payload;
            if(task.length > 0){
                task.map((ele) => state.tasks.push(ele))
            }else{
                state.tasks = []
            }
        },
        updateTask:(state, action) =>{
            const { id } = action.payload;
            state.tasks = state.tasks.map((ele) => {
                if (ele.id === id) {
                    return {
                        ...ele,
                        status: ele.status === "pending" ? "In Progress" :
                                ele.status === "In Progress " ? "completed" : "pending"
                    };
                }else{
                    return ele;

                }
            });
     
        }
    },
})

export const mainReducer = mainSlice.reducer;
export const actions = mainSlice.actions;

export const mainSelector = (state) => state.mainReducer;