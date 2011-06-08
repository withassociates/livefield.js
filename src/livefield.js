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
 *     new Livefield({ input: '#my-input', store: '/options.json' });
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

  // private vars
  var $input,
      $results;

  // private functions
  var setup,
      setupInput,
      setupBindings,

      find,
      update,

      value,
      appendResults,
      removeResults,

      onKeyDown,
      onFindComplete;

  // -- SETUP --

  setup = function() {
    $input = $(options.input);
    self.store = new Livefield.Store({
      url: options.store || $input.attr('data-store')
    });
    setupInput();
    setupBindings();
  }

  setupInput = function() {
    $input.addClass('livefield-input');
  }

  setupBindings = function() {
    $input.bind('keydown', onKeyDown);
  }

  // -- ACTIONS --

  find = function() {
    self.store.find(value(), onFindComplete);
  }

  update = function(results) {
    updateResults(results);
  }

  updateResults = function(results) {
    if (results.length === 0) {
      removeResults();
    } else {
      appendResults();
      console.log(results);
      for (var i in results) { var result = results[i];
        $results.append(
          $('<li>' + result.name + '</li>')
        );
      }
    }
  }

  // -- HELPERS --

  value = function() {
    return $input.val();
  }

  appendResults = function() {
    if (!$results) {
      $results = $('<ul class="livefield-results" />');
      $results.insertAfter($input);
    }
  }

  removeResults = function() {
    if ($results) {
      $results.remove();
      delete $results;
    }
  }

  // -- EVENT HANDLERS --

  onKeyDown = function(event) {
    find();
  }

  onFindComplete = function(results) {
    update(results);
  }

  // -- RUN --

  setup();
}

// @class Livefield.Store
Livefield.Store = function(options) {
  var self = this;

  var setup;

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

  setup = function() {
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
