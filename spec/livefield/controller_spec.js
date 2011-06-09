describe('Livefield.Controller', function() {
  beforeEach(function() {
    this.$input = $('<input />').
      attr('type', 'text').
      attr('data-store', 'my_store.json').
      attr('data-template', '#livefield-result-template');
  });

  describe('given an input with store attr', function() {
    it('creates a store with the data-store', function() {
      var controller = new Livefield.Controller({
        input: this.$input
      });
      expect(controller.store.urlFor()).toEqual('my_store.json');
    });
  });

  describe('given an input and explicit store url', function() {
    it('creates a store with explicit url', function() {
      var controller = new Livefield.Controller({
        input: this.$input, store: 'my_store.json'
      });
      expect(controller.store.urlFor()).toEqual('my_store.json');
    });
  });

});
