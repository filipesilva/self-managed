import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayplannerCardComponent } from './dayplanner-card.component';

describe('DayplannerComponent', () => {
  let component: DayplannerCardComponent;
  let fixture: ComponentFixture<DayplannerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayplannerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayplannerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
