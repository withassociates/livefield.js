describe('$.fn.livefield', function() {

  afterEach(function() {
    $('#spec').html('');
  });

  it('sets up livefield on the matched elements', function() {
    $('<input type="text" id="my-input" />').appendTo('#spec');
    spyOn(Livefield, 'Controller');
    $('#my-input').livefield();
    expect(Livefield.Controller).toHaveBeenCalledWith({ input: $('#my-input')[0] });
  });

});
