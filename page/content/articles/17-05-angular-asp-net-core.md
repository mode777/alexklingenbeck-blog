{{##
    def.$layout = "article";
    def.disqusId = "17-05-angular-asp-net-core";
    def.title = "Using Angular CLI with ASP.NET Core";
    def.lead = "It is possible to integrate the convenience of Angular CLI into a ASP.NET Core application - find out how!";
    def.tags = ["angular", "ASP.NET core"];
    def.isBlog = true;
    def.date = new Date(2017, 4, 28);
#}}

<div class="alert alert-info" role="alert">
      You can find the finished project on <a href="https://github.com/mode777/aspnet-angular2-csproj">GitHub</a>. Feel free to fork!
</div>

## Angular CLI

Setting up an Angular app is not a simple task. Appart from creating the relatively complex project structure, configuring the Typescript compiler and installing type definitions, you have to choose a module and/or build system and rig it all together. 

Angular CLI does a great job in getting you started. Some of it's features include:

* A Webpack-based incremental buildsystem, which will transform your Typescript modules into Javascript and bundle them into a few files which can be minified.
* A built in dev-server which supports hot module replacement. This way you can instantly see your changes without having to reload your browser.
* Support for unit tests and for end to end testing (running tests in a headless browser).
* Scaffolding modules, components and services via the CLI.

## What's the problem?

As you can see Angular CLI does abstract a lot of the complexity away. This also leads to a problem:
As most of the convenience functions are coupled to the dev-server. Apart from hot module replacement this includes rerouting arbitrary URLs back to your index.html so you can use push-API-style URLs. Even worse, Angular CLI is hiding the Webpack configuration for [some reason](https://github.com/angular/angular-cli/issues/1656). 

At this point you have three options:
1. Do not use Angular CLI for production.
2. Keep your client app seperate from your API and enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). (This still won't solve your routing problem) 
3. Read on...

## Enter: AspNetCore.SpaServices

Fortunately we can make our ASP.NET Core application solve most of these problems with a nuget package called `Microsoft.AspNetCore.SpaServices`. This package can...
 * ...run our Webpack-build for us.
 * ...handle Hot-Module-Replacement,
 * ...help us with server-side routing.

SpaService can also do server-side prerendering which is an extremely powerful feature e.g. for SEO, but I will save this for a future post.

To sum things up: With `Microsoft.AspNetCore.SpaServices` we can make our ASP.NET Core App aware, that it's hosting a Single-Page-Application and we can persuade it to take over most of the chores the dev-server would have done - like running Webpack and performing HMR.

## Prerequisites

I'm asuming you have [Node.js](http://nodejs.org), [Angular CLI](http://cli.angular.io) and at least [.Net Core Runtime 1.1 as well as the .Net Core SDK 1.04](https://www.microsoft.com/net/core) installed. 

<div class="alert alert-danger" role="alert">
    <p><strong>Disclaimer</strong></p>
    <p>
    For this example I will be using .Net Core SDK 1.04. .Net Core projects used to have a project format called <code>project.json</code>. This has been replaced with the new `*.csproj` format a couple of releases ago. Despite the familar name, these projects are no longer compatible with Visual Studio 2015. If your are still using VS 2015, you can either upgrade to VS 17, use Visual Studio Code or have a look at the VS-2015-compatible template, I have on <a href="https://github.com/mode777/aspnet-angular2">GitHub</a>.
    </p>
</div>

## Step 1: Building the ASP.NET Core App

First of we will create a minimal ASP.NET Core WebApi application as a base. Create a new directory for your project, open a shell in it and run `dotnet new webapi`.

Next, lets add the needed packages. In the same shell run:
```
> dotnet add package Microsoft.AspNetCore.StaticFiles
> dotnet add package Microsoft.AspNetCore.SpaServices
```

Next you can run `dotnet restore` to download and install the referenced packages and `dotnet run` to test your app.

If you head to `http://localhost:5000/api/values` you should see some sample JSON-Data, if the application is running correctly.

## Step 2: Creating the Angular App

Go into another unrelated folder an create an app with Angular CLI. Open a shell and run
```
> ng new my-angular-app`
> cd my-angular-app
> cd ng eject
```

The last command is the most important step in these instructions. As this will make Angular CLI output to `webpack.config.js` file, which we will need to run Webpack without the help of Angular CLI. Please note that some commands like `ng build` will no longer work after this.

## Step 3: Merging the projects

In this step we will integrate the Angular CLI project structure into our ASP.NET Core project. You don't have to do it like me. I just thought this was a reasonable approach.

First rename the folder `src` to `ClientApp`. Then copy everything in your Angular App folder over to to your ASP.NET Core App folder, so that the `.angular-cli.json` is in the root of your ASP.NET Core app.

As we renamed the `src` folder, some paths need to be adjusted. In `.angular-cli.json` I adjusted the following paths. Ignore the `./../Views/Shared/_WebpackTemplate.cshtml` for now. We will need it later.
```js
{
  ...
  "apps": [
    {
      "root": "ClientApp",
      "outDir": "wwwroot",
      "index": "./../Views/Shared/_WebpackTemplate.cshtml",
      ...      
    }
  ],
  ...
  "lint": [
    {
      "project": "ClientApp/tsconfig.app.json"
    },
    {
      "project": "ClientApp/tsconfig.spec.json"
    }
    ...
  ],
  ...
}

```

In `karma.conf.js` we just adjust some paths:
```js
module.exports = function (config) {
  config.set({
    ...
    files: [
      { pattern: './ClientApp/test.ts', watched: false }
    ],
    preprocessors: {
      './ClientApp/test.ts': ['@angular/cli']
    },
    ...
  });
};
```

In `protractor.conf.js` we need to change the port of the application. In ASP.NET Core, the default is 5000.
```
...

exports.config = {
  ...
  baseUrl: 'http://localhost:5000/',
  ...
};

```

`webpack.config.js` can be a bit overwhelming. Make sure to make a backup first. Here we're mainly adjusting paths again. We also tell the HtmlWebpackPlugin (This plugin will automatically reference your Webpack chunks in your index-HTML-file) to use `./Views/Shared/_WebpackTemplate.cshtml` as a template for the `Index.cshtml` that will serve as our single page application - more on that later. We're also telling Webpack to output it's chunks to `wwwroot/dist` where ASP.NET Core will serve it's static files from.

```js
module.exports = {
  ...
  "entry": {
    "main": [
      "./ClientApp/main.ts"
    ],
    "polyfills": [
      "./ClientApp/polyfills.ts"
    ],
    "styles": [
      "./ClientApp/styles.scss"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "wwwroot/dist"),
    ...
  },
  "module": {
    "rules": [
      ...
      {
        "include": [
          path.join(process.cwd(), "ClientApp/styles.css")
        ]
        ...
      }
      ...
    ]
  },
  "plugins": [
    ...,
    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets",
        "favicon.ico"
      ],
      "globOptions": {
        "cwd": __dirname + "/ClientApp",
        ...
      }
    }),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      "template": "./Views/Shared/_WebpackTemplate.cshtml",
      "filename": "./../../Views/Home/Index.cshtml",
      ...
    }
    ...
    new AotPlugin({
      ...
      "tsConfigPath": "ClientApp/tsconfig.app.json",
      ...
    })
  ],
  ...
};
```


### Step 4: Preparing our Angular app for ASP.NET Core

Open a shell shell install these additional packages in npm:
```
> npm install --save-dev aspnet-webpack 
> npm install --save-dev webpack-hot-middleware
```
These are needed for Webpack integration into ASP.NET Core.

To enable hot-module reloading modify your `./ClientApp/main.ts` to look like this.
```js
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// You need to add this...
if (module['hot']) {
    module['hot'].accept();
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

## Step 5: Preparing our ASP.NET Core app for Angular

Add the following files to you project: First up is a super simple MVC-Controller that should serve our index.html from every route: `./Controllers/Home.cs`:
```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

Create an empty `./Views/Home` folder. And the file `./Views/Shared/_WebpackTemplate.cshtml` which is just a simple HTML template:
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <base href="/">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <app-root>Loading...</app-root>
</body>
</html>
```
Webpack will use the contents of this file, add script-tags for the chunks to it and write it to `./Views/Home/Index.cshtml`, where our controller will serve it.


We're almost done. Last thing we need to do is setup some stuff in the `./Startup.cs`:
```csharp
// ...
using Microsoft.AspNetCore.SpaServices.Webpack;
// ...

public class Startup
{
    private readonly IHostingEnvironment _hostingEnvironment;

    public Startup(IHostingEnvironment env)
    {
        _hostingEnvironment = env;

        var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            .AddEnvironmentVariables();
        Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        // Add framework services.
        services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
        // only enable webpack building in Developement environment
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            {
                HotModuleReplacement = true
            });
        }

        app.UseStaticFiles();

        loggerFactory.AddConsole(Configuration.GetSection("Logging"));
        loggerFactory.AddDebug();

        app.UseMvc(routes => 
        {
            routes.MapRoute(
                name: "default",
                template: "api/{controller}/{id?}");
            // add a special route for our index page
            routes.MapSpaFallbackRoute(
                name: "spa-fallback",
                defaults: new { controller = "Home", action = "index" });
        });
    }
}
```

The important changes take place in the _Configure_ Method. First we enable the Webpack dev-server with Hot-Module-Replacement, then we enable serving static files and lastly we configure a speacial Route, that will always serve our Home/Index view when an unknown route is found - enabling push-API-style routing without the need for the _#_-character. 

<div class="alert alert-danger" role="alert">
If you are using Visual Studio, make sure you disable automatic Typescript compilation. Otherwise you might end up compiling your project twice into different folders. 
</div>

## Step 6: Run the app

No we can start our App to see if everything is working correctly. However, for the dev-server to work, we need to run the app in Developement-Mode (that's how we just configured it in `Startup.cs`). Most IDEs will set this environment-variable for you automatically. In the shell you need to do this:
On Windows...
```
> set ASPNETCORE_ENVIRONMENT=Development
```
..or in an *nix environment:
```
> export ASPNETCORE_ENVIRONMENT=Development
```

Then you can run the app in the same shell like this:
```
> dotnet build
> dotnet run
```

The cold boot might take several seconds for the Webpack build to complete. After it, you should see a message like this:
```
> info: Microsoft.AspNetCore.NodeServices[0]
>       Webpack built 3619b488fb8a701fdd0b in 11733ms
```

Got to `http://localhost:5000` and you should see the message "app works!" from the Angular CLI template. 

### Some things to try

Almost all features of Angular CLI should still work. For example you could...

* ...modify the "app works!" string in `./ClientApp/app/app.component.ts` while the app is running to see HMR in action.
* ...scaffold a component by running `ng g component my-component`.
* ...run end-to-end tests with protractor by running `npm run e2e` while the app is running.