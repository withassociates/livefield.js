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

      $('#my-input').livefield();
    });

    it('adds a class onto the input', function() {
      expect($('#my-input').hasClass('livefield-input')).toBeTruthy();
    });

    describe('when I type "a"', function() {
      beforeEach(function() {
        runs(function() {
          $('#my-input').val('a').trigger('keydown');
        });
      });

      it('displays a list of options', function() {
        waitsFor(function() {
          return $('.livefield-results').length > 0;
        }, 'list of options to appear', 250);
      });
    });

  });

});
