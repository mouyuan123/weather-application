"use strict";(self.webpackChunkweather=self.webpackChunkweather||[]).push([[207],{6207:(W,p,s)=>{s.r(p),s.d(p,{WeatherDetailsModule:()=>z});var d=s(6895),g=s(4262),C=s(7579),f=s(2722),t=s(4650),b=s(3122),w=s(6497),x=s(1656),M=s(6251),k=s(8028);function O(a,o){1&a&&(t.TgZ(0,"div",2),t._UZ(1,"div",3),t.qZA())}const c=function(a){return{"font-contrast-color":a}};function v(a,o){if(1&a&&(t.TgZ(0,"div",46)(1,"span",47),t._uU(2),t.qZA(),t._UZ(3,"img",48),t.TgZ(4,"span",49),t._uU(5),t.qZA(),t.TgZ(6,"span",50),t._uU(7),t.qZA()()),2&a){const n=o.$implicit,r=t.oxw(2);t.Q6J("ngSwitch",!0),t.xp6(1),t.Q6J("ngClass",t.VKq(8,c,r.isDarkMode)),t.xp6(1),t.Oqu(n.key),t.xp6(1),t.s9C("src",n.value.stateImg,t.LSH),t.xp6(1),t.Q6J("ngClass",t.VKq(10,c,r.isDarkMode)),t.xp6(1),t.hij("",n.value.avgTemp,"\xb0"),t.xp6(1),t.Q6J("ngClass",t.VKq(12,c,r.isDarkMode)),t.xp6(1),t.Oqu(n.value.predictedState)}}const P=function(a){return{dark__d:a}},_=function(a){return{"details-page__wrapper-dark":a}},S=function(a){return{"dark_hum-wind__separator":a}};function y(a,o){if(1&a){const n=t.EpF();t.ynx(0),t.O4$(),t.TgZ(1,"svg",4)(2,"defs")(3,"style"),t._uU(4," .a { fill: #2b244d; } .b { fill: rgba(0, 0, 0, 0); } .b, .c { stroke: #fff; stroke-width: 2px; } .c { fill: none; } .d { fill: black; font-size: 15px; font-family: SegoeUI, Segoe UI, sans-serif; letter-spacing: 0.4em; } .dark__d{ fill: white; } "),t.qZA()(),t.TgZ(5,"g",5),t._UZ(6,"circle",6)(7,"line",7)(8,"line",8)(9,"line",9),t.TgZ(10,"text",10)(11,"tspan",11),t._uU(12,"BACK"),t.qZA()()()(),t.kcU(),t.TgZ(13,"div",12)(14,"div",13)(15,"div",14)(16,"div",15)(17,"div",16)(18,"div",17)(19,"span",18),t._uU(20),t.qZA(),t.TgZ(21,"span",19),t._uU(22),t.qZA()(),t.TgZ(23,"div",20)(24,"div",21)(25,"span",22),t._uU(26,"humidity"),t.qZA(),t.TgZ(27,"span",23),t._uU(28),t.qZA()(),t.TgZ(29,"div",24),t._uU(30,"\xa0"),t.qZA(),t.TgZ(31,"div",25)(32,"span",26),t._uU(33,"wind"),t.qZA(),t.TgZ(34,"span",27),t._uU(35),t.qZA()()()(),t.TgZ(36,"div",28)(37,"div",29),t._uU(38),t.qZA()()()(),t.TgZ(39,"div",30)(40,"div",31)(41,"div",32),t._UZ(42,"img",33),t.qZA(),t.TgZ(43,"section",34),t.YNc(44,v,8,14,"div",35),t.ALo(45,"keyvalue"),t.qZA()()(),t.TgZ(46,"button",36),t._uU(47,"Delete"),t.qZA()()(),t.TgZ(48,"div",37)(49,"div",38)(50,"div",39)(51,"div",40)(52,"h5",41),t._uU(53,"Are you sure you want to delete?"),t.qZA(),t._UZ(54,"button",42),t.qZA(),t.TgZ(55,"div",43)(56,"button",44),t.NdJ("click",function(){t.CHM(n);const l=t.oxw();return t.KtG(l.deleteWeather())}),t._uU(57,"Yes"),t.qZA(),t.TgZ(58,"button",45),t._uU(59,"No"),t.qZA()()()()(),t.BQk()}if(2&a){const n=t.oxw();t.xp6(10),t.Q6J("ngClass",t.VKq(21,P,n.isDarkMode)),t.xp6(3),t.Q6J("ngClass",t.VKq(23,_,n.isDarkMode)),t.xp6(6),t.Q6J("ngClass",t.VKq(25,c,n.isDarkMode)),t.xp6(1),t.hij("",n.currentTemp,"\xb0"),t.xp6(1),t.Q6J("ngClass",t.VKq(27,c,n.isDarkMode)),t.xp6(1),t.Oqu(n.currentWeatherState),t.xp6(3),t.Q6J("ngClass",t.VKq(29,c,n.isDarkMode)),t.xp6(2),t.Q6J("ngClass",t.VKq(31,c,n.isDarkMode)),t.xp6(1),t.hij("",n.currentHum," %"),t.xp6(1),t.Q6J("ngClass",t.VKq(33,S,n.isDarkMode)),t.xp6(3),t.Q6J("ngClass",t.VKq(35,c,n.isDarkMode)),t.xp6(2),t.Q6J("ngClass",t.VKq(37,c,n.isDarkMode)),t.xp6(1),t.hij("",n.currentWind," K/M"),t.xp6(2),t.Q6J("ngClass",t.VKq(39,c,n.isDarkMode)),t.xp6(1),t.Oqu(n.clickedCapital),t.xp6(4),t.Q6J("src",n.capitalUrl,t.LSH),t.xp6(2),t.Q6J("ngForOf",t.xi3(45,18,n.forecast,n.returnZero)),t.xp6(6),t.Q6J("ngClass",t.VKq(41,_,n.isDarkMode))}}const D=[{path:"",component:(()=>{class a{constructor(n,r,l,m,h,u,e){this.pms=n,this.ws=r,this.router=l,this.ar=m,this.firebase=h,this.imageService=u,this.message=e,this.forecast={},this.isLoading=!0,this.unsubscribe$=new C.x}onResize(n){this.isMobile=window.innerWidth<768}ngOnInit(){this.isMobile=window.innerWidth<768,this.getPageMode(),this.getClickedCapitalDetails()}getPageMode(){this.pms.getPageMode().pipe((0,f.R)(this.unsubscribe$)).subscribe(n=>this.isDarkMode=n)}getCapitalUrl(){this.isLoading=!0,this.imageService.retrieveImage(this.clickedCapital).then(n=>{this.capitalUrl=n,this.isLoading=!1}).catch(n=>{switch(n.code){case"storage/object-not-found":this.message.showFailure("Image file doesn't exist / not supported currently");break;case"storage/unauthorized":this.message.showFailure("User doesn't have permission to access the object");break;default:this.message.showFailure("Unknown error occurred, inspect the server response")}})}getClickedCapitalDetails(){this.isLoading=!0,this.clickedCapital=this.ar.snapshot.queryParams.country,this.clickedCapital&&(this.getCapitalUrl(),this.ws.searchWeatherByCityName(this.clickedCapital).subscribe(n=>{switch(this.currentWeatherState=n.weather[0].main,this.currentWeatherState){case"Clouds":this.stateImg="../../assets/images/cloudy-weather.png";break;case"Rain":this.stateImg="../../assets/images/heavy-rain-weather.png";break;case"Storm":this.stateImg="../../assets/images/storm-weather.png";break;case"Sunny":this.stateImg="../../assets/images/sunny-weather.png";break;default:this.stateImg="../../assets/images/snowing-weather.png"}this.currentTemp=Math.round(n.main.temp),this.currentHum=n.main.humidity,this.currentWind=Math.round(n.wind.speed)}),this.ws.getWeatherForecast(this.clickedCapital).pipe((0,f.R)(this.unsubscribe$)).subscribe(n=>{let r=n.list[0].main.temp,l=n.list[0].main.temp;n.list.forEach(e=>{r<e.main.temp&&(r=e.main.temp),l>e.main.temp&&(l=e.main.temp)}),this.maxTemp=Math.round(r),this.minTemp=Math.round(l);let m=n.list;const h=(new Date).getDay();this.today=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][h],m.forEach(e=>{const i=new Date(e.dt_txt).toDateString().split(" ")[0];i!==this.today&&(this.forecast[i]?(this.addWeatherStateCounter(e.weather[0].main,i),this.forecast[i].counter++,this.forecast[i].avgTemp+=e.main.temp):(this.forecast[i]={CloudsCounter:0,RainCounter:0,DrizzleCounter:0,MistCounter:0,StormCounter:0,ThunderstormCounter:0,SunnyCounter:0,ClearCounter:0,HazeCounter:0,FogCounter:0,SmokeCounter:0,SnowCounter:0,avgTemp:e.main.temp,counter:1,predictedState:"",stateImg:""},this.addWeatherStateCounter(e.weather[0].main,i)))}),Object.keys(this.forecast).forEach(e=>{this.forecast[e].avgTemp=Math.round(this.forecast[e].avgTemp/this.forecast[e].counter);let i=Math.max(this.forecast[e].CloudsCounter,this.forecast[e].RainCounter,this.forecast[e].DrizzleCounter,this.forecast[e].MistCounter,this.forecast[e].StormCounter,this.forecast[e].ThunderstormCounter,this.forecast[e].SunnyCounter,this.forecast[e].ClearCounter,this.forecast[e].HazeCounter,this.forecast[e].FogCounter,this.forecast[e].SmokeCounter,this.forecast[e].SnowCounter);switch(!0){case i===this.forecast[e].CloudsCounter:this.forecast[e].predictedState="Clouds",this.forecast[e].stateImg="../../../assets/images/cloudy-weather.png";break;case i===this.forecast[e].RainCounter:this.forecast[e].predictedState="Rain",this.forecast[e].stateImg="../../../assets/images/heavy-rain-weather.png";break;case i===this.forecast[e].DrizzleCounter:this.forecast[e].predictedState="Drizzle",this.forecast[e].stateImg="../../../assets/images/heavy-rain-weather.png";break;case i===this.forecast[e].MistCounter:this.forecast[e].predictedState="Mist",this.forecast[e].stateImg="../../../assets/images/heavy-rain-weather.png";break;case i===this.forecast[e].StormCounter:this.forecast[e].predictedState="Storm",this.forecast[e].stateImg="../../../assets/images/storm-weather.png";break;case i===this.forecast[e].ThunderstormCounter:this.forecast[e].predictedState="Thunderstorm",this.forecast[e].stateImg="../../../assets/images/storm-weather.png";break;case i===this.forecast[e].SunnyCounter:this.forecast[e].predictedState="Sunny",this.forecast[e].stateImg="../../../assets/images/sunny-weather.png";break;case i===this.forecast[e].ClearCounter:this.forecast[e].predictedState="Clear",this.forecast[e].stateImg="../../../assets/images/sunny-weather.png";break;case i===this.forecast[e].HazeCounter:this.forecast[e].predictedState="Haze",this.forecast[e].stateImg="../../../assets/images/haze.png";break;case i===this.forecast[e].FogCounter:this.forecast[e].predictedState="Fog",this.forecast[e].stateImg="../../../assets/images/haze.png";break;case i===this.forecast[e].SmokeCounter:this.forecast[e].predictedState="Smoke",this.forecast[e].stateImg="../../../assets/images/haze.png";break;default:this.forecast[e].predictedState="Snow",this.forecast[e].stateImg="../../../assets/images/snowing-weather.png"}}),this.isLoading=!1}))}addWeatherStateCounter(n,r){switch(n){case"Clouds":this.forecast[r].CloudsCounter++;break;case"Rain":this.forecast[r].RainCounter++;break;case"Drizzle":this.forecast[r].DrizzleCounter++;break;case"Mist":this.forecast[r].MistCounter++;break;case"Storm":this.forecast[r].StormCounter++;break;case"Thunderstorm":this.forecast[r].ThunderstormCounter++;break;case"Sunny":this.forecast[r].SunnyCounter++;break;case"Clear":this.forecast[r].ClearCounter++;break;case"Haze":this.forecast[r].HazeCounter++;break;case"Fog":this.forecast[r].FogCounter++;break;case"Smoke":this.forecast[r].SmokeCounter++;break;default:this.forecast[r].SnowCounter++}}returnZero(){return 0}deleteWeather(){this.isLoading=!0,this.firebase.removeUserCapitalWeather(this.clickedCapital).then(n=>{n&&this.router.navigate(["/home"]),this.isLoading=!1})}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(b.m),t.Y36(w.F),t.Y36(g.F0),t.Y36(g.gz),t.Y36(x.O),t.Y36(M.K),t.Y36(k.B))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-weather-details"]],hostBindings:function(n,r){1&n&&t.NdJ("resize",function(m){return r.onResize(m)},!1,t.Jf7)},decls:2,vars:2,consts:[["class","loader-container",4,"ngIf"],[4,"ngIf"],[1,"loader-container"],[1,"loader"],["routerLink","/home","viewBox","4085 152 98.5 126","tabindex","0",1,"back__button"],["transform","translate(3980)"],["cx","39","cy","39","r","39","transform","translate(105 152)",1,"a"],["transform","translate(123.5 190.5)","x1","80",1,"b"],["transform","translate(123.5 164.5)","x2","26","y1","26",1,"b"],["transform","translate(123.5 190.5)","x1","26","y1","27",1,"c"],["transform","translate(117 274)",1,"d",3,"ngClass"],["x","0","y","0"],[1,"container","details-page__wrapper","shadow-lg","rounded-3","position-relative",3,"ngClass"],[1,"row","my-5"],[1,"col-12"],[1,"header-content__wrapper"],[1,"today-weather__container"],[1,"temp-state__container"],[1,"temperature__text",3,"ngClass"],[1,"weather-state__text",3,"ngClass"],[1,"hum-wind__container"],[1,"hum__container"],[1,"hum__text",3,"ngClass"],[1,"hum-value__text",3,"ngClass"],[1,"hum-wind__separator",3,"ngClass"],[1,"wind__container"],[1,"wind__text",3,"ngClass"],[1,"wind-value__text",3,"ngClass"],[1,"city-name__container"],[1,"city-name__text",3,"ngClass"],[1,"col-12","my-5","m-xxl-5","mobile-margin"],[1,"row"],[1,"col-12","col-xxl-5","d-flex","justify-content-center"],["alt","capital image",1,"capital-img",3,"src"],[1,"col-12","mt-3","col-xxl-6","ms-xxl-3","mt-xxl-0","forecast__container"],["class","day-weather__container",3,"ngSwitch",4,"ngFor","ngForOf"],["type","button","data-bs-toggle","modal","data-bs-placement","right","data-bs-target","#deleteWeather","title","Delete added weather",1,"btn","btn-link","position-absolute","p-0","m-0","fs-5","delete-btn"],["id","deleteWeather","tabindex","-1","aria-labelledby","deleteWeatherLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered"],[1,"modal-content",3,"ngClass"],[1,"modal-header"],["id","deleteWeatherLabel",1,"modal-title","fs-4"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-danger",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],[1,"day-weather__container",3,"ngSwitch"],[1,"day-name__text",3,"ngClass"],[1,"forecast-condition__icon",3,"src"],[1,"day-temp__text",3,"ngClass"],[1,"day-state__text",3,"ngClass"]],template:function(n,r){1&n&&(t.YNc(0,O,2,0,"div",0),t.YNc(1,y,60,43,"ng-container",1)),2&n&&(t.Q6J("ngIf",r.isLoading),t.xp6(1),t.Q6J("ngIf",r.clickedCapital))},dependencies:[d.mk,d.sg,d.O5,d.RF,g.rH,d.Nd],styles:[".details-page__wrapper[_ngcontent-%COMP%]{background:linear-gradient(to top,#a7e2fc 0%,#fbfbfc 100%);width:70vw;position:relative;z-index:2}.details-page__wrapper-dark[_ngcontent-%COMP%]{background:linear-gradient(#121349,#000c79)}.background-gradient__circle[_ngcontent-%COMP%]{position:absolute;top:50%;right:0;z-index:1;height:100rem;width:100rem;border-radius:50%;background:linear-gradient(-225deg,#ffffff 0%,#FFE29F 10%,#FFA99F 48%,#ffd1ff 100%);animation:scaleup-circle .9s ease-in-out forwards;transition:background 1s ease-in-out}.background-gradient__circle-dark[_ngcontent-%COMP%]{transition:background 1s ease-in-out;background:linear-gradient(to bottom,#FF8B8B,#6676FF)}.main-weather__card[_ngcontent-%COMP%]{background-color:#fff;height:80%;width:65%;border-radius:1rem;position:relative;z-index:2;justify-items:center;opacity:0;animation:scaleup 1s ease-out .3s,fadein 1.25s ease-out .3s forwards}.card-header__container-dark[_ngcontent-%COMP%]{width:100%;position:relative;overflow:hidden}.back__button[_ngcontent-%COMP%]{position:absolute;top:3rem;left:3.25rem;width:5rem;cursor:pointer;z-index:6;margin-top:5rem}.city__illustration[_ngcontent-%COMP%]{width:100%;height:510px;border-radius:1rem 1rem 0 0;position:relative;object-fit:cover;display:block}.header-content__wrapper[_ngcontent-%COMP%]{color:#000;display:grid;grid-template-rows:1fr;grid-template-columns:2fr 1.5fr;width:100%}.temperature__text[_ngcontent-%COMP%]{font-size:6rem;letter-spacing:.75rem}.city-name__container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.city-name__underline[_ngcontent-%COMP%]{background:transparent;border-radius:5px;height:5px;box-shadow:0 3rem #000}.dark_city-name__underline[_ngcontent-%COMP%]{box-shadow:0 3rem #fff}.city-name__text[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:.3rem;font-size:1.75rem}.today-weather__container[_ngcontent-%COMP%]{align-self:center;justify-self:center;display:grid;width:100%;grid-template-rows:3fr 1fr;grid-template-columns:1fr;justify-items:center;grid-gap:2rem}.temp-state__container[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-flow:column}.weather-state__text[_ngcontent-%COMP%]{letter-spacing:.5rem;font-size:1.15rem;text-transform:uppercase;margin-top:.25rem}.hum-wind__container[_ngcontent-%COMP%]{display:flex;align-items:center;margin-left:-4rem}.hum-wind__separator[_ngcontent-%COMP%]{margin:0 2rem;width:2px;height:2.5rem;background-color:#000}.dark_hum-wind__separator[_ngcontent-%COMP%]{background-color:#fff}.hum__text[_ngcontent-%COMP%], .wind__text[_ngcontent-%COMP%]{text-transform:uppercase;letter-spacing:.2rem;font-size:.8rem;margin-bottom:1rem}.hum__container[_ngcontent-%COMP%], .wind__container[_ngcontent-%COMP%]{display:flex;flex-flow:column;justify-content:center;align-items:center}.body-content__wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1.5fr;grid-template-rows:1fr;justify-items:center;justify-content:center;align-content:start;align-items:start;box-sizing:border-box;grid-column-gap:1rem;width:100%;padding:2rem}.forecast__container[_ngcontent-%COMP%]{display:flex;flex-flow:row;margin-left:1rem;flex-wrap:wrap}.forecast-divider[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 2fr}.capital-img[_ngcontent-%COMP%]{width:100%;height:300px;border-radius:1rem;position:relative;object-fit:cover;display:block;box-shadow:4px 4px 10px #000}.twitter-feed__container[_ngcontent-%COMP%]{margin-top:1rem;width:100%}.twitter-feed__body[_ngcontent-%COMP%]{display:flex;width:100%;height:100%;flex-flow:column}.twitter__loader[_ngcontent-%COMP%]{border:3px solid hsla(185,100%,62%,.2);border-top-color:#3cefff;border-radius:50%;width:3em;height:3em;animation:spin 1s linear infinite;justify-self:center;align-self:center;margin-top:3rem}@keyframes spin{to{transform:rotate(360deg)}}.twitter-no-tweets__text[_ngcontent-%COMP%]{margin-top:3rem;text-align:center}.twitter-feed__text[_ngcontent-%COMP%]{color:#0c1066;font-size:1.25rem}.twitter__icon[_ngcontent-%COMP%]{width:1.5rem}.twitter-feed-tag__text[_ngcontent-%COMP%]{font-size:.85rem;color:#5f84fb;letter-spacing:.1rem;text-transform:uppercase}.twitter-feed__header[_ngcontent-%COMP%]{display:grid;grid-template-rows:2rem;grid-template-columns:.5fr 1.5fr 1fr;align-items:center;justify-items:center;width:100%}.twitter-tweet__container[_ngcontent-%COMP%]{margin-top:2rem}.tweet-user__wrapper[_ngcontent-%COMP%]{display:flex;margin-bottom:.5rem}.tweet-avatar__image[_ngcontent-%COMP%]{margin-right:.5rem;border-radius:50%;height:3rem;width:3rem}.tweet-username__text[_ngcontent-%COMP%]{display:block;font-weight:700}.tweet__text[_ngcontent-%COMP%]{margin-top:0}.day-weather__container[_ngcontent-%COMP%]{display:flex;flex-flow:column;margin:0rem 1.5rem;align-items:center}.day-name__text[_ngcontent-%COMP%]{font-size:1.5rem;color:#39437a;font-weight:700;text-transform:uppercase;margin-bottom:.5rem}.forecast-condition__icon[_ngcontent-%COMP%]{height:4rem}.day-temp__text[_ngcontent-%COMP%]{font-size:1.85rem;color:#0c1066;letter-spacing:.25rem;margin:.75rem 0;text-align:center;padding-left:.35rem}.day-state__text[_ngcontent-%COMP%]{font-size:.65rem;text-transform:uppercase;letter-spacing:.2rem;color:#2b244d}.delete-btn[_ngcontent-%COMP%]{width:0px;color:red;top:93%;left:90%;--bs-btn-focus-shadow-rgb: none}@media screen and (max-width: 1919px){.main-weather__card[_ngcontent-%COMP%]{height:80%;width:75%}}@media screen and (max-width: 1279px){.back__button[_ngcontent-%COMP%]{top:1rem}.main-weather__card[_ngcontent-%COMP%]{width:80%}.body-content__wrapper[_ngcontent-%COMP%]{grid-template-columns:1fr}}@media screen and (max-width: 651px){.forecast__container[_ngcontent-%COMP%]{justify-content:center}.delete-btn[_ngcontent-%COMP%]{top:98%;left:65%}}@media screen and (max-width: 959px){.header-content__wrapper[_ngcontent-%COMP%]{grid-template-columns:1fr;grid-template-rows:2fr 1fr}.back__button[_ngcontent-%COMP%]{position:relative;margin-bottom:1rem;left:50%}.details-page__wrapper[_ngcontent-%COMP%]{flex-flow:column}.mobile-margin[_ngcontent-%COMP%]{margin-top:0!important}.hum-wind__container[_ngcontent-%COMP%], .temp-state__container[_ngcontent-%COMP%]{margin:0 auto}.city-name__container[_ngcontent-%COMP%]{padding-bottom:0}}@media only screen and (min-width: 992px) and (max-width: 1399px){.capital-img[_ngcontent-%COMP%]{width:60%}.forecast__container[_ngcontent-%COMP%]{position:relative;left:10%}}@media only screen and (max-width: 1399px){.forecast__container[_ngcontent-%COMP%]{margin-left:0}.day-weather__container[_ngcontent-%COMP%]{margin:0rem 2.5rem}}",".bg-color-light[_ngcontent-%COMP%]{background:linear-gradient(to right,#f5f5f5,#c1f5f7)}.bg-color-dark[_ngcontent-%COMP%]{background:linear-gradient(to right,#315964,#2C3333)}.font-contrast-color[_ngcontent-%COMP%]{color:#fff}.dark-mode-card-color[_ngcontent-%COMP%]{background:linear-gradient(to right,#426c77,#0a0c0c)}.dark-mode-add-card-color[_ngcontent-%COMP%]{background:grey}.application-container[_ngcontent-%COMP%]{height:auto}.loader-container[_ngcontent-%COMP%]{height:100vh;width:100vw;position:absolute;top:0;bottom:0%;left:0;right:0%;background-color:#99969680;z-index:998}.loader[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;z-index:999;width:120px;height:120px;margin:-76px 0 0 -76px;border:16px solid #f3f3f3;border-radius:50%;border-top:16px solid #36d7ec;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-bottom[_ngcontent-%COMP%]{position:relative;-webkit-animation-name:animatebottom;-webkit-animation-duration:1;animation-name:animatebottom;animation-duration:1s}@keyframes animatebottom{0%{bottom:-100px;opacity:0}to{bottom:0;opacity:1}}"]}),a})()}];let Z=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[g.Bz.forChild(D),g.Bz]}),a})(),z=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[d.ez,Z]}),a})()}}]);