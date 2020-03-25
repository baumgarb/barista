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
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BaPageGuard } from '../../shared/services/page-guard';
import { BaRecentlyOrderedService } from '../../shared/services/recently-ordered.service';
import { BaDecisionGraphPage } from './decision-graph-page';
import {
  BaDecisionGraph,
  BaDecisionGraphStartNode,
  BaDecisionGraphNode,
} from './components/ba-decision-graph';
import {} from './components/ba-decision-graph/ba-decision-graph';

export const routes: Route[] = [
  {
    path: '',
    component: BaDecisionGraphPage,
    canActivate: [BaPageGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    BaDecisionGraphPage,
    BaDecisionGraph,
    BaDecisionGraphStartNode,
    BaDecisionGraphNode,
  ],
  providers: [BaRecentlyOrderedService],
})
export class BaDecisionGraphPageModule {}
