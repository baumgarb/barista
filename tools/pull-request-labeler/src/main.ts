/**
 * @license
 * Copyright 2019 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getInput } from '@actions/core';
import { context, GitHub } from '@actions/github';
import { updateTargetLabels } from './utils/update-target-labels';
import { processCommitMessages } from './utils/process-commit-messages';
import { getCommitMessagesInPullRequest } from './utils/get-commit-messages-in-pull-request';
import { getPullRequestDetails } from './utils/get-pull-request-details';
import { isMasterTarget } from './utils/is-master-target';
import { hasLgtmLabel } from './utils/has-lgtm-label';
import { addRebaseLabel } from './utils/add-rebase-label';

function getPrNumber(): number | undefined {
  const pullRequest = context.payload.pull_request;
  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

async function run() {
  const token = getInput('repo-token', { required: true });

  // Get the pull request that should be processed.
  const prNumber = getPrNumber();
  if (!prNumber) {
    console.log('Could not get pull request number from context, exiting');
    return;
  }

  const client = new GitHub(token);

  // Get the pull request target
  const pullRequestDetails = await getPullRequestDetails(client, prNumber);

  if (!hasLgtmLabel(pullRequestDetails)) {
    console.log(
      'Not ready to label just yet, add pr: lgtm label to it to start the process.',
    );
    return;
  }

  if (!isMasterTarget(pullRequestDetails.base)) {
    console.log('Target branch is not master, exiting');
    return;
  }

  const commitMessages = await getCommitMessagesInPullRequest(client, prNumber);

  const { errors, targets } = processCommitMessages(commitMessages);

  if (errors.length) {
    await addRebaseLabel(client, prNumber);
    throw new Error(`Commit message validation error ${errors.join('\n')}`);
  }

  await updateTargetLabels(client, prNumber, targets);
}

run();
