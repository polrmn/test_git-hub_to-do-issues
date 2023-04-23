import { formatResponseRepo } from '../middlewares/formatResponseRepo';
import { GetIssuesParams } from './getIssues';
import octokit from "./octokit";

export const getRepo = async ({ owner, repo }: GetIssuesParams) => {
    const {data} = await octokit.request("GET /repos/{owner}/{repo}", {
        owner,
        repo,
    });
    return formatResponseRepo(data);
}
