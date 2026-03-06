import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinoList } from './dino-list';

describe('DinoList', () => {
  let component: DinoList;
  let fixture: ComponentFixture<DinoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinoList],
    }).compileComponents();

    fixture = TestBed.createComponent(DinoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
