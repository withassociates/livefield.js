describe('$.fn.livefield', function() {
  beforeEach(function() {
    $('<input type="text" id="my-input" />').appendTo(document.body);
    $('#my-input').livefield();
  });

  it('adds class "livefield-input"', function() {
    expect($('#my-input').hasClass('livefield-input')).toBeTruthy();
  });
});
