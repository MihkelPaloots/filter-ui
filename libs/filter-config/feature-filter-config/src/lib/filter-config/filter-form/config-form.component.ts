import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterFormModel } from './filter-form.model';
import { Filter, CriteriaConfig, Criteria } from '@filter/filter-config/domain';


@Component({
  selector: 'filter-config-form',
  templateUrl: './config-form.component.html',
  styleUrl: './config-form.component.css'
})
export class ConfigFormComponent {

  @Input() filterModel?: Filter | null | undefined;
  @Input() criteriaConfigs?: CriteriaConfig[] | null | undefined;
  @Output() formChange = new EventEmitter<Filter>();
  @Output() addCriteria = new EventEmitter<void>();
  @Output() removeCriteria = new EventEmitter<number>();
  @Output() criteriaChange = new EventEmitter<{
    index: number;
    criteria: Criteria;
  }>();

  filterForm: FilterFormModel;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      name: [ '' ],
      criterias: undefined
    }) as FilterFormModel;
  }

  updateCriteria(formValue: Criteria, index: number) {
    this.criteriaChange.emit({ index: index, criteria: formValue });
  }

  updateFilter(formValue: Filter) {
    this.formChange.emit(formValue);
  }

  addNewCriteria() {
    this.addCriteria.emit()
  }

  removeCriteriaAt(i: number) {
    this.removeCriteria.emit(i)
  }
}
