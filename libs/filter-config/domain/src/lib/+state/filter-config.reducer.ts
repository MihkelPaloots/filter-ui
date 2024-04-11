import { HttpErrorResponse } from '@angular/common/http';
import { Action, createReducer, on } from '@ngrx/store';
import { CriteriaConfig } from '../entities/criteria-config';
import * as FilterConfigActions from './filter-config.actions';
import { Filter } from '../entities/filter';
import { Criteria } from '../entities/criteria';

export const FILTER_CONFIG_FEATURE_KEY = 'filterConfig';

export interface FilterConfigState {
  criteriaConfigs?: CriteriaConfig[];
  filterSetup: Filter;
  savedFilters?: Filter[];
  error?: HttpErrorResponse | undefined;
}

export interface FilterConfigPartialState {
  readonly [FILTER_CONFIG_FEATURE_KEY]: FilterConfigState;
}

export const initialFilterConfigState: FilterConfigState = {
  criteriaConfigs: undefined,
  error: undefined,
  filterSetup: {},
  savedFilters: []
};

const reducer = createReducer(
  initialFilterConfigState,
  on(FilterConfigActions.loadCriteriaConfigs, state => ({
    ...state,
    error: undefined,
  })),
  on(FilterConfigActions.loadCriteriaConfigsSuccess, (state, { criteriaConfigs }) => ({
    ...state,
    criteriaConfigs: criteriaConfigs,
  })),
  on(FilterConfigActions.loadCriteriaConfigsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(FilterConfigActions.saveFilterFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(FilterConfigActions.saveFilter, state => ({
    ...state,
    error: undefined,
  })),
  on(FilterConfigActions.loadFilters, state => ({
    ...state,
    error: undefined,
  })),
  on(FilterConfigActions.loadFiltersSuccess, (state, { filters }) => ({
    ...state,
    savedFilters: filters,
  })),
  on(FilterConfigActions.loadFiltersFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(FilterConfigActions.openFilterConfig, (state, { filter }) => {
    const updatedFilterSetup = filter ? filter : {
      name: '',
      criterias: [
        {
          type: state.criteriaConfigs?.[0]?.name || '',
        }
      ]
    };

    return {
      ...state,
      filterSetup: updatedFilterSetup,
    };
  }),
  on(FilterConfigActions.closeFilterConfig, state => {
    return {
      ...state,
      filterSetup: {
        ...state.filterSetup,
        name: undefined,
        criterias: [],
      }
    };
  }),
  on(FilterConfigActions.updateFilter, (state, { filter }) => {
    return {
      ...state,
      filterSetup: {
        ...state.filterSetup,
        id: filter.id,
        name: filter.name,
        criterias: filter.criterias,
      }
    };
  }),
  on(FilterConfigActions.updateCriteria, (state, { index, criteria }) => {
    if (!state.filterSetup?.criterias) {
      return state;
    }

    const criterias = [ ...state.filterSetup.criterias ];

    if (criterias?.[index].type != criteria.type) {
      criteria = {
        type: criteria.type
      }
    }

    criterias[index] = { ...criteria };

    return {
      ...state,
      filterSetup: {
        ...state.filterSetup,
        criterias: criterias,
      },
    };
  }),
  on(FilterConfigActions.addCriteria, state => {
    return {
      ...state,
      filterSetup: {
        ...state.filterSetup,
        criterias: [
          ...(state.filterSetup?.criterias || []),
          {
            type: state.criteriaConfigs?.[0]?.name,
          } as Criteria,
        ]
      } as Filter,
    };
  }),
  on(FilterConfigActions.removeCriteria, (state, { index }) => {

    if (!state.filterSetup?.criterias) {
      return state;
    }
    if (state.filterSetup.criterias.length <= 1) {
      return state;
    }

    const updatedCriterias = state.filterSetup.criterias
      .filter((_, criteriaIndex) => criteriaIndex !== index);

    return {
      ...state,
      filterSetup: {
        ...state.filterSetup,
        criterias: updatedCriterias,
      },
    };
  }),
);

export function filterConfigReducer(
  state: FilterConfigState | undefined,
  action: Action
) {
  return reducer(state, action);
}

