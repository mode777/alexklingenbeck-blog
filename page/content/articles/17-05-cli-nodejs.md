{{##
    def.$layout = "article";
    def.disqusId = "17-05-cli-nodejs";
    def.title = "Building Command-Line-Interfaces with Node.js";
    def.lead = "This tutorial will guide you through the steps required to create and publish expressive, cross-platform CLI applications with Node.js and Commander.js.";
    def.tags = ["nodejs"];
    def.isBlog = true;
    def.date = new Date(2017, 4, 14);
#}}

<!--I recently turned my static website generator [page-gen]({{= it.href("articles/17-05-page-gen.html") }}) into a command-line-interface (CLI). As it turns out it's incredibly easy to create and distribute with node.-->

# Why node.js

Building a CLI should be an easy task in every programming language. However I always found it cumbersome to distribute them - especially under windows. With npm distribution, installation and usage just boils down to

```
npm publish
npm install -g your-app 
your-app --option 
``` 

To follow along this tutorial, you should have [Node.js](https://nodejs.org/en/) installed - obviously.

# Creating a package

Create a new folder for your app. Open the command line and create a new node package with `npm init`. After filling out some info about your package, there will be a file created called __package.json__, which will look similar to this:

```
{
  "name": "my-cli-app",
  "version": "1.0.0",
  "description": "A demo cli application",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Alexander Klingenbeck",
  "license": "MIT"
}
``` 

# Making it executable

To make your app available from the command line, package.json has the ["bin" option](https://docs.npmjs.com/files/package.json#bin). Let's add it:

```
"bin": {
    "my-cli-app": "./index.js"
}
```

This is telling node to run your index.js, when the user types "my-cli-app" on the command line. 

## Under the hood
If you are interested, how this works under the hood: During installation Node will create a cmd script (on Windows) or a sh script (on Linux, probably on Mac too) inside it's path location which looks something like this (on Windows):

```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\my-cli-app\index.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\my-cli-app\index.js" %*
)
```

Basically this justs runs node with your script as argument. As I said, you do not need to do this yourself. It's still interesting to know whats going on behind the curtains.

# Creating the interface with Commander

As you might have noticed, we don't have our `index.js` yet. Lets create a new file with this name in the same directory.

You could, theoretically, just write your cli application with no further dependencies from here. The `process.argv` array will contain all arguments you will need. However, if you want a nice interface, with --help and optional arguments there might be a lot of boilerplate code to write and some regexes to parse (everybody loves regexp, right?).

Commander.js is a great little framework that will do these tedious tasks for us. To install it run:
```
npm install --save commander
```
The _--save_ switch tells npm to add commander as a dependency in your package.json. When someone will install your app, commander is automatically installed as well. Now you can use commander in your app. Here is a simple example, how a simple app could look like:

``` js
#!/usr/bin/env node

const commander = require("commander");

let cli = commander
    .command("my-cli-app")
    .description("Put your description here")
    .arguments("[myargument]")
    .option('-m, --myoption <value>', 'some optional value')
    .version('1.0.0')
    .parse(process.argv);

console.log("Argument: ", cli.args[0]);
console.log("Optional value:", cli.myoption);
```

The first line tells the environment, that this is a script to be executed with Node.js. You will typically find this in POSIX environments but here it seems to be necessary on Windows as well. Then we load commander and let it parse our command line arguments. The fluent API is probably pretty self explanatory, I suggest you have a look at the [commander documentation](https://github.com/tj/commander.js/) for more info. Now you test the app:
```
node index.js MyArgument --myoption OptionalArg
```
Which should yield this output:
```
>Argument:  MyArgument
>Optional value: OptionalArg
```

In this example the `.option(...)` part is the only thing you would really need for your program to work. All the others will contribute to the help page. When you run the app with:
```
node index.js --help
```
You will get a nice little usage information:
```
>  Usage: my-cli-app [options] [myargument]
>
>  Put your description here
>
>  Options:
>
>    -h, --help              output usage information
>    -m, --myoption <value>  some optional value
>    -V, --version           output the version number
```
<div class="alert alert-danger" role="alert">
<div><strong>Beware of line feeds</strong></div>
<p>
  Make sure your line endings for your index.js are just line feeds (LF) instead of the additional carriage returns you will find on windows (CRLF). I had problems running my app on linux when there were CRs in the file. Most IDEs and editors will let you change these.
</p>
<p>
    If your are using Typescript, you have to add <code>"newLine": "LF"</code> to your tsconfig.json. 
</p>
</div>

## Publishing and installation

Once your awesome app is finished, all you need to do is publish it to the npm registry so other users can easily install it via npm. If you don't have an npm account yet, you can easily create one using:`npm adduser`.
Now to publish you app, simply type:
```
npm publish
```
If you want to update your app, just change the version number in your package.json and run `npm publish` again.

Now you can easily install the app from any computer you like by typing:
```
npm install -g my-cli-app
```
The _-g_ parameter tells npm to do a global install. CLI apps should always be globally installed, so you can access them from every directory you like. After installation you can test your app with:
```
my-cli-app --help
```

## Summary

As you can see, Node.js, NPM and Commander.js make it incredibly easy to create and distribute cross-platform CLI tools. I think this will contribute to the trend of CLI tools in developement, like we have seen with yeoman, tsc or angular-cli. 







