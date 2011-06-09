/**
 * # Livefield.js
 *
 * http://github.com/withassociates/livefield.js
 *
 * A simple live-lookup ui library.
 *
 * ## Usage
 *
 * As a basic use case, let's say we have an input in a cms that lets users
 * specify which page a thumbnail ought to link to.
 *
 * We have an action on the server `/pages/search` that will find matching
 * pages and return them as JSON.
 *
 * This is how we'd implement livefield:
 *
 *     <!-- input to bind to -->
 *     <input
 *       type="text"
 *       name="link_path"
 *       id="my-input"
 *       data-store="/pages/search/{{query}}"
 *       data-template="#link-template"
 *     />
 *
 *     <!-- template for result options -->
 *     <script type="template/handlebars" id="link-template">
 *       <li data-value="{{path}}">
 *         <span class="name">{{name}}</span>
 *         <span class="path">{{path}}</span>
 *       </li>
 *     </script>
 *
 *     <!-- and activate livefield -->
 *     <script>
 *       $('#my-input').livefield();
 *     </script>
 *
 * ### Data-store
 *
 * Your input needs `data-store` to specify the lookup URL. This can be
 * plain text or a handlebars template. If it's a template, it will
 * receive just the `query` paramters.
 *
 * ### Data-template
 *
 * Your input also needs `data-template`. This should be a jQuery-compatible
 * selector for the element containing the template. Typically, this will
 * be in a `script` tag as in the example above.
 *
 * ### Data-value
 *
 * Your result option template needs to have the `data-value` option.
 * The value of this attribute will be used to populate your input.
 *
 * ## Dependencies
 *
 * * jQuery ~> 1.5
 * * Handlebars ~> 1.0
 *
 * ## Contributors
 *
 * * jamie@withassociates.com
 *
 * ## License
 *
 * (The MIT License)
 *
 * Copyright (c) 2011 With Associates
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function($, window) {

// module Livefield
var Livefield = { VERSION: '0.0.0' };

// class Livefield.Controller
Livefield.Controller = function(options) {
  var self = this;

  // constants
  var KEY_ESC   = 27,
      KEY_UP    = 38,
      KEY_DOWN  = 40,
      KEY_ENTER = 13;
      DEFAULT_TEMPLATE = '<li class="livefield-result" data-value="{{value}}">{{name}}</li>';

  // views
  var $input,
      $results,
      template,
      savedVal;

  // -- SETUP --

  function setup() {
    $input = $(options.input);
    self.store = new Livefield.Store({
      url: options.store || $input.attr('data-store')
    });
    setupInput();
    setupStore();
    setupTemplate();
    setupBindings();
  }

  function setupInput() {
    $input.addClass('livefield-input');
  }

  function setupStore() {
    self.store = new Livefield.Store({
      url: options.store || $input.attr('data-store')
    });
  }

  function setupTemplate() {
    var $template = $($input.attr('data-template') || DEFAULT_TEMPLATE);
    template = Handlebars.compile($template.html());
  }

  function setupBindings() {
    $input.bind('keydown keypress', onKeyDown);
    $input.bind('focus', onFocus);
    $input.bind('blur', onBlur);
  }

  // -- ACTIONS --

  function update() {
    if (hasValue()) {
      find();
    } else {
      updateResults([]);
    }
  }

  function find() {
    self.store.find(value(), onFindComplete);
  }

  function updateResults(results) {
    if (results.length === 0) {
      removeResults();
    } else {
      appendResults();
      $results.html('');
      for (var i in results) {
        var result = results[i];
        var $result = $(template(result));
        $result.addClass('livefield-result');
        $result.appendTo($results);
      }
    }
  }

  function updateValue() {
    var $chosen = $results.find('.livefield-highlighted').first();
    if ($chosen.length > 0) {
      if (savedVal == null) savedVal = $input.val();
      $input.val($chosen.attr('data-value'));
    } else {
      if (savedVal) {
        $input.val(savedVal);
        savedVal = null;
      }
    }
  }

  function commit() {
    $input.blur();
    removeResults();
  }

  // -- HELPERS --

  function value() {
    return $input.val();
  }

  function hasValue() {
    return value() != '';
  }

  function appendResults() {
    if (!$results) {
      $results = $('<ul class="livefield-results" />').
        delegate('.livefield-result', 'mouseover', onMouseOver).
        delegate('.livefield-result', 'mouseout', onMouseOut).
        delegate('.livefield-result', 'mousedown', onMouseDown).
        insertAfter($input);
    }
  }

  function removeResults() {
    if ($results) {
      $results.remove();
      $results = null;
    }
  }

  function highlightResult(which) {
    switch (which) {
    case 'none':
      $results.find('.livefield-highlighted').
        removeClass('livefield-highlighted');
      break;
    case 'next':
      var $current = $results.find('.livefield-highlighted');
      var $next;

      if ($current.length > 0) {
        $next = $current.next();
      } else {
        $next = $results.find('.livefield-result:first-child');
      }

      if ($next.length > 0) {
        $current.removeClass('livefield-highlighted');
        $next.addClass('livefield-highlighted');
      }
      break;
    case 'prev':
      var $current = $results.find('.livefield-highlighted');

      if ($current.length > 0) {
        var $prev = $current.prev();
        $current.removeClass('livefield-highlighted');
        $prev.addClass('livefield-highlighted');
      }

      break;
    default:
      var $current = $results.find('.livefield-highlighted');
      var $chosen = $(which);
      $current.removeClass('livefield-highlighted');
      $chosen.addClass('livefield-highlighted');
    }
  }

  // -- EVENT HANDLERS --

  function onKeyDown(event) {
    if (event.which === KEY_DOWN && $results) {
      event.preventDefault();
      highlightResult('next');
      updateValue();
      return;
    }

    if (event.which === KEY_UP && $results) {
      event.preventDefault();
      highlightResult('prev');
      updateValue();
      return;
    }

    if (event.which === KEY_ENTER) {
      event.preventDefault();
      commit();
      return;
    }

    if (event.which === KEY_ESC) {
      $input.val('');
    }

    setTimeout(update, 0); // deferred
  }

  function onMouseOver(event) {
    highlightResult(this);
    updateValue();
  }

  function onMouseOut(event) {
    highlightResult('none');
    updateValue();
  }

  function onMouseDown(event) {
    highlightResult(this);
    updateValue();
    commit();
  }

  function onFocus(event) {
    update();
  }

  function onBlur(event) {
    removeResults();
  }

  function onFindComplete(results) {
    updateResults(results);
  }

  // -- RUN --

  setup();
}

// class Livefield.Store
Livefield.Store = function(options) {
  var self = this;

  self.find = function(query, callback) {
    if (self.data) {
      callback(self.data);
    } else {
      $.getJSON(self.urlFor(query)).then(
        function(data) {
          self.data = data;
          callback(self.data);
        },
        function() { // TODO
          $.error('Store failed to fetch data');
        }
      );
    }
  }

  self.reset = function() {
    self.data = null;
  }

  self.urlFor = function(query) {
    return self.urlTemplate({ query: query });
  }

  function setup() {
    self.urlTemplate = Handlebars.compile(options.url);
  }

  setup();
}

// jQuery plugin
$.fn.livefield = function() {
  return this.each(function() {
    new Livefield.Controller({
      input: this
    });
  });
}

// Make module globally available
window.Livefield = Livefield;

})(jQuery, window);
