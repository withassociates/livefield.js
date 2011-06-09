# Livefield.js

http://github.com/withassociates/livefield.js

A simple live-lookup ui library.

## Usage

Given an input like this:

    <input type="text" data-source="my_store.json" id="my-input" />

We can activate with jQuery:

    $('#my-input').livefield();

Or directly:

    new Livefield.Controller({ input: '#my-input' });

### Simple Store

By default, Livefield expects to retrieve results from a url.

You can specify this url on the input:

    <input data-store="my_store.json" />

Or pass it in explicitly:

    new Livefield.Controller({ store: 'my_store.json' })

### Result templates

Specify the selector for the result template on the input element:

    <input type="text" data-template="#result-template" />

    <script type="template/handlbars" id="result-template">
      <li class="liveview-result" data-value="{{value}}">
        <span class="name">{{name}}</span>
        <span class="path">{{path}}</span>
      </li>
    </script>

## Dependencies

* jQuery ~> 1.5
* Handlebars ~> 1.0

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