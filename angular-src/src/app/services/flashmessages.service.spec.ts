import { TestBed } from '@angular/core/testing';

import { FlashmessagesService } from './flashmessages.service';

describe('FlashmessagesService', () => {
  let service: FlashmessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashmessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
