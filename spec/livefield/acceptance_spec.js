describe('Livefield', function() {

  var UP    = 38,
      DOWN  = 40,
      ESC   = 27,
      ENTER = 13;

  beforeEach(function() {
    this.addMatchers(LivefieldMatchers);
  });

  describe('given a simple input and simple datasource', function() {

    beforeEach(function() {
      this.$input =
        $('<input />').
        attr('type'         , 'text').
        attr('id'           , 'my-input').
        attr('data-store'   , 'spec/fixtures/my_store.json').
        attr('data-template', '#livefield-result-template');

      $('#spec').append(this.$input);

      this.controller = new Livefield.Controller({ input: '#my-input' });
    });

    afterEach(function() {
      $('#spec').html('');
    });

    describe('on creation', function() {
      it('adds a class onto the input', function() {
        expect(this.$input).toHaveClass('livefield-input');
      });
    });

    describe('when I type a character', function() {
      it('displays a list of results', function() {
        typesCharacter();
        runs(function() {
          expect('.livefield-result').toMatch(3);
        });
      });
    });

    describe('a result', function() {
      beforeEach(function() {
        typesCharacter();
        runs(function() {
          this.$result = $('.livefield-result:first-child');
        });
      });

      it('has a name', function() {
        runs(function() {
          expect(this.$result.find('.name')).toMatch();
        });
      });

      it('has a path', function() {
        runs(function() {
          expect(this.$result.find('.path')).toMatch();
        });
      });
    });


    describe('when I press ESC', function() {
      it('clears the input', function() {
        typesCharacter();
        pressesKey(27);
        runs(function() {
          expect(this.$input.val()).toEqual('');
        });
      });
    });

    describe('when I clear the input', function() {
      it('removes the list of results', function() {
        typesCharacter();
        clearsInput();
        runs(function() {
          expect('.livefield-results').toMatch(0);
        });
      });
    });

    describe('when I press down', function() {
      beforeEach(function() {
        typesCharacter();
        pressesKey(40);
      });

      it('highlights the first result', function() {
        runs(function() {
          expect('.livefield-result:first-child').toBeHighlighted();
        });
      });

      describe('when I press down again', function() {
        it('highlights the second result', function() {
          pressesKey(40);
          runs(function() {
            expect('.livefield-result:nth-child(2)').toBeHighlighted();
          });
        });
      });
    });

    describe('when I press down on the last result', function() {
      it('stays on the last result', function() {
        typesCharacter();
        pressesKey(40);
        pressesKey(40);
        pressesKey(40);
        pressesKey(40);
        runs(function() {
          expect('.livefield-result:last-child').toBeHighlighted();
        });
      });
    });

    describe('when I press up with nothing highlighted', function() {
      it('does nothing', function() {
        typesCharacter();
        pressesKey(38);
        runs(function() {
          expect('.livefield-highlighted').toMatch(0);
        });
      });

    });

    describe('when I press up on the first result', function() {
      it('clears highlighting', function() {
        typesCharacter();
        pressesKey(40);
        pressesKey(38);
        runs(function() {
          expect('.livefield-highlighted').toMatch(0);
        });
      });
    });

    describe('when I press up on the second result', function() {
      it('highlights the first result', function() {
        typesCharacter();
        pressesKey(40);
        pressesKey(40);
        pressesKey(38);
        runs(function() {
          expect('.livefield-result:first-child').toBeHighlighted();
        });
      });
    });

  });

});
