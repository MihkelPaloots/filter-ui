import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[formChanges]',
})
export class FormChangesDirective implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;

  @Input() set model(values: any) {
    this.formGroup.patchValue(values, {
      emitEvent: false,
      onlySelf: true,
    });
  }

  @Output() formChanged = new EventEmitter<any>();

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((values: any) => {
      if (values) {
        this.formChanged.emit(values);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
