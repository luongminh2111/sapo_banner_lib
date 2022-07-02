const getBanner = "http://localhost:8080/api/banners/by-code="
// khai baos bien luu tru
const store = []; 

function run (storeItem){
    // xử lí banner ko hiện nếu chưa ẩn đủ time 1 ngày
    let timeHide = window.localStorage.getItem((storeItem.pageUrl + ''+ storeItem.divId + '' + storeItem.id + '_recent_time'));
    if(timeHide != null){
        let timeRecentConvert = Date.parse(timeHide);
        let day = new Date();
        let curTimeConvert = Date.parse(day);
        // nếu ẩn đủ 1 ngày thì hiện
        if((curTimeConvert - timeRecentConvert)/ 86400 >= 1){
            if(storeItem.popUp === 1){
                if(storeItem.modeHide === 1){
                    if(window.localStorage.getItem((storeItem.pageUrl +''+ storeItem.divId + ''+ storeItem.id)) > storeItem.numberHide){
                    }
                    else{
                        DisplayHidePopUpBanner(storeItem);
                    }
                }
                else{
                    DisplayNormalPopUpBanner(storeItem);
                }
            }
            // nếu không phải popup
            else{
                if(storeItem.modeHide ===1){
                    if(window.localStorage.getItem((storeItem.pageUrl +''+ storeItem.divId + ''+ storeItem.id)) > storeItem.numberHide){
                    }
                    else{
                        DisplayHideBanner(storeItem);
                    }
                }
                else{
                    DisplayNormalBanner(storeItem);
                }
            }   
        }
        else{
        }                   
    }
    if(timeHide == null){
        if(storeItem.popUp === 1){
            // if(storeItem.modeHide === 1){
            //     if(window.localStorage.getItem((storeItem.pageUrl +''+ storeItem.divId + ''+ storeItem.id)) > storeItem.numberHide){
            //     }
            //     else{
            //         DisplayHidePopUpBanner(storeItem);
            //     }
            // }
            // else{
                DisplayNormalPopUpBanner(storeItem);
            // }
        }
        // nếu không phải popup
        else{
            if(storeItem.modeHide ===1){
                if(window.localStorage.getItem((storeItem.pageUrl +''+ storeItem.divId + ''+ storeItem.id)) > storeItem.numberHide){
                }
                else{
                    DisplayHideBanner(storeItem);
                }
            }
            else{
                DisplayNormalBanner(storeItem);
            }
        }   
    }
}
console.log("store item : ", store)
function start(init) {
    fetch(getBanner + init.code +'/key='+ init.key)
        .then(response => response.json())
        .then(data => {
            data.map((dataItem) => {
                store.push(dataItem)
            })
        }
    );
    window.onload = function() {
        var oldHref = document.location.href;
        let indexDomainFirst = oldHref.indexOf(init.code);
        let pathFirst ='';
        for( let i = indexDomainFirst ; i < oldHref.length ; i ++){
            if(oldHref.charAt(i) ==='\/'){
                pathFirst = oldHref.slice((i +1), oldHref.length);
                break;
            }
            // truong hop nay la trang chu
            else{
                pathFirst='';
            }
        }
        if(pathFirst.length > 0){
            store.map((storeItem) =>{
                if(storeItem.pageUrl === pathFirst){
                    run(storeItem);
                }
            })
            var bodyList = document.querySelector("body")
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        let indexDomain = oldHref.indexOf(init.code);
                        let path = '';
                        for( let i = indexDomain ; i < oldHref.length ; i ++){
                            if(oldHref.charAt(i) ==='\/'){
                                path = oldHref.slice((i +1), oldHref.length);
                                break;
                            }
                            // truong hop nay la trang chu
                            else{
                                path='';
                            }
                        }
                        store.map((storeItem) => {  
                            if(storeItem.pageUrl === path){
                                run(storeItem)
                            }
                        })
                    }
                });
            });
        var config = {
            childList: true,
            subtree: true
        };
        observer.observe(bodyList, config);
        }
    };
}
function createBaseNormalElement (data, a){
    const sectionItem = document.getElementById(data.divId);
    console.log("data : ", data)
    sectionItem.width=data.width;
    sectionItem.height =data.height;
    let img = new Image();
    let urlWeb = data.url;
    a.href=urlWeb;
    img.src = data.imgUrl;
    img.width=data.width;
    img.height = data.height;
    sectionItem.appendChild(a);
    a.appendChild(img);
}
function createBaseElementPopup (data, a, closeItem, divChild, divPresentation){
   
    document.body.appendChild(divPresentation);
    divPresentation.id="divPresentation_"+data.id;
    divPresentation.appendChild(divChild);
    let img = new Image();
    closeItem.innerHTML = "X";
    closeItem.id="x";
    let urlWeb = data.url;
    a.href=urlWeb;
    img.src = data.imgUrl;
    img.width=data.width;
    img.height = data.height;
    divChild.appendChild(a);
    a.appendChild(img);
    divChild.appendChild(closeItem);
}
// ham tao khung co ban cho banner không popup được phép đóng
function createBaseHideElement (data, a, closeItem){
    const sectionItem = document.getElementById(data.divId);
    sectionItem.width=data.width;
    sectionItem.height =data.height;
    let img = new Image();
    closeItem.innerHTML = "X";
    closeItem.id="x";
    let urlWeb = data.url;
    a.href=urlWeb;
    img.src = data.imgUrl;
    img.width=data.width;
    img.height = data.height;
    sectionItem.appendChild(a);
    a.appendChild(img);
    sectionItem.appendChild(closeItem);
}
// đây là hảm hiển thị banner không phải là popup và không có dấu x 
function DisplayNormalBanner(data){
    let a = document.createElement('a');
    createBaseNormalElement(data, a);
    a.onclick = function () {
        if(data.type === "Liên kết tới một link mới")
        {
            a.target="_blank";
        }
        else if( data.type === "Liên kết tới một iframe"){
       
            a.target="_blank";
        }
    }
}
// đây là hàm hiển thị banner không phải là popup và có dấu x 
function DisplayHideBanner(data){
    let a = document.createElement('a');
    const closeItem = document.createElement("button");
    createBaseHideElement(data, a, closeItem);
    closeItem.onclick = function(){
        hideBanner(data);
    }
        if(data.type === "Liên kết tới một link mới")
        {
            a.target="_blank";
        }
        else if( data.type === "Liên kết tới một iframe"){
        
            a.target="_blank";
        }
    
    styleForNonPopUpItem(data, closeItem);
}
// hàm hiển thị banner popup và được phép ẩn
// function DisplayHidePopUpBanner(data){
//     let a = document.createElement('a');
//     const closeItem = document.createElement("button");
//     let divChild = document.createElement('div');
//     const divPresentation = document.createElement('div');
//     createBaseElementPopup(data, a, closeItem, divChild, divPresentation);
//     closeItem.onclick = function(){
//         hideBanner(data, divPresentation);
//     }

//         if(data.type === "Liên kết tới một link mới")
//         {
//             a.target="_blank";
//         }
//         else if( data.type === "Liên kết tới một iframe"){
        
//             a.target="_blank";
//         }

//     styleForPopupItem(data, closeItem, divChild);
// }
// hàm hiển thị banner popup và không ẩn
function DisplayNormalPopUpBanner(data){
    let a = document.createElement('a');
    const closeItem = document.createElement("button");
    let divChild = document.createElement('div');
    const divPresentation = document.createElement('div');
    createBaseElementPopup(data, a, closeItem, divChild, divPresentation);
    closeItem.onclick = function(){
        divPresentation.style.display ="none";
    }
    a.onclick = function () {
        if(data.type === "Liên kết tới một link mới")
        {
            window.open(urlWeb, '_blank');
        }
        else if( data.type === "Liên kết tới một iframe"){
            window.confirm("do nothing")
        }
    }
    console.log(" data : ", data)
    styleForPopupItem(divPresentation, closeItem, divChild, data.position, data.positionValue);
}
// ham css cho cac banner khong phai la popup 
function styleForNonPopUpItem (data, closeItem){
    document.getElementById(data.divId).style.cssText = 
    'display: block; position: relative;';
    closeItem.style.cssText=
    "position: absolute; color: green; top: 0px; right: 0px; width: 20px; height: 20px;"+
    "font-size: 10px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
}
function styleForPopupItem (divId, closeItem, divChild, position, positionValue){
    // console.log(" position: ", position)
    // console.log(" position value: ", positionValue)
    if(position === '0'){
        divId.style.cssText =
        "position: fixed; z-index: 100; width: 100vw; height: 100vh; top: 0; left: 0; bottom: 0; right: 0; background-color: rgb(127,127,127,0.7);";
        
        divChild.style.cssText ="position: absolute; z-index: 100; top: 80px; left: 600px;";
        
        closeItem.style.cssText = 
        "position: absolute; color: green; top: 0px; right: 0px; z-index: 100; width: 20px; height: 20px;"+
         "font-size: 10px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
    }
    else{
        let splitIndex1 = position.indexOf('-');
        let splitIndex2 = positionValue.indexOf(',');
        let pst1 = position.slice(0, splitIndex1);
       
        let pst2= position.slice(splitIndex1+1, position.length);
        let pstVl1 = positionValue.slice(0, splitIndex2);
        let pstVl2= positionValue.slice(splitIndex2+1, position.length);
        // console.log("position:",position)
        divId.style.cssText =
        "position: fixed; z-index: 100; width: 100vw; height: 100vh; top: 0; left: 0; bottom: 0; right: 0; background-color: rgb(127,127,127,0.7);";
        
        divChild.style.cssText ="position: absolute; z-index: 100; "+pst1+": "+(80+Number(pstVl1))+"px; "+pst2+": "+(600+Number(pstVl2))+"px;";
        // console.log("pts1 :", pst1)
        // console.log("pts2 :", pst2)
        // console.log(":", divChild.style.cssText)
        closeItem.style.cssText = 
        "position: absolute; color: green; top: 0px; right: 0px; z-index: 100; width: 20px; height: 20px;"+
         "font-size: 10px; padding: 0; border: none; font-weight: bold; background-color: white; border-radius: 50%";
    }
   
}
// hàm đóng ẩn banner
function hideBanner (data, divPresentation) {
    let today = new Date();
    if(data.divId != "null"){
        document.getElementById(data.divId).style.display ="none";
        if(window.localStorage.getItem((data.pageUrl +''+ data.divId + ''+ data.id)) == null){
            window.localStorage.setItem((data.pageUrl + ''+ data.divId + '' + data.id), 1);
            window.localStorage.setItem((data.pageUrl + ''+ data.divId + '' + data.id + '_recent_time'), today)
        }
        else{
            let number_closed = window.localStorage.getItem((data.pageUrl +''+ data.divId + ''+ data.id));
            window.localStorage.setItem((data.pageUrl +''+ data.divId + ''+ data.id), Number(number_closed)+1);
            window.localStorage.setItem((data.pageUrl + ''+ data.divId + '' + data.id + '_recent_time'), today)
        }
    }
    else if(divPresentation != "undefined"){
        divPresentation.style.display ="none";
        if(window.localStorage.getItem((data.pageUrl +''+ data.id)) == null){
            window.localStorage.setItem((data.pageUrl + '' + data.id), 1);
            window.localStorage.setItem((data.pageUrl + ''+ data.id + '_recent_time'), today)
        }
        else{
            let number_closed = window.localStorage.getItem((data.pageUrl +''+ data.divId + ''+ data.id));
            window.localStorage.setItem((data.pageUrl + ''+ data.id), Number(number_closed)+1);
            window.localStorage.setItem((data.pageUrl  + '' + data.id + '_recent_time'), today)
        }
    }
    
}
