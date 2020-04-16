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

import { Component, OnInit } from '@angular/core';
import { BaUxdNode } from '@dynatrace/shared/barista-definitions';
import { BaPageService } from '../../shared/services/page.service';

@Component({
  selector: 'ba-decision-graph',
  templateUrl: './ba-decision-graph.html',
  styleUrls: ['./ba-decision-graph.scss'],
})
export class BaDecisionGraph implements OnInit {
  // Todo: Scroll to bottom functionality when user starts nodeloop.

  /** Data needed to render the navigation. */
  private _decisionGraphData$ = this._pageService._getPage('uxdg-data');

  /** @internal Array of all nodes and edges */
  _decisionGraphData: BaUxdNode[] = [];

  /** @internal Array of all nodes and edges which should be displayed */
  _decisionGraphStartNodes: BaUxdNode[] = [];

  /** @internal Contains the start node the user has picked */
  _selectedStartnode: BaUxdNode | undefined;

  constructor(private _pageService: BaPageService<any>) {}

  ngOnInit(): void {
    this._decisionGraphData$.subscribe(data => {
      this._decisionGraphData = data;
      this.getStartNodes();
    });
  }

  /** Gets all starting nodes from decisionGraphData */
  getStartNodes(): void {
    this._decisionGraphData.forEach(node => {
      if (node.start) {
        this._decisionGraphStartNodes.push(node);
      }
    });
    this._decisionGraphStartNodes.sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });
  }

  /** Sets the currently selected startnode when emitted from startnode component */
  setSelectedStartNode(selectedStartnode: BaUxdNode): void {
    let id;
    // skip first edge (not so sure).
    selectedStartnode.path.forEach(edge => {
      id = edge.uxd_node;
    });
    this._decisionGraphData.forEach(data => {
      if (data.id === id) {
        this._selectedStartnode = data;
      } else {
        console.error(`No nodes with id: ${id}`);
      }
    });
    // When removed change to: this._selectedStartnode = selectedStartnode;
  }

  /** Reset to initial state */
  resetToInitial(): void {
    this._selectedStartnode = undefined;
  }
}
