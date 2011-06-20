describe('Livefield results list', function() {

  beforeEach(function() {
    createContainer();
    this.addMatchers(LivefieldMatchers);
    this.$input = createInput();
    this.controller = new Livefield.Controller({ input: '#my-input' });
    typesCharacter();
    runs(function() { this.$results = $('.livefield-results') });
  });

  afterEach(function() {
    clear();
  });

  it('is positioned absolutely', function() {
    runs(function() {
      expect(this.$results.css('position')).toEqual('absolute');
    });
  });

  it('is positioned directly below the input', function() {
    var inputBottom = this.$input.offset().top + this.$input.outerHeight();
    var resultsTop = this.$results.offset().top;
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
      var resultsLeft = this.$results.offset().left;
      expect(resultsLeft).toEqual(inputLeft);
    });
  });

  it('has z-index 1000', function() {
    expect(this.$results.css('z-index').toString()).toEqual('1000');
  });

  it('is appended to body', function() {
    expect(this.$results.parent()[0]).toEqual($('body')[0]);
  });

  it('matches the input width', function() {
    var inputWidth = this.$input.outerWidth();
    var resultsWidth = this.$results.outerWidth();
    expect(resultsWidth).toEqual(inputWidth);
  });

  describe('onresize', function() {
    beforeEach(function() {
      this.$input.width(500);
      $(window).trigger('resize');
    });

    it('still matches width', function() {
      var inputWidth = this.$input.outerWidth();
      var resultsWidth = this.$results.outerWidth();
      expect(resultsWidth).toEqual(inputWidth);
    });
  });

});
