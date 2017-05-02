{{##
    def.menuOrder = 2;
    def.menuTitle = "Blog";
#}}

{{
    var newestPage = it.$pages
        .filter(p => p.userData.date && p.userData.isBlog)
        .sort((a,b) => b.userData.date - a.userData.date)[0];
    
    if(newestPage){
        it.subst(newestPage); 
    }
}}