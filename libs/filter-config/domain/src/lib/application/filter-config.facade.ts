import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FilterConfigActions from '../+state/filter-config.actions';
import * as FilterConfigSelectors from '../+state/filter-config.selectors';
import { Filter } from '../entities/filter';
import { Criteria } from '../entities/criteria';

@Injectable({ providedIn: 'root' })
export class FilterConfigFacade {
  criteriaConfigs$ = this.store.pipe(select(FilterConfigSelectors.getCriteriaConfigs));
  filters$ = this.store.pipe(select(FilterConfigSelectors.getFilters));
  filterSetup$ = this.store.pipe(select(FilterConfigSelectors.getFilterSetup));

  constructor(private readonly store: Store) {}

  loadCriteriaConfigs(): void {
    this.store.dispatch(FilterConfigActions.loadCriteriaConfigs());
  }

  openFilterConfig(filter?: Filter): void {
    this.store.dispatch(FilterConfigActions.openFilterConfig({ filter: filter }));
  }

  closeFilterConfig(): void {
    this.store.dispatch(FilterConfigActions.closeFilterConfig());
  }

  loadFilters(): void {
    this.store.dispatch(FilterConfigActions.loadFilters());
  }

  saveFilter(): void {
    this.store.dispatch(FilterConfigActions.saveFilter());
  }

  updateFilter(filter: Filter): void {
    this.store.dispatch(FilterConfigActions.updateFilter({ filter: filter }));
  }

  updateCriteria(index: number, criteria: Criteria): void {
    this.store.dispatch(FilterConfigActions.updateCriteria({ index: index, criteria: criteria }));
  }

  addCriteria(): void {
    this.store.dispatch(FilterConfigActions.addCriteria());
  }

  removeCriteria(index: number) {
    this.store.dispatch(FilterConfigActions.removeCriteria({ index: index }));
  }
}
