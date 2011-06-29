describe('Livefield', function() {

  beforeEach(function() {
    createContainer();
    this.addMatchers(LivefieldMatchers);
    this.$input = createInput();
    this.controller = new Livefield.Controller({ input: '#my-input' });
  });

  afterEach(function() {
    clear();
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
        expect('.livefield-result:nth-child(2)').toBeHighlighted();
      });
    });

    it('sets the input value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('/about-our-suppliers');
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

  describe('given there are results, but I have not selected any, when I press enter', function() {
    beforeEach(function() {
      window.onerror = window.onerror || function() {};
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

  describe('given the input has a value', function() {
    beforeEach(function() {
      typesCharacter();
      blursInput();
    });

    describe('when the input loses focus', function() {
      beforeEach(function() {
        focusesInput();
        blursInput();
      });

      it('removes results', function() {
        runs(function() {
          expect('.livefield-results').not.toMatchElements();
        });
      });
    });

    describe('when the input gains focus', function() {
      beforeEach(function() {
        blursInput();
        focusesInput();
      });

      it('shows results', function() {
        runs(function() {
          expect('.livefield-results').toMatchElements();
        });
      });
    });

  });

  describe('when I mouse over the first result', function() {
    beforeEach(function() {
      typesCharacter();
      runs(function() {
        $('.livefield-result:first-child').trigger('mouseover');
      });
    });

    it('highlights the first result', function() {
      runs(function() {
        expect('.livefield-result:first-child').
        toHaveClass('livefield-highlighted');
      });
    });

    describe('and then the second', function() {
      beforeEach(function() {
        runs(function() {
          $('.livefield-result:nth-child(1)').trigger('mouseout');
          $('.livefield-result:nth-child(2)').trigger('mouseover');
        });
      });

      it('removes highlights from the first', function() {
        runs(function() {
          expect('.livefield-result:nth-child(1)').
          not.toHaveClass('livefield-highlighted');
        });
      });

      it('highlights the second', function() {
        runs(function() {
          expect('.livefield-result:nth-child(2)').
          toHaveClass('livefield-highlighted');
        });
      });
    });

    describe('and then mouseout entirely', function() {
      beforeEach(function() {
        runs(function() {
          $('.livefield-result:first-child').trigger('mouseout');
        });
      });

      it('removes all highlights', function() {
        runs(function() {
          expect('.livefield-highlighted').not.toMatchElements();
        });
      });
    });

  });

  describe('when I click a result', function() {
    beforeEach(function() {
      typesCharacter();
      runs(function() {
        $('.livefield-result:first-child').trigger('mousedown');
      });
    });

    it('sets the value', function() {
      runs(function() {
        expect(this.$input.val()).toEqual('/about-us');
      });
    });

    it('removes the results', function() {
      runs(function() {
        expect('.livefield-results').not.toMatchElements();
      });
    });

    it('blurs the input', function() {
      runs(function() {
        expect(this.$input).not.toHaveFocus();
      });
    });
  });

});
