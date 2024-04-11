import * as FilterConfigActions from './filter-config.actions';
import { filterConfigReducer, FilterConfigState, initialFilterConfigState } from './filter-config.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { CriteriaConfig, DataType } from '../entities/criteria-config';


describe('Filter Config Reducer', () => {
  const error = new HttpErrorResponse({});

  const filters = [
    {
      id: 1,
      name: 'Test Filter 1',
      criterias: [ { type: 'amount', condition: 'equals', value: '2' } ]
    },
    {
      id: 2,
      name: 'Test Filter 2',
      criterias: [ { type: 'title', condition: 'contains', value: 'test' } ]
    }
  ];

  const configs: CriteriaConfig[] = [
    { name: 'Amount', conditionOptions: [ 'more than', 'more than' ], dataType: DataType.Number },
    { name: 'Title', conditionOptions: [ 'contains', 'starts with' ], dataType: DataType.String }
  ];

  const filter = {
    id: 2,
    name: 'Test Filter',
    criterias: [
      { type: 'title', condition: 'contains', value: 'test1' },
      { type: 'title', condition: 'contains', value: 'test2' },
      { type: 'title', condition: 'contains', value: 'test3' }
    ]
  };

  describe('Valid Actions', () => {
    it('loadFilters should remove an error', () => {
      const action = FilterConfigActions.loadFilters();

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.error).toBe(undefined);
    });

    it('loadCriteriaConfigs should remove an error', () => {
      const action = FilterConfigActions.loadCriteriaConfigs();

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.error).toBe(undefined);
    });

    it('loadFiltersFailure should set the error', () => {
      const action = FilterConfigActions.loadFiltersFailure({
        error: error,
      });

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.error).toStrictEqual(error);
    });

    it('loadCriteriaConfigsFailure should set the error', () => {
      const action = FilterConfigActions.loadCriteriaConfigsFailure({
        error: error,
      });

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.error).toStrictEqual(error);
    });

    it('saveFilterFailure should set the error', () => {
      const action = FilterConfigActions.saveFilterFailure({
        error: error,
      });

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.error).toStrictEqual(error);
    });

    it('loadFiltersSuccess should set savedFilters', () => {
      const action = FilterConfigActions.loadFiltersSuccess({
        filters: filters
      });

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.savedFilters).toStrictEqual(filters);
    });

    it('loadCriteriaConfigsSuccess should set criteriaConfigs', () => {
      const action = FilterConfigActions.loadCriteriaConfigsSuccess({
        criteriaConfigs: configs
      });

      const result: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        action
      );

      expect(result.criteriaConfigs).toStrictEqual(configs);
    });


    it('addCriteria should add criteria', () => {
      const criteriaCount = filter.criterias.length

      const setupAction = FilterConfigActions.openFilterConfig({ filter: filter });
      const setup: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        setupAction
      );

      const action = FilterConfigActions.addCriteria();
      const result = filterConfigReducer(setup, action);

      expect(result.filterSetup.criterias.length).toStrictEqual(criteriaCount + 1);
    });

    it('removeCriteria should remove criteria', () => {
      const criteriaCount = filter.criterias.length

      const setupAction = FilterConfigActions.openFilterConfig({ filter: filter });
      const setup: FilterConfigState = filterConfigReducer(
        initialFilterConfigState,
        setupAction
      );

      const action = FilterConfigActions.removeCriteria({ index: 0 });
      const result = filterConfigReducer(setup, action);

      expect(result.filterSetup.criterias.length).toStrictEqual(criteriaCount - 1);
    });

    it('should reset filterSetup properties', () => {
      const setup: FilterConfigState = {
        ...initialFilterConfigState,
        filterSetup: {
          name: 'some-name',
          criterias: [ { type: 'Amount' } ]
        }
      }
      const action = FilterConfigActions.closeFilterConfig();
      const state = filterConfigReducer(setup, action);

      expect(state.filterSetup.name).toBeUndefined();
      expect(state.filterSetup.criterias).toEqual([]);
    });

    it('updateFilter should update filter', () => {

      const action = FilterConfigActions.updateFilter({ filter: filter });
      const result = filterConfigReducer(
        initialFilterConfigState,
        action);

      expect(result.filterSetup).toStrictEqual(filter);
    });
  });

  describe('Unknown Actions', () => {
    it('should return the previous state', () => {
      const result = filterConfigReducer(initialFilterConfigState, {} as Action);

      expect(result).toBe(initialFilterConfigState);
    });
  });
});
