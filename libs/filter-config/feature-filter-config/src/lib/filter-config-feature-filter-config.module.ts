import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterConfigDomainModule } from '@filter/filter-config/domain';
import { FilterMainComponent } from './filter-config/filter-main.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FilterModalComponent } from './filter-config/filter-config-modal/filter-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriteriaFormComponent } from './filter-config/criteria-form/criteria-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UtilModule } from '../../../../util/util.module';
import { ConfigFormComponent } from './filter-config/filter-form/config-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: FilterMainComponent },

];

@NgModule({
  imports: [
    CommonModule,
    FilterConfigDomainModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    UtilModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    FilterMainComponent,
    FilterModalComponent,
    CriteriaFormComponent,
    ConfigFormComponent
  ],
  providers: [FilterMainComponent],
  exports: [FilterMainComponent, RouterModule]
})
export class FilterConfigFeatureFilterConfigModule {}
