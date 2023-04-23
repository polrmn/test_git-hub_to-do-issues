import { RepoTypes } from '../redux/repo/repoSlice';

interface RepoData {
  full_name: string;
  stargazers_count: number;
  subscribers_count: number;
  forks_count: number;
}

export const formatResponseRepo = (data: RepoData): RepoTypes => ({
  url: data.full_name,
  stars: data.stargazers_count,
  subscribers: data.subscribers_count,
  forks: data.forks_count,
});