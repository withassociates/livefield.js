/*
 * Livefield
 */

(function($) {

// @namespace
var Livefield = {};

// @class Controller
Livefield.Controller = function(target, store) {
  var self = this;

  // constants
  var KEY_ESC   = 27,
      KEY_UP    = 38,
      KEY_DOWN  = 40,
      KEY_ENTER = 13;

  // private attrs
  var $input,
      $results,
      timeout,
      optionTemplate;

  // private methods
  var setup,
      listen,
      update,
      updateClass,
      updateOptions,
      onKeyDown,
      onFocus,
      onQueryResult,
      onStoreResponse,
      value,
      hasValue,
      moveUpOneOption,
      moveDownOneOption,
      clear,
      commit;

  // -- setup --

  setup = function() {
    $input = $(target);
    $input.addClass('livefield-input');
    $options = $('<ul class="livefield-options" />');
    $options.insertAfter($input);
    optionTemplate = Handlebars.compile($input.attr('data-option-template'));
    store = new Livefield.Store($input.attr('data-store'));
    update();
    listen();
  }

  listen = function() {
    $input.bind('keydown', onKeyDown);
    $input.bind('focus', onFocus);
  }

  // -- update --

  update = function() {
    updateClass();
    store.find(value(), onStoreResponse);
  }

  updateClass = function() {
    if (hasValue()) {
      $input.addClass('has-value');
    } else {
      $input.removeClass('has-value');
    }
  }

  updateOptions = function(options) {
    $options.html('');

    if (options.length === 0) {
      $options.hide();
    } else {
      $options.show();

      for (var i in options) {
        var option = options[i],
            $li = $(optionTemplate(option));

        $options.append($li);
      }
    }
  }

  // -- event handlers --

  onKeyDown = function(event) {
    if (event.which == KEY_ENTER) {
      event.preventDefault();
      commit();
      return;
    }

    if (event.which == KEY_UP) {
      event.preventDefault();
      moveUpOneOption();
      return;
    }

    if (event.which == KEY_DOWN) {
      event.preventDefault();
      moveDownOneOption();
      return;
    }

    if (event.which == KEY_ESC) clear();
    setTimeout(update, 0);
  }

  onStoreResponse = function(options) {
    updateOptions(options);
  }

  onFocus = function() {
    if (hasValue()) $options.show();
  }

  // -- helpers

  value = function() {
    return $input.val();
  }

  hasValue = function() {
    return value() != '';
  }

  // -- actions

  moveUpOneOption = function() {
    var $current = $options.find('.livefield-active-option');

    if ($current.length > 0) {
      var $prev = $current.prev();
      if ($prev.length > 0) {
        $current.removeClass('livefield-active-option');
        $prev.addClass('livefield-active-option');
        $input.val($prev.data('value'));
      }
    } else {
      var $prev = $options.find('.livefield-option').last();
      $prev.addClass('livefield-active-option');
      $input.val($prev.data('value'));
    }
  }

  moveDownOneOption = function() {
    var $current = $options.find('.livefield-active-option');

    if ($current.length > 0) {
      var $next = $current.next();
      if ($next.length > 0) {
        $current.removeClass('livefield-active-option');
        $next.addClass('livefield-active-option');
        $input.val($next.data('value'));
      }
    } else {
      var $next = $options.find('.livefield-option').first();
      $next.addClass('livefield-active-option');
      $input.val($next.data('value'));
    }
  }

  clear = function() {
    $input.val('');
  }

  commit = function() {
    $options.hide();
    $input.blur();
  }

  // -- run

  setup();
}

// @class Store
Livefield.Store = function(url) {
  var self = this;

  self.url = url;

  self.find = function(query, callback) {
    if (query === '') {
      callback([]);
    } else {
      callback([
        { name: "About us"               , path: "/our-company/about-us"            },
        { name: "About our suppliers"    , path: "/our-company/about-our-suppliers" },
        { name: "Roundabout maintenance" , path: "/services/roundabout-maintenance" }
      ]);
    }
  }

}

// jQuery function
$.fn.livefield = function() {
  return this.each(function() { new Livefield.Controller(this) });
}

})(jQuery);
