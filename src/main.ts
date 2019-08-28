import * as core from '@actions/core';
import * as github from '@actions/github';
import * as path from 'path';

async function run() {
  try {
    const ref = core.getInput('ref') || process.env['GITHUB_SHA'];
    const environment = core.getInput('environment');
    const repository = process.env['GITHUB_REPOSITORY'];
    if (repository != undefined) {
      const owner = path.dirname(repository);
      const repo = path.basename(repository);
      github.repos.createDeployment({
        owner,
        repo,
        ref
      });
    }
    core.debug(`Hello ${ref}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
