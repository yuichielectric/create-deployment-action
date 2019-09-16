import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  const token = process.env["GITHUB_TOKEN"];
  if (token == undefined) {
    core.setFailed("GitHub token is needed.");
    return;
  }
  const octokit = new github.GitHub(token);
  const context = github.context;
  const ref = core.getInput("ref", { required: true });
  const payload = {
    ...context.repo,
    ref: ref,
    required_contexts: []
  };
  try {
    const result = await octokit.repos.createDeployment(payload);
    core.setOutput("deployment-id", result["data"]["id"]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
