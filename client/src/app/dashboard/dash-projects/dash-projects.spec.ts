import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProjects } from './dash-projects';

describe('DashProjects', () => {
  let component: DashProjects;
  let fixture: ComponentFixture<DashProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
