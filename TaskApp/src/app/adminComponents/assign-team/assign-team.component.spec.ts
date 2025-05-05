import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeamComponent } from './assign-team.component';

describe('AssignTeamComponent', () => {
  let component: AssignTeamComponent;
  let fixture: ComponentFixture<AssignTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignTeamComponent]
    });
    fixture = TestBed.createComponent(AssignTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
