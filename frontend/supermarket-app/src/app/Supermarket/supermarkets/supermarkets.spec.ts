import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supermarkets } from './supermarkets';

describe('Supermarkets', () => {
  let component: Supermarkets;
  let fixture: ComponentFixture<Supermarkets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supermarkets],
    }).compileComponents();

    fixture = TestBed.createComponent(Supermarkets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
