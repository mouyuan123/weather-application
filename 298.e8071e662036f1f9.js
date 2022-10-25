"use strict";(self.webpackChunkweather=self.webpackChunkweather||[]).push([[298],{8298:(P,g,s)=>{s.r(g),s.d(g,{AddWeatherModule:()=>U});var h=s(6895),c=s(433),p=s(4262),m=s(7579),l=s(2722),t=s(4650),u=s(529),f=s(6497),b=s(3122),C=s(1656);function _(n,i){1&n&&(t.TgZ(0,"div",17),t._UZ(1,"div",18),t.qZA())}function x(n,i){1&n&&t._UZ(0,"option",19),2&n&&t.Q6J("value",i.$implicit)}function y(n,i){1&n&&(t.TgZ(0,"h2",20),t._uU(1,'Please select a capital and click the "Search" icon / press "Enter" key'),t.qZA())}function w(n,i){1&n&&(t.TgZ(0,"h2",21),t._uU(1,"The input is invalid. Note: only capital cities are supported for now"),t.qZA())}function A(n,i){1&n&&t._UZ(0,"img",44)}function v(n,i){1&n&&t._UZ(0,"img",45)}function M(n,i){1&n&&t._UZ(0,"img",46)}function T(n,i){1&n&&t._UZ(0,"img",47)}function W(n,i){1&n&&t._UZ(0,"img",48)}function Z(n,i){1&n&&t._UZ(0,"img",49)}function S(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",22)(2,"div",23)(3,"div",24)(4,"div",1)(5,"h4",25),t._uU(6),t.qZA(),t.TgZ(7,"div",26),t.YNc(8,A,1,0,"img",27),t.YNc(9,v,1,0,"img",28),t.YNc(10,M,1,0,"img",29),t.YNc(11,T,1,0,"img",30),t.YNc(12,W,1,0,"img",31),t.YNc(13,Z,1,0,"img",32),t.qZA(),t.TgZ(14,"div")(15,"h3",33)(16,"strong"),t._uU(17),t.qZA()(),t.TgZ(18,"p",34),t._uU(19),t.qZA(),t.TgZ(20,"div",35)(21,"div",36)(22,"div"),t._UZ(23,"i",37),t.qZA(),t.TgZ(24,"div")(25,"span",33),t._uU(26),t.qZA()(),t.TgZ(27,"div")(28,"span",38),t._uU(29,"Min"),t.qZA()()(),t.TgZ(30,"div",39)(31,"div"),t._UZ(32,"i",40),t.qZA(),t.TgZ(33,"div")(34,"span",33),t._uU(35),t.qZA()(),t.TgZ(36,"div")(37,"span",41),t._uU(38,"Max"),t.qZA()()()()()(),t.TgZ(39,"div",42)(40,"button",43),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.addUserCapitalWeather(r.capital))}),t.TgZ(41,"strong"),t._uU(42),t.qZA()()()()()(),t.BQk()}if(2&n){const e=t.oxw();t.xp6(2),t.ekj("dark-mode-card-color",e.isDarkMode),t.xp6(4),t.Oqu(e.capital),t.xp6(1),t.Q6J("ngSwitch",!0),t.xp6(1),t.Q6J("ngSwitchCase","Clouds"===e.currentWeatherState),t.xp6(1),t.Q6J("ngSwitchCase","Rain"===e.currentWeatherState||"Drizzle"===e.currentWeatherState||"Mist"===e.currentWeatherState),t.xp6(1),t.Q6J("ngSwitchCase","Storm"===e.currentWeatherState||"Thunderstorm"===e.currentWeatherState),t.xp6(1),t.Q6J("ngSwitchCase","Sunny"===e.currentWeatherState||"Clear"===e.currentWeatherState),t.xp6(1),t.Q6J("ngSwitchCase","Haze"===e.currentWeatherState||"Fog"===e.currentWeatherState||"Smoke"===e.currentWeatherState),t.xp6(5),t.hij("",e.currentTemp,"\xb0"),t.xp6(2),t.Oqu(e.currentWeatherState),t.xp6(7),t.Oqu(e.minTemp),t.xp6(9),t.Oqu(e.maxTemp),t.xp6(5),t.Q6J("disabled",e.isAdded),t.xp6(2),t.Oqu(e.btnText)}}const O=[{path:"",component:(()=>{class n{constructor(e,a,r,d,o){this.http=e,this.ws=a,this.location=r,this.pm=d,this.firebase=o,this.searchValue="",this.capitals=[],this.isFirstTime=!0,this.isCapitalValid=!0,this.isLoading=!0,this.unsubscribe$=new m.x}ngOnInit(){this.pm.getPageMode().pipe((0,l.R)(this.unsubscribe$)).subscribe(e=>this.isDarkMode=e),this.http.get("https://restcountries.com/v3.1/all").pipe((0,l.R)(this.unsubscribe$)).subscribe(e=>{e.forEach(a=>{if(a.capital){let r=a.capital[0].toUpperCase();this.capitals.push(r)}}),this.capitals.sort(),this.isLoading=!1}),this.getUserCapitalList()}searchWeatherByCityName(e){this.checkCapital(this.searchValue),this.isCapitalValid&&(this.capital=this.searchValue,this.ws.searchWeatherByCityName(this.capital).subscribe(a=>{switch(this.currentWeatherState=a.weather[0].main,this.currentWeatherState){case"Clouds":this.stateImg="../../assets/images/cloudy-weather.png";break;case"Rain":this.stateImg="../../assets/images/heavy-rain-weather.png";break;case"Storm":this.stateImg="../../assets/images/storm-weather.png";break;case"Sunny":this.stateImg="../../assets/images/sunny-weather.png";break;default:this.stateImg="../../assets/images/snowing-weather.png"}this.currentTemp=Math.round(a.main.temp),this.currentHum=a.main.humidity,this.currentWind=Math.round(a.wind.speed)}),this.ws.getWeatherForecast(this.capital).pipe((0,l.R)(this.unsubscribe$)).subscribe(a=>{let r=a.list[0].main.temp,d=a.list[0].main.temp;a.list.forEach(o=>{r<o.main.temp&&(r=o.main.temp),d>o.main.temp&&(d=o.main.temp)}),this.maxTemp=Math.round(r),this.minTemp=Math.round(d)}),this.toggleAddWeatherBtn()),this.resetForm(),this.isFirstTime=!1}resetForm(){this.searchValue=""}checkCapital(e){this.isCapitalValid=-1!==this.capitals.indexOf(e)}goBack(){this.location.back()}getUserCapitalList(){this.firebase.getUserDetails().pipe((0,l.R)(this.unsubscribe$)).subscribe(e=>this.capitalList=e.capitalList)}toggleAddWeatherBtn(){this.isAdded=-1!==this.capitalList.indexOf(this.capital),this.btnText=this.isAdded?"Added":"Add"}addUserCapitalWeather(e){this.isLoading=!0,this.firebase.addUserCapitalWeather(e).then(a=>{this.isAdded=a,this.toggleAddWeatherBtn(),this.isLoading=!1})}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.eN),t.Y36(f.F),t.Y36(h.Ye),t.Y36(b.m),t.Y36(C.O))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-add-weather"]],decls:21,vars:7,consts:[["class","loader-container",4,"ngIf"],[1,"d-flex","flex-column"],[1,"main_container","m-5","mb-0"],[1,"search-weather"],["for","search-country",1,"form-label"],[1,"text"],[1,"w-75",3,"ngSubmit"],["weatherForm","ngForm"],["name","search-country","list","capitalList","placeholder","Search country here...","required","",1,"form-control",3,"ngModel","ngModelChange"],["type","submit",3,"disabled"],["id","capitalList"],[3,"value",4,"ngFor","ngForOf"],[1,"weather-info"],["class","search-result-text p-2",4,"ngIf"],["class","search-result-text text-danger p-2",4,"ngIf"],[4,"ngIf"],["type","button",1,"back-button","btn","btn-info","col-2","mt-2","ms-5",3,"click"],[1,"loader-container"],[1,"loader"],[3,"value"],[1,"search-result-text","p-2"],[1,"search-result-text","text-danger","p-2"],[1,"card","shadow","rounded"],[1,"weather-details","card","text-center"],[1,"card-body"],[1,"country-name","fs-2"],[1,"p-2",3,"ngSwitch"],["src","../../../assets/images/cloudy-weather.png","alt","Cloudy day ",4,"ngSwitchCase"],["src","../../../assets/images/heavy-rain-weather.png","alt","Raining day",4,"ngSwitchCase"],["src","../../../assets/images/storm-weather.png","alt","Thunderstorm day ",4,"ngSwitchCase"],["src","../../../assets/images/sunny-weather.png","alt","Sunny day ",4,"ngSwitchCase"],["src","../../../assets/images/haze.png","alt","Haze day ",4,"ngSwitchCase"],["src","../../../assets/images/snowing-weather.png","alt","Snowing day ",4,"ngSwitchDefault"],[1,"degree","fs-3"],[1,"weather","mb-0","fs-3"],[1,"d-flex","justify-content-evenly"],[1,"d-flex","flex-column","bd-highlight","justify-content-center","ms-4"],[1,"bi","bi-caret-down-fill","min-degree"],[1,"min-degree","degree","fs-3"],[1,"d-flex","flex-column","bd-highlight","justify-content-center","me-4"],[1,"bi","bi-caret-up-fill","max-degree"],[1,"max-degree","degree","fs-3"],[1,"d-grid"],["type","button",1,"mt-2","btn","btn-info",3,"disabled","click"],["src","../../../assets/images/cloudy-weather.png","alt","Cloudy day "],["src","../../../assets/images/heavy-rain-weather.png","alt","Raining day"],["src","../../../assets/images/storm-weather.png","alt","Thunderstorm day "],["src","../../../assets/images/sunny-weather.png","alt","Sunny day "],["src","../../../assets/images/haze.png","alt","Haze day "],["src","../../../assets/images/snowing-weather.png","alt","Snowing day "]],template:function(e,a){if(1&e){const r=t.EpF();t.YNc(0,_,2,0,"div",0),t.TgZ(1,"div",1)(2,"div",2)(3,"div",3)(4,"label",4)(5,"h2",5),t._uU(6,"Search Cities"),t.qZA()(),t.TgZ(7,"form",6,7),t.NdJ("ngSubmit",function(){t.CHM(r);const o=t.MAs(8);return t.KtG(a.searchWeatherByCityName(o))}),t.TgZ(9,"input",8),t.NdJ("ngModelChange",function(o){return a.searchValue=o})("ngModelChange",function(o){return a.searchValue=o.toUpperCase()}),t.qZA(),t.TgZ(10,"button",9),t._uU(11,"Search"),t.qZA(),t.TgZ(12,"datalist",10),t.YNc(13,x,1,1,"option",11),t.qZA()()(),t.TgZ(14,"div",12),t.YNc(15,y,2,0,"h2",13),t.YNc(16,w,2,0,"h2",14),t.YNc(17,S,43,15,"ng-container",15),t.qZA()(),t.TgZ(18,"button",16),t.NdJ("click",function(){return a.goBack()}),t.TgZ(19,"strong"),t._uU(20,"< Back"),t.qZA()()()}if(2&e){const r=t.MAs(8);t.Q6J("ngIf",a.isLoading),t.xp6(9),t.Q6J("ngModel",a.searchValue),t.xp6(1),t.Q6J("disabled",!r.valid),t.xp6(3),t.Q6J("ngForOf",a.capitals),t.xp6(2),t.Q6J("ngIf",a.isFirstTime),t.xp6(1),t.Q6J("ngIf",!a.isCapitalValid),t.xp6(1),t.Q6J("ngIf",!a.isFirstTime&&a.isCapitalValid)}},dependencies:[h.sg,h.O5,h.RF,h.n9,h.ED,c._Y,c.YN,c.Kr,c.Fj,c.JJ,c.JL,c.Q7,c.On,c.F],styles:[".main_container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;background-color:#fff;box-shadow:#06182c66 0 0 0 2px,#06182ca6 0 4px 6px -1px,#ffffff14 0 1px inset}.search-weather[_ngcontent-%COMP%]{background-color:#f9fde6;padding:20px}.weather-info[_ngcontent-%COMP%]{background-color:#99ebff}.back-button[_ngcontent-%COMP%]{width:100px}.text[_ngcontent-%COMP%]{font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;text-transform:uppercase;color:#4848ca}form[_ngcontent-%COMP%]{color:#555;display:flex;padding:2px;border:1px solid currentColor;border-radius:5px}input[type=search][_ngcontent-%COMP%]{border:none;background:transparent;margin:0;padding:7px 8px;font-size:14px;color:inherit;border:1px solid transparent;border-radius:inherit}input[type=search][_ngcontent-%COMP%]::placeholder{color:#bbb}button[type=submit][_ngcontent-%COMP%]{text-indent:-999px;overflow:hidden;width:40px;padding:0;margin:0;border:1px solid transparent;border-radius:inherit;background:transparent url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E\") no-repeat center;cursor:pointer;opacity:.7}button[type=submit][_ngcontent-%COMP%]:hover{opacity:1}button[type=submit][_ngcontent-%COMP%]:focus, input[type=search][_ngcontent-%COMP%]:focus{box-shadow:0 0 3px #1183d6;border-color:#1183d6;outline:none}.search-result-bg[_ngcontent-%COMP%]{background:rgb(77,76,76);overflow:hidden}.search-result-text[_ngcontent-%COMP%]{color:#0000008e}.weather[_ngcontent-%COMP%]{font-family:Arial,Helvetica,sans-serif}.min-degree[_ngcontent-%COMP%]{color:#2bd69d}.max-degree[_ngcontent-%COMP%]{color:#ce0505}.country-name[_ngcontent-%COMP%]{text-transform:uppercase}@media only screen and (max-width: 992px){.main_container[_ngcontent-%COMP%]{grid-template-columns:auto}}",".bg-color-light[_ngcontent-%COMP%]{background:linear-gradient(to right,#f5f5f5,#c1f5f7)}.bg-color-dark[_ngcontent-%COMP%]{background:linear-gradient(to right,#315964,#2C3333)}.font-contrast-color[_ngcontent-%COMP%]{color:#fff}.dark-mode-card-color[_ngcontent-%COMP%]{background:linear-gradient(to right,#426c77,#0a0c0c)}.dark-mode-add-card-color[_ngcontent-%COMP%]{background:grey}.application-container[_ngcontent-%COMP%]{height:auto}.loader-container[_ngcontent-%COMP%]{height:100vh;width:100vw;position:absolute;top:0;bottom:0%;left:0;right:0%;background-color:#99969680;z-index:998}.loader[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;z-index:999;width:120px;height:120px;margin:-76px 0 0 -76px;border:16px solid #f3f3f3;border-radius:50%;border-top:16px solid #36d7ec;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-bottom[_ngcontent-%COMP%]{position:relative;-webkit-animation-name:animatebottom;-webkit-animation-duration:1;animation-name:animatebottom;animation-duration:1s}@keyframes animatebottom{0%{bottom:-100px;opacity:0}to{bottom:0;opacity:1}}"]}),n})()}];let k=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[p.Bz.forChild(O),p.Bz]}),n})(),U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[h.ez,k,c.u5]}),n})()}}]);