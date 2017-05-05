{{##
    def.$layout = "article";
    def.disqusId = "17-05-cli-nodejs";
    def.title = "Building Command-Line-Interfaces with Node.js";
    def.lead = "This tutorial will guide you through the steps required to create expressive CLI applications with Node.js.";
    def.tags = ["nodejs"];
    /*
    def.isBlog = true;
    def.date = new Date(2017, 5, 2);
    */
#}}

I recently turned my static website generator [page-gen]({{= it.href("articles/17-05-page-gen.html") }}) into a command-line-interface (CLI). As it turns out it's incredly easy to create and distribute with node.

# Why node.js

Building a CLI should be an easy task in every programming language. However I always found it cumbersome to distribute them, especially under windows. With npm distribution, installation and usage just boils down to
```
>npm publish
>npm install -g your-app 
>your-app --option 
``` 



