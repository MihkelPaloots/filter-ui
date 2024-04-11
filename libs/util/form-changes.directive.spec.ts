import { Component, DebugElement } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormChangesDirective } from './form-changes.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'test-cmp',
  template: `
    <form [formGroup]="form" formChanges [model]="formModel">
      <input formControlName="colour" />
    </form>
  `,
})
class TestComponent {
  form: FormGroup;
  formModel?: string;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      colour: [''],
    });
  }
}

describe('FormChangesDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormChangesDirective, TestComponent],
      imports: [FormsModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    formElement = fixture.debugElement.query(By.directive(FormChangesDirective));

    fixture.detectChanges();
  });

  it('should patch form values on model input', () => {
    formElement.componentInstance.formModel = { colour: 'white' };
    fixture.detectChanges();
    expect(component.form.value).toEqual({ colour: 'white' });
  });
});
