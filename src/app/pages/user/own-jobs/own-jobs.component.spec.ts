import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnJobsComponent } from './own-jobs.component';

describe('OwnJobsComponent', () => {
  let component: OwnJobsComponent;
  let fixture: ComponentFixture<OwnJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnJobsComponent]
    });
    fixture = TestBed.createComponent(OwnJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
