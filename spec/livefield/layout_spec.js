describe('Livefield results list', function() {

  beforeEach(function() {
    createContainer();
    this.addMatchers(LivefieldMatchers);
    this.$input = createInput();
    this.$input.css({
      position: 'absolute',
      width: '750px',
      top: 0,
      bottom: 'auto'
    });
    this.controller = new Livefield.Controller({ input: '#my-input' });
    typesCharacter();
  });

  afterEach(function() {
    clear();
  });

  it('is positioned absolutely', function() {
    runs(function() {
      expect($('.livefield-results').css('position')).toEqual('absolute');
    });
  });

  it('is positioned directly below the input', function() {
    var inputBottom = this.$input.offset().top + this.$input.outerHeight();
    var resultsTop = $('.livefield-results').offset().top - parseInt($('.livefield-results').css('margin-top'), 10);
    expect(resultsTop).toEqual(inputBottom);
  });

  it('is aligned horizontally with the input', function() {
    runs(function() {
      this.$input.css('margin-left', 20);
      $(window).trigger('resize');
    });
    waits();
    runs(function() {
      var inputLeft = this.$input.offset().left;
      var resultsLeft = $('.livefield-results').offset().left;
      expect(resultsLeft).toEqual(inputLeft);
    });
  });

  it('has z-index 1000', function() {
    expect($('.livefield-results').css('z-index').toString()).toEqual('1000');
  });

  it('is appended to body', function() {
    expect($('.livefield-results').parent()[0]).toEqual($('body')[0]);
  });

  it('matches the input width', function() {
    runs(function() {
      var inputWidth = this.$input.outerWidth();
      var resultsWidth = $('.livefield-results').outerWidth();
      expect(resultsWidth).toEqual(inputWidth);
    });
  });

  describe('onresize', function() {
    beforeEach(function() {
      this.$input.width(500);
      $(window).trigger('resize');
    });

    it('still matches width', function() {
      var inputWidth = this.$input.outerWidth();
      var resultsWidth = $('.livefield-results').outerWidth();
      expect(resultsWidth).toEqual(inputWidth);
    });
  });

  describe('if input is too close to the bottom of the page', function() {
    beforeEach(function() {
      clearsInput();
      runs(function() {
        this.$input.css({ position: 'absolute', top: 'auto', bottom: 0 })
      });
      typesCharacter();
    });

    it('positions above the input', function() {
      runs(function() {
        var inputTop = this.$input.offset().top;
        var resultsTop = $('.livefield-results').offset().top;
        var resultsBottom = resultsTop + $('.livefield-results').outerHeight() + parseInt(this.$input.css('marginTop'), 10);
        expect(resultsBottom).toEqual(inputTop);
      });
    });

    it('gives results the drop-up class', function() {
      runs(function() {
        expect('.livefield-results').toHaveClass('livefield-drop-up');
      });
    });
  });

});
