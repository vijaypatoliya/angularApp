import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseTaskmodalComponent } from './firebase-taskmodal.component';

describe('FirebaseTaskmodalComponent', () => {
  let component: FirebaseTaskmodalComponent;
  let fixture: ComponentFixture<FirebaseTaskmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseTaskmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseTaskmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
