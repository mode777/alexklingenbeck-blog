import { KendoAngular2Page } from './app.po';

describe('kendo-angular2 App', () => {
  let page: KendoAngular2Page;

  beforeEach(() => {
    page = new KendoAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
