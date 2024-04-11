import { FILTER_CONFIG_FEATURE_KEY, FilterConfigPartialState, initialFilterConfigState } from './filter-config.reducer';
import { CriteriaConfig, DataType } from '../entities/criteria-config';
import * as FilterConfigSelectors from './filter-config.selectors';
import { HttpErrorResponse } from '@angular/common/http';

describe('Filter Config Selectors', () => {
  let state: FilterConfigPartialState;

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

  const error = new HttpErrorResponse({});

  beforeEach(() => {
    state = {
      [FILTER_CONFIG_FEATURE_KEY]: {
        ...initialFilterConfigState,
        criteriaConfigs: configs,
        filterSetup: filter,
        error: error,
        savedFilters: filters
      },
    };
  });

  it('getFilters() should return "filters" value', () => {
    expect(FilterConfigSelectors.getFilters(state)).toStrictEqual(filters);
  });

  it('getError() should return "error" value', () => {
    expect(FilterConfigSelectors.getError(state)).toStrictEqual(error);
  });

  it('getFilterSetup() should return "filterSetup" value', () => {
    expect(FilterConfigSelectors.getFilterSetup(state)).toStrictEqual(filter);
  });

  it('getFilterConfigState() should return "state" for filter config', () => {
    expect(FilterConfigSelectors.getFilterConfigState(state)).toStrictEqual(state[FILTER_CONFIG_FEATURE_KEY]);
  });

  it('getCriteriaConfigs() should return "criteriaConfigs" value', () => {
    expect(FilterConfigSelectors.getCriteriaConfigs(state)).toStrictEqual(configs);
  });
});
