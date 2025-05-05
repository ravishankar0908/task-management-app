import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTaskComponent } from './view-my-task.component';

describe('ViewMyTaskComponent', () => {
  let component: ViewMyTaskComponent;
  let fixture: ComponentFixture<ViewMyTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMyTaskComponent]
    });
    fixture = TestBed.createComponent(ViewMyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
