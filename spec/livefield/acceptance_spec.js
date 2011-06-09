describe('Livefield', function() {

  beforeEach(function() {
    this.addMatchers(LivefieldMatchers);

    $('<div id="spec" />').appendTo('body');

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
        expect('.livefield-result').toMatchElements(3);
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
        expect(this.$result.find('.name')).toMatchElements();
      });
    });

    it('has a path', function() {
      runs(function() {
        expect(this.$result.find('.path')).toMatchElements();
      });
    });
  });

  describe('when I press ESC', function() {
    it('clears the input', function() {
      typesCharacter();
      pressesKey('esc');
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
        expect('.livefield-results').not.toMatchElements();
      });
    });
  });

  describe('given no result is highlighted, when I press down', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('down');
    });

    it('highlights the first result', function() {
      runs(function() {
        expect('.livefield-result:first-child').toBeHighlighted();
      });
    });

    it('set input value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('/about-us');
      });
    });
  });

  describe('given the first result is highlighted, when I press down', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('down');
      pressesKey('down');
    });

    it('highlights the second result', function() {
      runs(function() {

      });
    });

    it('sets the input value', function() {
      runs(function() {

      });
    });
  });

  describe('given the last result is highlighted, when I press down', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('down');
      pressesKey('down');
      pressesKey('down');
      pressesKey('down');
    });

    it('stays on the last result', function() {
      runs(function() {
        expect('.livefield-result:last-child').toBeHighlighted();
      });
    });
  });

  describe('given no result is highlighted, when I press up', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('up');
    });

    it('does not highlight anything', function() {
      runs(function() {
        expect('.livefield-highlighted').not.toMatchElements();
      });
    });

    it('does not change input value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('a');
      });
    });
  });

  describe('when I press up on the first result', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('down');
      pressesKey('up');
    });

    it('clears highlighting', function() {
      runs(function() {
        expect('.livefield-highlighted').not.toMatchElements();
      });
    });

    it('sets the value back to the original search', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('a');
      });
    });
  });

  describe('when I press up on the second result', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('down');
      pressesKey('down');
      pressesKey('up');
    });

    it('highlights the first result', function() {
      runs(function() {
        expect('.livefield-result:first-child').toBeHighlighted();
      });
    });

    it('sets the value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('/about-us');
      });
    });
  });

  describe('given I have selected a result, when I press enter', function() {
    beforeEach(function() {
      typesCharacter();
      pressesKey('down');
      pressesKey('enter');
    });

    it('removes the results list', function() {
      runs(function() {
        expect('.livefield-results').not.toMatchElements();
      });
    });

    it('sets the value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('/about-us');
      });
    });

    it('blurs the input', function() {
      runs(function() {
        expect(this.$input).not.toHaveFocus();
      });
    });
  });

  describe('given there are result, but I have not selected any, when I press enter', function() {
    beforeEach(function() {
      spyOn(window, 'onerror');
      typesCharacter();
      pressesKey('enter');
    });

    it('does not cause any errors', function() {
      runs(function() {
        expect(window.onerror).not.toHaveBeenCalled();
      });
    });

    it('does not change the value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('a');
      });
    });

    it('blurs the input', function() {
      runs(function() {
        expect(this.$input).not.toHaveFocus();
      });
    });

    it('removes the results', function() {
      runs(function() {
        expect('.livefield-results').not.toMatchElements();
      });
    });
  });

  describe('given there are no results, when I press down', function() {
    it('does not cause any errors', function() {
      spyOn(window, 'onerror');
      pressesKey('down');
      runs(function() {
        expect(window.onerror).not.toHaveBeenCalled();
      });
    });
  });

});
