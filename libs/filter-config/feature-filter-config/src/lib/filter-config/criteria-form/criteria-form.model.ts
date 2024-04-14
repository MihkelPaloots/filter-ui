import { FormControl, FormGroup } from '@angular/forms';
import { Criteria } from '@filter/filter-config/domain';

export interface CriteriaFormModel extends FormGroup {
  value: Criteria;

  controls: {
    type: FormControl;
    condition: FormControl;
    value: FormControl;
  };
}
