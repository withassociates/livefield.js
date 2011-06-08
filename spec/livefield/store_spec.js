describe('Livefield.Store', function() {

  describe('find', function() {
    it('returns data to passed callback', function() {
      var store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
      var callback = jasmine.createSpy('callback');

      runs(function() { store.find('foo', callback) });
      waits();
      runs(function() { expect(callback).toHaveBeenCalled() });
    });
  });

});
