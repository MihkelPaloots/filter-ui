import { FormControl, FormGroup } from '@angular/forms';
import { FilterModel } from '@filter/filter-config/domain';

export interface FilterFormModel extends FormGroup {
  value: FilterModel;

  controls: {
    name: FormControl;
  };
}
