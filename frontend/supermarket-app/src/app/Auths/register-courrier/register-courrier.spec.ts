import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCourrier } from './register-courrier';

describe('RegisterCourrier', () => {
  let component: RegisterCourrier;
  let fixture: ComponentFixture<RegisterCourrier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCourrier],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterCourrier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
