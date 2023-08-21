import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPdfComponent } from './premium-pdf.component';

describe('PremiumPdfComponent', () => {
  let component: PremiumPdfComponent;
  let fixture: ComponentFixture<PremiumPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
