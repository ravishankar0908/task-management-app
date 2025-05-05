import { TestBed } from '@angular/core/testing';

import { AssignTeamService } from './assign-team.service';

describe('AssignTeamService', () => {
  let service: AssignTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
