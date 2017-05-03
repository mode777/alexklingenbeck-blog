{{##
    def.$layout = "article";
    def.isBlog = true;
    def.disqusId = "17-05-angular-asp-net-core";
    def.title = "Using Angular CLI with ASP.NET Core";
    def.lead = "It is possible to integrate the convenience of Angular CLI into a ASP.NET Core application - find out how!";
    def.date = new Date(2017, 5, 3);
    def.tags = ["angular", "asp.net core"];
#}}

## Angular CLI

Setting up an Angular app is not a simple task. Appart from creating the relatively complex project structure and configure the typescript compiler and install type definitions, you have to choose a module and/or build system and rig it all together. 

Angular CLI does a great job in getting you started. Some of it's features include:

* A webpack-based incremental buildsystem, which will transform your Typescript modules into Javascript and bundle them into a few files which can be minified.
* A built in dev-server which supports hot module replacement. This way you can instantly see your changes without having to reload your browser.
* Support unit tests and for end to end testing (Running tests in a headless browser).
* Scaffolding modules, components and services via the CLI.

## What's the problem?

As you can see Angular CLI does abstract a lot of the complexity away. This also leads to a problem:
As most of the convenience functions are coupled to the dev-server. Apart from hot module replacement this includes rerouting arbitrary routes back to your index.html so you can use push-API-style URLs. Even worse, Angular CLI is hiding the webpack configuration for some reason I have yet to discover. 

At this point you have two options:
1. Keep your client app seperate from your API and enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). (This still won't solve your routing problem in production) 
2. Read on...

## Enter: AspNetCore.SpaServices

Fortunately we can make our ASP.NET Core application solve most of these problems with a nuget package called `Microsoft.AspNetCore.SpaServices`. This package can...
 * ...run our webpack-build for us
 * ...handle hot module replacement
 * ...help us with server-side routing

SpaService can also do server-side prerendering which is extremely useful e.g. for SEO, but I will save this for a future post.