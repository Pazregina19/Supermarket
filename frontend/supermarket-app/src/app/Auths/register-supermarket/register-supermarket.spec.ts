import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupermarket } from './register-supermarket';

describe('RegisterSupermarket', () => {
  let component: RegisterSupermarket;
  let fixture: ComponentFixture<RegisterSupermarket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSupermarket],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterSupermarket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
