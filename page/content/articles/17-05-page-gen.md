{{##
    def.$layout = "article";
    def.disqusId = "17-04-page-gen";
    def.title = "Getting started with page-gen";
    def.lead = "A simple static website generator";
    def.tags = ["nodejs"];
    /*
    def.isBlog = true;
    def.date = new Date(2017, 5, 30);
    */
#}}

Page-gen lets you run [DoT.js](http://olado.github.io/doT/index.html) templates in html and markup templates. I initially wrote it to generate this blog although it can be leveraged for any website that does not need dynamic content. It doesn't even remotely hat the power nor convenience of [Jekyll](http://jekyllrb.com) or [Hexo](http://hexo.io) but it's very easy to get going and yet very powerfull, as it basically just lets you write Javascript inside your pages and layouts. 