import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayplannerItemComponent } from './dayplanner-item.component';

describe('DayplannerItemComponent', () => {
  let component: DayplannerItemComponent;
  let fixture: ComponentFixture<DayplannerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayplannerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayplannerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
