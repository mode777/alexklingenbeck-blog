import { TestBed, inject } from '@angular/core/testing';

import { ArticleServiceService } from './article-service.service';

describe('ArticleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleServiceService]
    });
  });

  it('should ...', inject([ArticleServiceService], (service: ArticleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
