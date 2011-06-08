describe('$.fn.livefield', function() {
  template('simple_input.html');

  beforeEach(function() {
    $('#my-input').livefield();
  });

  it('adds class "livefield-input"', function() {
    expect($('#my-input').hasClass('livefield-input')).toBeTruthy();
  });
});
