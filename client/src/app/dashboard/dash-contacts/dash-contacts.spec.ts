import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashContacts } from './dash-contacts';

describe('DashContacts', () => {
  let component: DashContacts;
  let fixture: ComponentFixture<DashContacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashContacts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashContacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
