{{##
    def.$layout = "article";
    def.disqusId = "17-05-bad-code-gems";
    def.title = "Bad Code Gems";
    def.lead = "Over the years I had to read a lot of bad code - these are the highlights";
    def.tags = ["clean code"];
    /*
    def.date = new Date(2017, 5, 4);
    def.isBlog = true; 
    */
#}}

Most software developers sooner or later have to deal with legacy code which is a pain to work with. It's just part of the job. But every once in a while you come across code that is written with a complety disregard for every good practice rule ever created or even human sanity in general. 

I've decided to collect and present some particulary bad specimen for science and your entertainment. I slightly modified each example to protect the original authors.

#### Playing it save in C-Sharp

```cs
CrazyClass instanceA = new CrazyClass();
if(instanceA != null){
    // insane code
    InsaneClass instanceB = new InsanceClass();
    if(instanceB != null){
        // and so on...
    } 
}
```
Have you ever checked for null directly after instanciating a class in C#? No? Me neither. But you now what - you really should because this totally can happen. At least in [some crazy, completly ridicolous scenario](http://stackoverflow.com/questions/5593781/check-for-null-after-object-creation). 

Apparently the author of this code gem needed to protect his/her code against these kinds of shenanigans - every freaking time. Well as the author of the Stackoverflow post puts it: "It really depends on how much you need to guard against pathologically stupid code"

#### Putting some meaning in those names

```cs
void vPrintSomething(/* 9 other arguments (seriously!)*/bool bEnglishGerman){
    // code...sort of
}
```
I found this little gem in the depths of a 20000 lines WinForm. Apparently the author really cares about readability, thats why he/she puts the type into the first letter of the name, also known as hungarian notation (please, don't do this). So now we can clearly see that we have to put in a boolean because as everybody knows: The answer for the question "English or German" is of course "Yes".   

