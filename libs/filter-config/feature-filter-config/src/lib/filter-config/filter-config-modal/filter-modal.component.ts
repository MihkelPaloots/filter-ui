import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FilterConfigFacade, Criteria, Filter } from '@filter/filter-config/domain';

@Component({
  selector: 'filter-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalComponent {

  criteriaConfigs$ = this.setupFacade.criteriaConfigs$;
  filter$ = this.setupFacade.filterSetup$
  @Output() closeForm = new EventEmitter<void>()

  constructor(private readonly setupFacade: FilterConfigFacade) {}

  updateFilter(filter: Filter) {
    this.setupFacade.updateFilter(filter)
  }

  updateCriteria(criteria: Criteria, index: number) {
    this.setupFacade.updateCriteria(index, criteria)
  }

  addCriteria() {
    this.setupFacade.addCriteria()
  }

  saveFilter() {
    this.setupFacade.saveFilter()
    this.setupFacade.closeFilterConfig()
    this.closeForm.emit()
  }

  removeCriteria(index: number) {
    this.setupFacade.removeCriteria(index)
  }

  close() {
    this.closeForm.emit()
  }
}
