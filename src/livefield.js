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
  var $input;

  // private functions
  var setup,
      setupInput;

  // -- SETUP --

  setup = function() {
    $input = $(options.input);
    setupInput();
  }

  setupInput = function() {
    $input.addClass('livefield-input');
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
