import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnathourizedComponent } from './unathourized.component';

describe('UnathourizedComponent', () => {
  let component: UnathourizedComponent;
  let fixture: ComponentFixture<UnathourizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnathourizedComponent]
    });
    fixture = TestBed.createComponent(UnathourizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
