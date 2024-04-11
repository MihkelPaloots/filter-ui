import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CriteriaConfig, DataType, Criteria } from '@filter/filter-config/domain';
import { CriteriaFormModel } from './criteria-form.model';


@Component({
  selector: 'filter-criteria-form',
  templateUrl: './criteria-form.component.html',
  styleUrls: [ './criteria-form.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CriteriaFormComponent {

  protected readonly DataType = DataType;

  @Input() criteriaOptions: CriteriaConfig[] | null | undefined;
  @Input() criteriaModel?: Criteria | null | undefined;
  @Output() formChange = new EventEmitter<Criteria>();
  @Output() removeCriteria = new EventEmitter<void>();

  form: CriteriaFormModel;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      type: [ '' ],
      condition: [ '' ],
      value: [ '', { updateOn: 'blur' } ]
    }) as CriteriaFormModel;
  }

  updateCriteria(formValue: Criteria) {
    this.formChange.emit(formValue);
  }

  remove() {
    this.removeCriteria.emit();
  }
}