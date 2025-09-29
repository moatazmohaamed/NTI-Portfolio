import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTeam } from './dash-team';

describe('DashTeam', () => {
  let component: DashTeam;
  let fixture: ComponentFixture<DashTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
