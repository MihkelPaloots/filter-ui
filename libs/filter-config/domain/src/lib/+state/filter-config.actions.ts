import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CriteriaConfig } from '../entities/criteria-config';
import { Filter } from '../entities/filter';
import { Criteria } from '../entities/criteria';


export const loadCriteriaConfigs = createAction(
  '[FilterConfig/API] Load Criteria Configs'
);

export const loadCriteriaConfigsSuccess = createAction(
  '[FilterConfig/API] Load Criteria Configs Success',
  props<{ criteriaConfigs: CriteriaConfig[] }>()
);

export const loadCriteriaConfigsFailure = createAction(
  '[FilterConfig/API] Load Criteria Configs Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadFilters = createAction(
  '[FilterConfig/API] Load Filters'
);

export const loadFiltersSuccess = createAction(
  '[FilterConfig/API] Load Filters Success',
  props<{ filters: Filter[] }>()
);

export const loadFiltersFailure = createAction(
  '[FilterConfig/API] Load Filters Failure',
  props<{ error: HttpErrorResponse }>()
);

export const openFilterConfig = createAction(
  '[FilterConfig/API] Open Filter Config',
  props<{ filter?: Filter }>()
);

export const closeFilterConfig = createAction(
  '[FilterConfig/API] Close Filter Config'
);

export const saveFilterFailure = createAction(
  '[FilterConfig/API] Save Filter Failure',
  props<{ error: HttpErrorResponse }>()
);

export const saveFilter = createAction(
  '[FilterConfig/API] Save Filter'
);

export const updateFilter = createAction(
  '[FilterConfig/API] update Filter',
  props<{ filter: Filter }>()
);

export const updateCriteria = createAction(
  '[FilterConfig/API] Update Criteria',
  props<{ index: number; criteria: Criteria }>()
);

export const addCriteria = createAction(
  '[FilterConfig/API] Add Criteria'
);

export const removeCriteria = createAction(
  '[FilterConfig/API] Remove Criteria',
  props<{ index: number }>()
);
