function typesCharacter(char) {
  runs(function() {
    $('#my-input').focus();
    $('#my-input').val(char || 'a').trigger('keydown');
  });
  waits(100);
}

function clearsInput() {
  runs(function() {
    $('#my-input').val('').trigger('keydown');
  });
  waits();
}

function pressesKey(code) {
  runs(function() {
    var e = $.Event('keydown');

    e.which = {
      'up'    : 38,
      'down'  : 40,
      'esc'   : 27,
      'enter' : 13
    }[code];

    $('#my-input').trigger(e);
  });
  waits();
}

LivefieldMatchers = {

  toHaveClass: function(klass) {
    return $(this.actual).hasClass(klass);
  },

  toBeHighlighted: function() {
    return $(this.actual).hasClass('livefield-highlighted');
  },

  toHaveFocus: function() {
    return $(this.actual)[0] == $('*:focus')[0];
  },

  toMatch: function(count) {
    if (count === undefined) {
      return $(this.actual).length > 0;
    } else {
      return $(this.actual).length === count;
    }
  }

}
