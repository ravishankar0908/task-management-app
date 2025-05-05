import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyManagerComponent } from './my-manager.component';

describe('MyManagerComponent', () => {
  let component: MyManagerComponent;
  let fixture: ComponentFixture<MyManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyManagerComponent]
    });
    fixture = TestBed.createComponent(MyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
