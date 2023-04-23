import { IssueTypes } from './../redux/issues/issuesSlice';

export const formatResponseIssues = (data: any[]): IssueTypes[] => data.map(({ id, title, number, user, created_at, comments, state }) => ({
     id, 
     title, 
     number, 
     user: user.login, 
     date: created_at, 
     comments,
     status: state
    }));
