
{{##
    def.$layout = "article";
    def.disqusId = "23-01-async";
    def.title = "Angular async pipe pitfalls";
    def.lead = "The async pipe is one of my favourite features in Angular, but I recently came across some pitfalls with change detection, which I wanted to share...";
    def.tags = ["angular"];
    def.isBlog = true;
    def.date = new Date(2023, 1, 8);
#}}

https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/

Before we start let's do a quick refresh about how the async pipe and angular change detection works..

# Angular change detection

> **NOTE:** Using the async pipe in combination with Observables can help you get rid of the default (="automatic") change detection completely and switch to `OnPush`. This will not only make it more transparent when your change detection runs but [also will make your app faster](https://angular.io/guide/change-detection).

Let's start with the offending code...



# The code

First of all let me just 

