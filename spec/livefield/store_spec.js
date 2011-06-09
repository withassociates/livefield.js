describe('Livefield.Store', function() {

  describe('#find', function() {
    it('fetches the store’s url', function() {
      spyOn(jQuery, 'getJSON').andCallThrough();
      var store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
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
        spyOn(jQuery, 'getJSON').andCallThrough();
        var store = new Livefield.Store({
          url: 'spec/fixtures.my_json.json?q={{query}}'
        });
        var callback = jasmine.createSpy('callback');

        store.find('foo', callback);

        expect(jQuery.getJSON).toHaveBeenCalledWith('spec/fixtures.my_json.json?q=foo');
      });
    });
  });

  describe('#urlFor', function() {
    describe('with a template url and query value', function() {

    });
  });

  describe('#reset', function() {
    it('wipes store.data', function() {
      var store = new Livefield.Store({ url: 'spec/fixtrues/my_store.json' });
      store.data = {};
      store.reset();
      expect(store.data).toBeNull();
    });
  });

});
