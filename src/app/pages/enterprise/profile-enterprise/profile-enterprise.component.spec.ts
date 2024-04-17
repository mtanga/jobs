import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEnterpriseComponent } from './profile-enterprise.component';

describe('ProfileEnterpriseComponent', () => {
  let component: ProfileEnterpriseComponent;
  let fixture: ComponentFixture<ProfileEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEnterpriseComponent]
    });
    fixture = TestBed.createComponent(ProfileEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
