import octokit from "./octokit";
import { formatResponseIssues } from "../middlewares/formatResponseIssues";
import { getRepo } from "./getRepo";

export interface GetIssuesParams {
  owner: string;
  repo: string;
}

export const getIssues = async ({ owner, repo }: GetIssuesParams) => {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
  });  
  getRepo({ owner, repo })
  return formatResponseIssues(data);
};
