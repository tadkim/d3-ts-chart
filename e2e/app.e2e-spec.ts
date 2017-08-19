import { D3TsChartPage } from './app.po';

describe('d3-ts-chart App', () => {
  let page: D3TsChartPage;

  beforeEach(() => {
    page = new D3TsChartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
