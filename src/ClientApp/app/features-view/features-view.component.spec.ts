import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesViewComponent } from './features-view.component';

describe('FeaturesViewComponent', () => {
  let component: FeaturesViewComponent;
  let fixture: ComponentFixture<FeaturesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
