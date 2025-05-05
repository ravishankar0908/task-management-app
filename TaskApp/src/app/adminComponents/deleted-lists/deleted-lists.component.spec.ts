import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedListsComponent } from './deleted-lists.component';

describe('DeletedListsComponent', () => {
  let component: DeletedListsComponent;
  let fixture: ComponentFixture<DeletedListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedListsComponent]
    });
    fixture = TestBed.createComponent(DeletedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
