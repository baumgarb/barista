import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { DtIconModule } from '@dynatrace/angular-components/icon';
import { DtButtonModule } from '@dynatrace/angular-components/button';
import { DtSelectionArea } from './selection-area';
import { DtSelectionAreaActions } from './selection-area-actions';
import { DtSelectionAreaOrigin } from './selection-area-origin';
import { DtSelectionAreaContainer } from './selection-area-container';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    DtIconModule,
    DtButtonModule,
    OverlayModule,
    A11yModule,
    PortalModule,
  ],
  exports: [
    DtSelectionArea,
    DtSelectionAreaOrigin,
    DtSelectionAreaActions,
  ],
  declarations: [
    DtSelectionArea,
    DtSelectionAreaContainer,
    DtSelectionAreaOrigin,
    DtSelectionAreaActions,
  ],
  entryComponents: [
    DtSelectionAreaContainer,
  ],
})
export class DtSelectionAreaModule {}