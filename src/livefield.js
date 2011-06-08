/**
 * # Livefield.js
 *
 * http://github.com/withassociates/livefield.js
 *
 * A simple live-lookup ui library.
 *
 * ## Usage
 *
 * Given an input like this:
 *
 *     <input type="text" data-source="/options.json" id="my-input" />
 *
 * We can activate with jQuery:
 *
 *     $('#my-input').livefield();
 *
 * Or directly:
 *
 *     new Livefield({ input: '#my-input' });
 *
 * ### Simple Store
 *
 * By default, Livefield expects to retrieve results from a url.
 *
 * You can specify this url on the input:
 *
 *     <input data-store="/my_store.json" />
 *
 * Or pass it in explicitly:
 *
 *     new Livefield({ store: '/my-store.json' })
 *
 * ## Dependencies
 *
 * * jQuery ~> 1.5
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

// @namespace Livefield
var Livefield = {};

// @class Livefield.Controller
Livefield.Controller = function(options) {
  var self = this;

  // constants
  var KEY_ESC   = 27,
      KEY_UP    = 38,
      KEY_DOWN  = 40,
      KEY_ENTER = 13;

  // private vars
  var $input,
      $results,
      template;

  // -- SETUP --

  function setup() {
    $input = $(options.input);
    self.store = new Livefield.Store({
      url: options.store || $input.attr('data-store')
    });
    setupInput();
    setupStore();
    setupBindings();
    self.state = 'ready';
  }

  function setupInput() {
    $input.addClass('livefield-input');
  }

  function setupStore() {
    self.store = new Livefield.Store({
      url: options.store || $input.attr('data-store')
    });
  }

  function setupBindings() {
    $input.bind('keydown', onKeyDown);
  }

  // -- ACTIONS --

  function update() {
    self.state = 'updating';

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
      for (var i in results) { var result = results[i];
        $results.append(
          $('<li class="livefield-result">' + result.name + '</li>')
        );
      }
    }
    self.state = 'ready';
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
      $results = $('<ul class="livefield-results" />');
      $results.insertAfter($input);
    }
  }

  function removeResults() {
    if ($results) {
      $results.remove();
      $results = null;
    }
  }

  // -- EVENT HANDLERS --

  function onKeyDown(event) {
    self.state = 'updating';

    if (event.which === KEY_ESC) {
      $input.val('');
    }

    setTimeout(update, 0); // deferred
  }

  function onFindComplete(results) {
    updateResults(results);
  }

  // -- RUN --

  setup();
}

// @class Livefield.Store
Livefield.Store = function(options) {
  var self = this;

  self.find = function(query, callback) {
    if (self.data) {
      callback(self.data);
    } else {
      $.ajax({
        url: self.url,
        dataType: 'json',
        success: function(data) {
          self.data = data;
          callback(self.data);
        }
      });
    }
  }

  function setup() {
    self.url = options.url;
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
