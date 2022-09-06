import { TestBed } from '@angular/core/testing';

import { MemosService } from './memos.service';

describe('MemosService', () => {
  let service: MemosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
