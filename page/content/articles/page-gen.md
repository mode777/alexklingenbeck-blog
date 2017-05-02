{{##
    def.$layout = "article";
    def.isBlog = true;
    def.disqusId = "17-04-page-gen";
    def.title = "How I stopped overengineering and got things done";
    def.lead = "A little story of how I struggled to make this simple blog";
    def.date = new Date(2017, 4, 30);
    def.tags = ["node", "meta"];
#}}

To be honest, it took me several tries to get this simple blog working. This is kind of embarassing for a web developer, but hear me out! 

About half a year ago, I got fed up with using my Raspberry PI with DynDns and got me a vServer and a top-level domain. The main motivation, 
other then hosting all sorts of crazy stuff like [Gogs](http://alexklingenbeck.de:3000) and [random experiments](http://alexklingenbeck.de/kindergarten), was to have a personal blog.

For most people this would have been straightforward: Head to tumblr or install wordpress or any other CMS. But this was far too mundane for me. Oh no - it had to be state of the art, and custom-made. 

## First fail
First thing I tried was a Kendo-UI SPA setup I mostly run at work. I made some modifications that quickly escalated into a full-blown framework. Of course this slightly shifted away my focus from the blog, but at least we could use the improvements at work.

## Second fail
A few weeks ago, I decided to give the blog another try. This time I decided to use Angular (4) and Asp.net Core. In the former I didn't have much experience, in the later nobody had much experience at the time. After I dragged myself through the swamp that is Webpack configurations and getting to run asp.net core on linux as well as the question wether to use "project.json" or "*.csproj" and why in the world this even has to be such a big deal, I got the boat floating - beautifully.

After getting bootstrap integration to work and hosting a first prototype, I proudly showed it to a fellow student. 