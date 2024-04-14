import { FormControl, FormGroup } from '@angular/forms';
import { FilterModel } from '@filter/filter-config/domain';

export interface FilterConfigFormModel extends FormGroup {
  value: FilterModel;

  controls: {
    name: FormControl;
  };
}
