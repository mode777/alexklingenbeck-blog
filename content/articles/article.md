{{##
    def.$layout = "article";
    def.isBlog = true;
    def.disqusId = "TEST_01";
    def.title = "Article 01";
    def.lead = "This is a test article";
    def.date = new Date(2017, 4, 28);
    def.tags = [".NET", "C#"];
#}}

# Customizing AspNetCore Identity

Like the traditional Asp.Net, AspNetCore has an Identity module. This provides a big palette of funtions from authentication, authorization and user management. However the standard-implemenentation comes with a very specific technology set in mind, which might not fir the needs of your application. It certainly didn't fit mine, so I decided to implement certain parts myself while still tapping into the Identity interfaces to still benefits from it's rich and often security-critical functionality.

## Installing the dependencies

To use the vanilla AspNetCore Identity functionality you should install this NuGet package.

* Microsoft.AspNetCore.Identity

This will also install __Microsoft.AspNetCore.Authentication.Cookies__. If you want to test the vanilla functionallity make sure you also install __Microsoft.AspNetCore.Identity.EntityFrameworkCore__ 

## Out of the box functionality

Out of the box you will get the following functionality, documented in the offical [AspNetCore documentation](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity)

* Cookie authentification with a focus on server-side renderung (redirects!)
* Using entity Framework to store an ApplicationUser and ApplicationRole table with a focus on SqlServer (haven't tested it with other providers)

So if you are creating a new MVC application with Razor-templates from scratch, favourably with Ms SqlServer, you probably want to stick to the documentation above. 

## What we will change

I'm writing a single page application and want to authenticate via ajax. So redirects don't really make sense in this scenario. When the user hits an endpoint unauthorized, I just want to return a 401 so that the client application can react accordingly.

Also I already have a user table and for this small application I just want to store an int for the user role instead of having a foreign key to another table. Therefore we will implement a custom user store and we will also take control of principal generation to decide ourselves which information to store inside the cookie. We will still use EntityFrameworkCore but this solution could be easily adapted for any storage solution you can think of.

Doing that we wil also gain some insights into how this monolitic block called 'Identity' is actually quite modular.

## How identity is bootstrapped

As with other AspNetCore modules Identity follows the [dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle). It's top level classes __IdentityManager__ and __SignInManager__ rely on other classes (which mostly are abstracted as interfaces) in their constructors. These other classes are registered as services in the __ConfigureServices__ method.

So when you use the convenience extension...

```cs
services.AddIdentity<ApplicationUser, IdentityRole>() 
```

...under the hood identity registers all dependencies for you. This is a excerpt from this method's implemenentation [source](https://github.com/aspnet/Identity/blob/dev/src/Microsoft.AspNetCore.Identity/IdentityServiceCollectionExtensions.cs):


```cs
using System;

#pragma warning disable 414, 3021

/// <summary>Main task</summary>
async Task<int, int> AccessTheWebAsync()
{
    Console.WriteLine("Hello, World!");
    string urlContents = await getStringTask;
    return urlContents.Length;
}
``` 


As you can see there are different classes, each responsible for another aspect of the identity functions. Most of them are provided as interfaces. This means we can implement them ourselves - yay!
We don't want to reimplement all of them tough