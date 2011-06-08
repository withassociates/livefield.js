describe('Livefield', function() {
  afterEach(function() {
    $('#spec').html('');
  });

  describe('given a simple input and simple datasource', function() {
    var controller;

    beforeEach(function() {
      $('#spec').append(
        $('<input type="text" data-store="spec/fixtures/my_store.json" id="my-input" />')
      );

      controller = new Livefield.Controller({ input: '#my-input' });
    });

    it('adds a class onto the input', function() {
      expect($('#my-input').hasClass('livefield-input')).toBeTruthy();
    });

    describe('when I type "a"', function() {
      beforeEach(function() {
        $('#my-input').val('a').trigger('keydown');
      });
    });
  });

});
