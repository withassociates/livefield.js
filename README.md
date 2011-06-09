# Livefield.js

http://github.com/withassociates/livefield.js

A simple live-lookup ui library.

## Usage

As a basic use case, let's say we have an input in a cms that lets users
specify which page a thumbnail ought to link to.

We have an action on the server `/pages/search` that will find matching
pages and return them as JSON.

This is how we'd implement livefield:

    <!-- input to bind to -->
    <input
      type="text"
      name="link_path"
      id="my-input"
      data-store="/pages/search/{{query}}"
      data-template="#link-template"
    />

    <!-- template for result options -->
    <script type="template/handlebars" id="link-template">
      <li data-value="{{path}}">
        <span class="name">{{name}}</span>
        <span class="path">{{path}}</span>
      </li>
    </script>

    <!-- and activate livefield -->
    <script>
      $('#my-input').livefield();
    </script>

### Data-store

Your input needs `data-store` to specify the lookup URL. This can be
plain text or a handlebars template. If it's a template, it will
receive just the `query` paramters.

### Data-template

Your input also needs `data-template`. This should be a jQuery-compatible
selector for the element containing the template. Typically, this will
be in a `script` tag as in the example above.

### Data-value

Your result option template needs to have the `data-value` option.
The value of this attribute will be used to populate your input.

## Dependencies

* [jQuery](http://jquery.com/) ~> 1.5
* [Handlebars](http://handlebars.strobeapp.com/) ~> 1.0

## Contributors

* jamie@withassociates.com

## License

(The MIT License)

Copyright (c) 2011 With Associates

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.