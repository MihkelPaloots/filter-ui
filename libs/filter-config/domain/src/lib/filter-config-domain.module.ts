import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FilterConfigEffects } from './+state/filter-config.effects';
import { FilterConfigFacade } from './application/filter-config.facade';
import * as fromFilterConfig from './+state/filter-config.reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(
      fromFilterConfig.FILTER_CONFIG_FEATURE_KEY,
      fromFilterConfig.filterConfigReducer
    ),
    EffectsModule.forFeature([ FilterConfigEffects ]),
  ],
  providers: [ FilterConfigFacade ],
})
export class FilterConfigDomainModule {}
