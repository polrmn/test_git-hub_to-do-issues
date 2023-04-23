import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addIssues, updateIssueStatus } from './issueThunk'

export interface IssueTypes  {
    id: number | null,
    title: string | null,
    number: number | null,
    user: string | null,
    date: string,
    comments: number | null,
    status: string
}

interface initialStateTypes {
    isLoading: boolean,
    issues: IssueTypes[],
    error: Error | null | unknown
}

const initialIssue = {
    id: null,
    title: null,
    number: null,
    user: null,
    date: '',
    comments: null,
    status: ''
} as IssueTypes

const initialState = {
    isLoading: false,
    issues: [initialIssue],
    error: null
} as initialStateTypes

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addIssues.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(addIssues.fulfilled, (state, {payload})=>{
                state.issues = payload;
                state.isLoading = false;
            })
            .addCase(addIssues.rejected, (state, {payload})=>{
                state.error = payload;
                state.isLoading = false;
            })
            .addCase(updateIssueStatus.fulfilled, (state, action: PayloadAction<IssueTypes>) => {
                const index = state.issues.findIndex((issue) => issue.id === action.payload.id);                

                if (index !== -1) {
                state.issues[index].status = action.payload.status;
                }
            })
            .addCase(updateIssueStatus.rejected, (state, {payload})=>{
                state.error = payload;
            })
    }

})

const issuesReducer = issuesSlice.reducer;

export default issuesReducer