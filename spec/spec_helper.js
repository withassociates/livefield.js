function typesCharacter(char) {
  runs(function() {
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
    e.which = code;
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
  toMatch: function(count) {
    if (count === undefined) {
      return $(this.actual).length > 0;
    } else {
      return $(this.actual).length === count;
    }
  }
}
