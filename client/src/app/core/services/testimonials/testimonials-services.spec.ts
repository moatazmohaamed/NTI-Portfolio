import { TestBed } from '@angular/core/testing';

import { TestimonialsServices } from './testimonials-services';

describe('TestimonialsServices', () => {
  let service: TestimonialsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonialsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
