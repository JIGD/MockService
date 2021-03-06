MockService
===========
This is a generic mocking service using node.js

Instructions:
-------------------------------------------------------------------
Install node.js

Set the matching pattern and name of the message that you want to send in responses.js then using the command line / terminal go to the directory containing these scripts and run mock.js (node mock.js)

You can pass desired port to listen and type of files to send (currently xml or json only), if you don't pass any defaults are port 1337 and xml files
Using node mock 1300 xml should start the server listening to port 1300 and using xml files

Remember, to use a mocking service you have to point your app/system url to the mocking service instead of the regular url.

E.G. Change URL = https://EbayWS.com/something to http://localhost:1337

If you ever need to debug you can add console.log("") to output information to the console and if you need the contents of an object you can use util.inspect() to obtain it's values

Functionality:
-------------------------------------------------------------------

What this does is check the request body using the regex values in responses.js, it will send the listed file. If there are no matches it will send the default file listed in mock.js

For example: we have these patterns and responses: 

  	pattern: /regexrofindapattern/,
		response: {
			file: "someFile.xml"
		}
	}, {
		pattern: /findItemsByResponse/,
		response: {
			file: "searchRS.xml"
		}

So the mock will search for "<regexrofindapattern" and "<findItemsByKeywordsRequest" or any other regex pattern/file you want to use.

if we had a request with these in its XML:

<pre>
  blablabla
  findItemsByResponse
  blablablablabla
</pre>

it would return the searchRS.xml since it matches.
