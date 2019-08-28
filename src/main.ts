import * as core from '@actions/core';
import * as github from '@actions/github';
import * as path from 'path';

async function run() {
  try {
    const token = process.env['GITHUB_TOKEN'];
    if (token == undefined) {
      return;
    }
    const octokit = new github.GitHub(token);
    const context = github.context;
    const ref = core.getInput('ref') || process.env['GITHUB_SHA'];
    if (ref == undefined) {
      return;
    }
    const environment = core.getInput('environment');
    octokit.repos.createDeployment({
      ...context.repo,
      ref: ref
    });
    core.debug(`Hello ${ref}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
