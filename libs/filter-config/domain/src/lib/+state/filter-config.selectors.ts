import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FILTER_CONFIG_FEATURE_KEY,
  FilterConfigState,
} from './filter-config.reducer';

export const getFilterConfigState = createFeatureSelector<FilterConfigState>(
  FILTER_CONFIG_FEATURE_KEY
);

export const getError = createSelector(
  getFilterConfigState,
  (state: FilterConfigState) => state.error
);

export const getCriteriaConfigs = createSelector(getFilterConfigState, state => state.criteriaConfigs);

export const getFilters = createSelector(getFilterConfigState, state => state.savedFilters);

export const getFilterSetup = createSelector(getFilterConfigState, state => state.filterSetup);