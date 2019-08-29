import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    core.debug('Start processing');
    const token = process.env['GITHUB_TOKEN'];
    core.debug(`token: ${token}`);
    if (token == undefined) {
      return;
    }
    const octokit = new github.GitHub(token);
    const context = github.context;
    const ref = core.getInput('ref') || process.env['GITHUB_SHA'];
    core.debug(`ref: ${ref}`);
    if (ref == undefined) {
      return;
    }
    const environment = core.getInput('environment');
    const payload = {
      ...context.repo,
      ref: ref,
      required_contexts: []
    };
    core.debug(JSON.stringify(payload));
    const result = await octokit.repos.createDeployment(payload);
    core.debug(JSON.stringify(result));
    core.setOutput("deployment-id", result['id']);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
