import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supemarkets } from './supemarkets';

describe('Supemarkets', () => {
  let component: Supemarkets;
  let fixture: ComponentFixture<Supemarkets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supemarkets],
    }).compileComponents();

    fixture = TestBed.createComponent(Supemarkets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
