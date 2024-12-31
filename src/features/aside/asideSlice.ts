import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: boolean = false


export const asideSlice = createSlice({
    name: 'asideSlice',
    initialState,
    reducers: {
        openAside: (_state, action: PayloadAction<boolean>) => {
            return action.payload;
        }
    }
})


export const { openAside } = asideSlice.actions;
export const userSelector = (state: RootState) => state.asideReducer;
export default asideSlice.reducer;