import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayplannerItemEditComponent } from './dayplanner-item-edit.component';

describe('ItemEditComponent', () => {
  let component: DayplannerItemEditComponent;
  let fixture: ComponentFixture<DayplannerItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayplannerItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayplannerItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
