import { TestBed } from '@angular/core/testing';

import { MyManagerService } from './my-manager.service';

describe('MyManagerService', () => {
  let service: MyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
