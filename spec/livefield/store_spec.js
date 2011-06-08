describe('Livefield.Store', function() {

  describe('#find', function() {
    it('fetches the store’s url', function() {
      spyOn(jQuery, 'ajax');
      var store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
      store.find('foo', function() {});
      expect(jQuery.ajax).toHaveBeenCalled();
    });

    it('calls callback with data', function() {
      var store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
      var callback = jasmine.createSpy('callback');

      runs(function() { store.find('foo', callback) });
      waits();
      runs(function() { expect(callback).toHaveBeenCalled() });
    });
  });

  describe('#reset', function() {
    it('wipes store.data', function() {
      var store = new Livefield.Store({});
      store.data = {};
      store.reset();
      expect(store.data).toBeNull();
    });
  });

});
