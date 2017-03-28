var BN = require('./babynames');
describe('BabyNames', () => {
  it('exists', () => {
    expect(Object.keys(BN).length).not.toBe(0);
  });
  describe('Get URI', () => {
    it('gives me the uri for gender and name as input', () => {
     var criteria = {name: 'sana', gender: 'F'};
     var uri = BN.getServiceUri(criteria);
      expect(uri).toBe('/gender/F/names/sana');
    });
      it('gives me the uri for gender input', () => {
     var criteria = {name: null, gender: 'F'};
     var uri = BN.getServiceUri(criteria);
      expect(uri).toBe('/gender/F/names');
    });
      it('gives me the uri for name input', () => {
     var criteria = {name: 'sana', gender: null};
     var uri = BN.getServiceUri(criteria);
      expect(uri).toBe('/names/sana');
    });
      it('gives me the uri for no input when search is run', () => {
     var criteria = {name: null, gender: null};
     var uri = BN.getServiceUri(criteria);
      expect(uri).toBe('/names');
    });
  });
});