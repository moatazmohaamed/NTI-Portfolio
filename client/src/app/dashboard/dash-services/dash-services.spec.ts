import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashServices } from './dash-services';

describe('DashServices', () => {
  let component: DashServices;
  let fixture: ComponentFixture<DashServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
