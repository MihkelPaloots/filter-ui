import { Criteria } from '../entities/criteria';
import { CriteriaConfig, DataType } from '../entities/criteria-config';
import { FilterConfigFacade } from './filter-config.facade';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import * as FilterConfigActions from '../+state/filter-config.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import {
  FILTER_CONFIG_FEATURE_KEY,
  FilterConfigPartialState,
  initialFilterConfigState
} from '../+state/filter-config.reducer';
import { provideMockActions } from '@ngrx/effects/testing';

describe('FilterConfigFacade', () => {
  let store: MockStore<FilterConfigPartialState>;
  let actions: Observable<Action>;
  let facade: FilterConfigFacade;

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

  const criteria: Criteria = { type: 'title', condition: 'contains', value: 'test' };

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideMockStore(), provideMockActions(() => actions), FilterConfigFacade ],
    });

    facade = TestBed.inject(FilterConfigFacade);
    store = TestBed.inject(MockStore);
  });

  const state = {
    [FILTER_CONFIG_FEATURE_KEY]: {
      ...initialFilterConfigState,
      criteriaConfigs: configs,
      filterSetup: filter,
      savedFilters: filters
    },
  };

  beforeEach(() => store.setState(state));

  describe('selectors', () => {
    it('should return the filters', done => {
      facade.filters$.subscribe(filters => {
        expect(filters).toEqual(filters);
        done();
      });
    });

    it('should return the filter configs', done => {
      facade.criteriaConfigs$.subscribe(configs => {
        expect(configs).toEqual(configs);
        done();
      });
    });

    it('should return the filter', done => {
      facade.filterSetup$.subscribe(filter => {
        expect(filter).toEqual(filter);
        done();
      });
    });
  });

  describe('dispatchers', () => {
    it('should dispatch loadCriteriaConfigs action', () => {
      const expectedAction = FilterConfigActions.loadCriteriaConfigs();
      jest.spyOn(store, 'dispatch');
      facade.loadCriteriaConfigs();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch closeFilterConfig action', () => {
      const expectedAction = FilterConfigActions.closeFilterConfig();
      jest.spyOn(store, 'dispatch');
      facade.closeFilterConfig();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch openFilterConfig action', () => {
      const expectedAction = FilterConfigActions.openFilterConfig({ filter: filter });
      jest.spyOn(store, 'dispatch');
      facade.openFilterConfig(filter);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch loadCriteriaConfigs action', () => {
      const expectedAction = FilterConfigActions.updateFilter({ filter: filter });
      jest.spyOn(store, 'dispatch');
      facade.updateFilter(filter);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch saveFilter action', () => {
      const expectedAction = FilterConfigActions.saveFilter();
      jest.spyOn(store, 'dispatch');
      facade.saveFilter();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch removeCriteria action', () => {
      const expectedAction = FilterConfigActions.removeCriteria({ index: 0 });
      jest.spyOn(store, 'dispatch');
      facade.removeCriteria(0);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch updateCriteria action', () => {
      const expectedAction = FilterConfigActions.updateCriteria({ index: 0, criteria: criteria });
      jest.spyOn(store, 'dispatch');
      facade.updateCriteria(0, criteria);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch addCriteria action', () => {
      const expectedAction = FilterConfigActions.addCriteria();
      jest.spyOn(store, 'dispatch');
      facade.addCriteria();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should dispatch loadFilters action', () => {
      const expectedAction = FilterConfigActions.loadFilters();
      jest.spyOn(store, 'dispatch');
      facade.loadFilters();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});