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
      waits(100);
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

  describe('#queue', function() {
    beforeEach(function() {
      this.store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
    });

    it('adds new requests to the queue', function() {
      var args = ['foo', function() {}];
      spyOn(this.store.queue, 'push').andCallThrough();
      this.store.find(args[0], args[1]);
      expect(this.store.queue.push).toHaveBeenCalledWith(args);
    });

  });

});
