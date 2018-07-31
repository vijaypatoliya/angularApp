import { TestBed, inject } from '@angular/core/testing';

import { FirebaseTaskService } from './firebase-task.service';

describe('FirebaseTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseTaskService]
    });
  });

  it('should be created', inject([FirebaseTaskService], (service: FirebaseTaskService) => {
    expect(service)
    .toBeTruthy();
  }));
});
