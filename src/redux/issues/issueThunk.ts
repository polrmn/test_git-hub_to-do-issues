import { createAsyncThunk } from '@reduxjs/toolkit';
import {GetIssuesParams, getIssues, } from '../../services/getIssues';
import { RootState } from '../store';

export const addIssues = createAsyncThunk(
    'issues/getIssues',
    async (params: GetIssuesParams, thunkApi) => {
        try {
            const localStorageKey = `${params.owner}/${params.repo}`;
            const savedData = localStorage.getItem(localStorageKey);
            if (savedData !== null) {
                const parsedIssues = JSON.parse(savedData).issues;
                return parsedIssues
            }
            
            const issues = await getIssues(params);
            console.log(issues);
            
            const serializedIssues = issues.map(issue => ({...issue, date: new Date(issue.date).toISOString()}));            
            return serializedIssues;
        } catch (error: any) {
            const errorMessage = error.message || 'Failed to fetch issues';
            console.log(errorMessage);
            
            return thunkApi.rejectWithValue({ error: errorMessage });
        }
    }
)

export const updateIssueStatus = createAsyncThunk(
  'issues/updateStatus',
  async ({ issueId, newStatus }: { issueId: number|null; newStatus: string }, {getState, rejectWithValue}) => {
    try {
        const state = getState() as RootState;
        const issueToUpdate = state.issues.issues.find(issue => issue.id === issueId);
        
        if (!issueToUpdate) {
        throw new Error(`No issue found with id ${issueId}`);
        }

        return {...issueToUpdate, status: newStatus};
    } catch (error) {
        console.error('updateIssueStatus thunk error:', error);
        return rejectWithValue(error);
    }
    
  },
)

