describe('Livefield', function() {

  describe('given a simple input and simple datasource', function() {

    beforeEach(function() {
      $('#spec').append(
        $('<input />').
        attr('type', 'text').
        attr('data-store', 'spec/fixtures/my_store.json').
        attr('id', 'my-input')
      );
      this.controller = new Livefield.Controller({ input: '#my-input' });
    });

    afterEach(function() {
      $('#spec').html('');
    });

    describe('on creation', function() {
      it('adds a class onto the input', function() {
        expect($('#my-input').hasClass('livefield-input')).toBeTruthy();
      });
    });

    describe('when I type "a"', function() {
      it('displays a list of results', function() {
        runs(function() {
          $('#my-input').val('a').trigger('keydown');
        });

        waitsForReadyState();

        runs(function() {
          expect($('.livefield-result').length).toEqual(3);
        });
      });
    });

    describe('when I press ESC', function() {
      it('clears the input', function() {
        runs(function() {
          $('#my-input').val('a').trigger('keydown');
        });

        waitsForReadyState();

        runs(function() {
          var e = $.Event('keydown');
          e.which = 27;
          $('#my-input').trigger(e);
        });

        waitsForReadyState();

        runs(function() {
          expect($('#my-input').val()).toEqual('');
        });
      });
    });

    describe('when I clear the input', function() {
      it('displays removes the list of results', function() {
        runs(function() {
          $('#my-input').val('a').trigger('keydown');
        });

        waitsForReadyState();

        runs(function() {
          $('#my-input').val('').trigger('keydown');
        });

        waitsForReadyState();

        runs(function() {
          expect($('.livefield-results').length).toEqual(0);
        });
      });
    });

  });

});
