let routerTitle = "";
let siteTitle = "";

function setTitle(){
    if(!routerTitle && !siteTitle){
        document.title = "loading";
    }else if(routerTitle && !siteTitle){
        document.title = routerTitle;
    }else if(!routerTitle && siteTitle){
        document.title = siteTitle;
    }else{
        document.title = `${routerTitle}-${siteTitle}`;
    }
}

export default {
    setRouterTitle(title){
        routerTitle = title;
        setTitle();
    },
    setSiteTitle(title){
        siteTitle = title;
        setTitle();
    }
}
