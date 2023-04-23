import {Octokit} from 'octokit'

const GITHUB_TOKEN = "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";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export default octokit;