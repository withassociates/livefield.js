describe('Livefield.Controller', function() {
  describe('given a simple json store', function() {
    var store;

    beforeEach(function() {
      store = new Livefield.Store({ url: 'spec/fixtures/my_store.json' });
    });

    describe('find', function() {
      it('returns data to the callback', function() {
        callback = jasmine.createSpy();
        store.find('foo', callback);
        waitsFor(function() {
          return callback.mostRecentCall !== null;
        }, 'callback to be called', 250);
      });
    });

  });
});
