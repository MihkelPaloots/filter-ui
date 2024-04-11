import { Injectable } from '@angular/core';

import { toCriteriaConfigs } from '../mapper/to-criteria-config';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { FilterConfigService } from '../infrastructure/filter-config.service';

import * as FilterConfigActions from './filter-config.actions';
import { FILTER_CONFIG_FEATURE_KEY, FilterConfigPartialState } from './filter-config.reducer';
import { toFilters } from '../mapper/to-filters';
import { toFilterDto } from '../mapper/to-filter-dto';

@Injectable()
export class FilterConfigEffects {
  loadCriteriaConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterConfigActions.loadCriteriaConfigs),
      mergeMap(() => {
        return this.filterConfigService.getCriteriaConfigs().pipe(
          map(criteriaConfigDtos =>
            FilterConfigActions.loadCriteriaConfigsSuccess({
              criteriaConfigs: toCriteriaConfigs(criteriaConfigDtos),
            })
          ),
          catchError(error => of(FilterConfigActions.loadCriteriaConfigsFailure({ error })))
        );
      })
    )
  );

  loadFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterConfigActions.loadFilters),
      mergeMap(() => {
        return this.filterConfigService.getFilters().pipe(
          map(filterDtos =>
            FilterConfigActions.loadFiltersSuccess({
              filters: toFilters(filterDtos),
            })
          ),
          catchError(error => of(FilterConfigActions.loadFiltersFailure({ error })))
        );
      })
    )
  );

  saveFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilterConfigActions.saveFilter),
      withLatestFrom(this.store.pipe(select(state => state[FILTER_CONFIG_FEATURE_KEY].filterSetup))),
      mergeMap(([ , currentFilterSetup ]) =>
        this.filterConfigService.saveFilter(toFilterDto(currentFilterSetup)).pipe(
          map(() => FilterConfigActions.loadFilters()),
          catchError((error) =>
            of(FilterConfigActions.saveFilterFailure({ error }))
          )
        )
      )
    )
  );


  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<FilterConfigPartialState>,
    private readonly filterConfigService: FilterConfigService,
  ) {}
}
