import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseTaskComponent } from './firebase-task.component';

describe('FirebaseTaskComponent', () => {
  let component: FirebaseTaskComponent;
  let fixture: ComponentFixture<FirebaseTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
    .toBeTruthy();
  });
});
