import * as core from '@actions/core';
import * as github from '@actions/github';
import * as path from 'path';

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
