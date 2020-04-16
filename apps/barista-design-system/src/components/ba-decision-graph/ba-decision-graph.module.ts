/**
 * @license
 * Copyright 2020 Dynatrace LLC
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

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BaDecisionGraphNode } from './ba-decision-graph-node/ba-decision-graph-node';
import { BaDecisionGraphStartNode } from './ba-decision-graph-start-node/ba-decision-graph-start-node';
import { BaDecisionGraph } from './ba-decision-graph';
import { BaDecisiongraphNodeNavigation } from './ba-decision-graph-node/ba-decision-graph-node-navigation/ba-decision-graph-node-navigation';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [
    BaDecisionGraph,
    BaDecisionGraphNode,
    BaDecisiongraphNodeNavigation,
    BaDecisionGraphStartNode,
  ],
  exports: [
    BaDecisionGraph,
    BaDecisionGraphNode,
    BaDecisionGraphStartNode,
    BaDecisiongraphNodeNavigation,
  ],
})
export class BaDecisionGraphModule {}
