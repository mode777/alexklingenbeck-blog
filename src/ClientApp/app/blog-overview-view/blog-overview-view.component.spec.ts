import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOverviewViewComponent } from './blog-overview-view.component';

describe('BlogOverviewViewComponent', () => {
  let component: BlogOverviewViewComponent;
  let fixture: ComponentFixture<BlogOverviewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogOverviewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
