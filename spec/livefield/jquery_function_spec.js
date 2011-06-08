describe('$.fn.livefield', function() {
  afterEach(function() {
    $('#spec').html('');
  });

  beforeEach(function() {
    $('<input type="text" id="my-input" />').appendTo('#spec');
    $('#my-input').livefield();
  });

  it('adds class "livefield-input"', function() {
    expect($('#my-input').hasClass('livefield-input')).toBeTruthy();
  });
});
