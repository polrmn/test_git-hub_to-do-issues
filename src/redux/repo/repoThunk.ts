import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetIssuesParams } from "../../services/getIssues";
import { getRepo } from "../../services/getRepo";

export const setRepoData = createAsyncThunk(
  'repo/getRepo',
  async (params: GetIssuesParams, thunkApi) => {
    try {
      const repo = await getRepo(params);
      return repo;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch repo';
      return thunkApi.rejectWithValue({ error: errorMessage });
    }
  }
);





