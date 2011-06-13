describe('Livefield.Store', function() {

  describe('#find', function() {
    it('calls jQuery.getJSON', function() {
      var store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
      spyOn(jQuery, 'getJSON').andCallThrough();
      store.find('foo', function() {});
      expect(jQuery.getJSON).toHaveBeenCalledWith('spec/fixtures/my_store.json');
    });

    it('calls callback with data', function() {
      var store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
      var callback = jasmine.createSpy('callback');
      runs(function() { store.find('foo', callback) });
      waits();
      runs(function() { expect(callback).toHaveBeenCalled() });
    });

    describe('with a templated url', function() {
      it('inserts the query into the template', function() {
        var store = new Livefield.Store({ url: '/pages/search/:query' });
        spyOn(jQuery, 'getJSON').andCallThrough();
        store.find('foo', function() {});
        expect(jQuery.getJSON).toHaveBeenCalledWith('/pages/search/foo');
      });
    });
  });

});
