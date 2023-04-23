import { createSlice } from "@reduxjs/toolkit";
import { setRepoData } from "./repoThunk";

export interface RepoTypes {
    url: string | null,
    stars: number | null,
    subscribers: number | null,
    forks: number | null
}
interface initialStateTypes {
    isLoading: boolean,
    error: unknown | null,
    repo: RepoTypes
}

const initialState = {
    isLoading: false,
    error: null,
    repo: {
        url: null,
        stars: null,
        subscribers: null,
        forks: null
    }
} as initialStateTypes

const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setRepoData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(setRepoData.fulfilled, (state, {payload})=>{
                state.repo = payload;
                state.isLoading = false;
            })
            .addCase(setRepoData.rejected, (state, {payload})=>{
                state.error = payload;
                state.isLoading = false;
            })
    }

})

const repoReducer = repoSlice.reducer;

export default repoReducer