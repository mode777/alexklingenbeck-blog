# aspnet-angular2

This example project tries to retain most of the features of angular-cli while leveraging aspnet-core as an developement server and integrating the webpack build and features like hot-module-replacement into the aspnet-core application.

## Installing

After checkout you should run `dotnet restore` and `npm install`. Visual Studio might do this automatically.

## Running

The aspnet core app will automatically build the client app with webpack on startup, which might take up to a few minutes. 

### Visual Studio

Just choose the profile __Self-host__ or __IIS Express__ and run the application. 

### Command-line

`dotnet run`

## aspnet-core SPA features

The aspnet-core features described here are implemented using the `Microsoft.AspNetCore.SpaServices` package.

### Support for push-api URLs

Angular2 can use the push api for routing. This results in URLs that look like `www.example.com/users/1` instead of `www.example.com#/users/1` (mind the `#`). When reloading such an api the server will always serve the index.html of your angular application.

### Integration of the webpack build with hot-module-replacement

The aspnet-core app will act as a full-features webpack dev-server. After running the app the console should read `[hmr] connected`. Try changing you angular components (html, ts, scss..) and hit save. The browser sould display the changes almost instantly.

## angular-cli features

The project was first generated with angular cli and then ejected. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `wwwroot/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app by starting your aspnet-core app. If you are using IIS as a host, make sure to edit the __protractor.json__ to match your port number.

### Further help

To get more help on the Angular CLI check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
