import { TestBed } from '@angular/core/testing';

import { Dino } from './dino';

describe('Dino', () => {
  let service: Dino;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dino);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
