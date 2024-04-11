import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormChangesDirective } from './form-changes.directive';
import { FindCriteriaConfigPipe } from './find-criteria-config.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormChangesDirective,
    FindCriteriaConfigPipe
  ],
  exports: [
    FormChangesDirective,
    FindCriteriaConfigPipe
  ],
})
export class UtilModule {}