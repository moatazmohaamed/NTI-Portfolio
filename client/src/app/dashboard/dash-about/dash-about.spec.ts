import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAbout } from './dash-about';

describe('DashAbout', () => {
  let component: DashAbout;
  let fixture: ComponentFixture<DashAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
