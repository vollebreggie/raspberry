import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedDotComponent } from './red-dot.component';

describe('RedDotComponent', () => {
  let component: RedDotComponent;
  let fixture: ComponentFixture<RedDotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedDotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
