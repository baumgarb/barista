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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaUxdNode } from '@dynatrace/shared/barista-definitions';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ba-decision-graph-start-node',
  templateUrl: './ba-decision-graph-start-node.html',
  styleUrls: ['./ba-decision-graph-start-node.scss'],
})
export class BaDecisionGraphStartNode implements OnInit {
  @Input('startNodes')
  decisionGraphStartNodes: BaUxdNode[] = [];

  /** Emits the selected startnode for pathing through nodes */
  @Output('selectedNode')
  nodeEvent = new EventEmitter<BaUxdNode>();

  _selectedStartNode: BaUxdNode;

  /** @internal whether a startnode is selected */
  @Input()
  _isSelected = false;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  // TODO: Error handling when undefined
  /**
   * Converts a string to SafeHtml using the DomSanitizer
   * @param nodeText string to be converted to SafeHtml
   */
  getSanitizedNodeText(nodeText: string): SafeHtml | undefined {
    return this._sanitizer.bypassSecurityTrustHtml(nodeText);
  }

  selectStartNode(node: BaUxdNode): void {
    this._isSelected = true;
    this._selectedStartNode = node;
    this.nodeEvent.emit(node);
  }

  /**
   * Checks which startNode was selected to set the css class too
   * @param index index of ngFor loop
   * @param startNode selected startNode
   */
  isSelectedStartnode(index: number): boolean {
    return this.decisionGraphStartNodes.indexOf(this._selectedStartNode) ===
      index
      ? true
      : false;
  }
}
