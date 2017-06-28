import { IdtestPage } from './app.po';

describe('idtest App', () => {
  let page: IdtestPage;

  beforeEach(() => {
    page = new IdtestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
