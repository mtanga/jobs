import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdijobComponent } from './edijob.component';

describe('EdijobComponent', () => {
  let component: EdijobComponent;
  let fixture: ComponentFixture<EdijobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdijobComponent]
    });
    fixture = TestBed.createComponent(EdijobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
