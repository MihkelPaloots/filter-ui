import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from './filter-config-modal/filter-modal.component';
import { FilterConfigFacade } from '@filter/filter-config/domain';


@Component({
  selector: 'filter-main',
  templateUrl: './filter-main.component.html',
  styleUrls: [ './filter-main.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMainComponent implements OnInit {

  filters$ = this.setupFacade.filters$;
  displayedColumns: string[] = [ 'id', 'name', 'criterias' ];

  isModalMode = false;
  openFilterConfig = false;

  private MODAL_SIZE = '1000px';

  constructor(
    private readonly setupFacade: FilterConfigFacade,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setupFacade.loadCriteriaConfigs();
    this.setupFacade.loadFilters();
  }

  openFilterDialog() {
    this.setupFacade.openFilterConfig()
    if (this.isModalMode) {
      this.dialog.open(FilterModalComponent, {
        width: this.MODAL_SIZE
      });
    } else {
      this.openFilterConfig = true;
    }
  }

  changeModalMode() {
    if (this.isModalMode) {
      this.isModalMode = false
    } else {
      this.isModalMode = true
      this.openFilterConfig = false
    }
  }
}
