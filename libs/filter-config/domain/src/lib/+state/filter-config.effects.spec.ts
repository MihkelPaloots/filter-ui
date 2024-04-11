import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';
import * as FilterConfigActions from './filter-config.actions';
import { FilterConfigEffects } from './filter-config.effects';
import { FilterConfigPartialState } from './filter-config.reducer';
import { Action, Store } from '@ngrx/store';
import { FilterConfigService } from '../infrastructure/filter-config.service';
import { Observable, of, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { FilterConfigFacade } from '../application/filter-config.facade';


describe('Filter Config Effects', () => {
  const error: HttpErrorResponse = new HttpErrorResponse({});

  let store: Store<FilterConfigPartialState>;
  let filterConfigService: FilterConfigService;
  let actions: Observable<Action>;
  let effects: FilterConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        FilterConfigEffects,
        FilterConfigService,
        FilterConfigFacade,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: 'API_URL',
          useValue: 'http://localhost:4202/syndmusteenused',
        },
      ],
    });
    store = TestBed.inject(MockStore);
    filterConfigService = TestBed.inject(FilterConfigService);
    effects = TestBed.inject(FilterConfigEffects);
  });

  describe('loadFilter', () => {
    it('should return success action', () => {

      jest.spyOn(store, 'pipe').mockReturnValueOnce(of({}));
      jest
        .spyOn(filterConfigService, 'getFilters')
        .mockReturnValueOnce(of([]));

      const expected = hot('-a-|', {
        a: FilterConfigActions.loadFiltersSuccess({
          filters: [],
        }),
      });

      actions = hot('-a-|', {
        a: FilterConfigActions.loadFilters(),
      });

      expect(effects.loadFilters$).toBeObservable(expected);
    });

    it('should return failure action', () => {

      jest.spyOn(store, 'pipe').mockReturnValueOnce(of({}));
      jest
        .spyOn(filterConfigService, 'getFilters')
        .mockImplementation(() => throwError(() => error));

      const expected = hot('-a-|', {
        a: FilterConfigActions.loadFiltersFailure({
          error: error,
        }),
      });

      actions = hot('-a-|', {
        a: FilterConfigActions.loadFilters(),
      });

      expect(effects.loadFilters$).toBeObservable(expected);
    });
  });

  describe('loadCriteriaConfigs', () => {
    it('should return success action', () => {

      jest.spyOn(store, 'pipe').mockReturnValueOnce(of({}));
      jest
        .spyOn(filterConfigService, 'getCriteriaConfigs')
        .mockReturnValueOnce(of([]));

      const expected = hot('-a-|', {
        a: FilterConfigActions.loadCriteriaConfigsSuccess({
          criteriaConfigs: [],
        }),
      });

      actions = hot('-a-|', {
        a: FilterConfigActions.loadCriteriaConfigs(),
      });

      expect(effects.loadCriteriaConfigs$).toBeObservable(expected);
    });

    it('should return failure action', () => {

      jest.spyOn(store, 'pipe').mockReturnValueOnce(of({}));
      jest
        .spyOn(filterConfigService, 'getCriteriaConfigs')
        .mockImplementation(() => throwError(() => error));

      const expected = hot('-a-|', {
        a: FilterConfigActions.loadCriteriaConfigsFailure({
          error: error,
        }),
      });

      actions = hot('-a-|', {
        a: FilterConfigActions.loadCriteriaConfigs(),
      });

      expect(effects.loadCriteriaConfigs$).toBeObservable(expected);
    });
  });
});
