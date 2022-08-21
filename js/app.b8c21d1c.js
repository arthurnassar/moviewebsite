(function(){"use strict";var e={3878:function(e,t,o){var s=o(9242),a=o(3396);const i={id:"app"};function n(e,t,o,s,n,r){const l=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)("div",i,[((0,a.wg)(),(0,a.j4)(l,{key:e.$route.fullPath}))])}var r={data(){return{}}},l=o(89);const c=(0,l.Z)(r,[["render",n]]);var d=c,u=o(4042),h=o(4239),p=o(3412),m=o.n(p);(0,s.ri)(d).use(h.Z).use(u.Z).use(m()).mount("#app")},4042:function(e,t,o){o.d(t,{Z:function(){return F}});var s=o(4239),a=o(2483),i=o(3396),n=o(7139),r=o(9242);const l={class:"filme-info pure-white"},c={key:0},d={class:"title-info"},u={class:"overview"},h=(0,i._)("p",{class:"orange-light"},[(0,i._)("strong",null,"overview")],-1),p={class:"fs-12"},m={key:0,class:"text-right"},v=(0,i._)("u",null,"Descubra mais ...",-1),g={key:0,class:"movies-container"};function f(e,t,o,s,a,f){const w=(0,i.up)("NavBar"),k=(0,i.up)("StarRating"),_=(0,i.up)("router-link"),b=(0,i.up)("FiltrarItens"),y=(0,i.up)("MoviesCarousel");return(0,i.wg)(),(0,i.iD)("div",{class:"about",style:(0,n.j5)({backgroundImage:f.returnBackground})},[(0,i._)("main",null,[(0,i.Wm)(w,{onFilmeProcurado:t[0]||(t[0]=e=>f.handleSearch(e))}),(0,i._)("section",l,[a.selectedMovie?((0,i.wg)(),(0,i.iD)("div",c,[(0,i._)("div",d,[(0,i._)("p",null,(0,n.zw)(f.displayGenres),1),(0,i._)("h1",null,(0,n.zw)(a.selectedMovie.title),1),(0,i.Wm)(k,{voteAverage:a.selectedMovie.vote_average,runTime:a.selectedMovie.runtime},null,8,["voteAverage","runTime"])]),(0,i._)("div",u,[h,(0,i._)("p",p,(0,n.zw)(a.selectedMovie.overview),1),a.selectedMovie.tagline?((0,i.wg)(),(0,i.iD)("p",m,[(0,i._)("small",null,[(0,i._)("em",null,' "'+(0,n.zw)(a.selectedMovie.tagline)+'" ',1)])])):(0,i.kq)("",!0)]),(0,i.Wm)(_,{class:"orange-light fs-12",to:{name:"details",params:{type:"movie",id:a.selectedMovie.id}}},{default:(0,i.w5)((()=>[v])),_:1},8,["to"])])):(0,i.kq)("",!0),(0,i.Wm)(b,{onFiltroAtivado:f.filtrarFilmes,idType:"movie"},null,8,["onFiltroAtivado"]),(0,i.Wm)(r.W3,{name:"fade",appear:""},{default:(0,i.w5)((()=>[a.renderComponent?((0,i.wg)(),(0,i.iD)("div",g,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(a.movies,(e=>((0,i.wg)(),(0,i.j4)(y,{isLoading:a.isLoading,onFilmeSelecionado:t[1]||(t[1]=e=>f.selecionarFilme(e)),key:e.id,genreName:e.name,movies:e.movies.results,topRated:!1},null,8,["isLoading","genreName","movies"])))),128))])):(0,i.kq)("",!0)])),_:1})])])],4)}var w=o(266),k=o(6265),_=o.n(k),b=o(6033),y=o(6814),M=o(6488),S={name:"HomeView",components:{NavBar:w.Z,MoviesCarousel:b.Z,StarRating:y.Z,FiltrarItens:M.Z},data(){return{poster:"",genres:null,movies:[],selectedMovie:void 0,windowWidth:"",isLoading:!0,renderComponent:!0}},computed:{displayGenres(){if(this.selectedMovie.genres){const e=this.selectedMovie.genres,t=e.map((e=>e.name));return t.join(", ")}if(this.selectedMovie.genres_ids){const e=this.selectedMovie.genres_ids,t=e.map((e=>e.name));return t.join(", ")}return""},returnBackground(){return` linear-gradient(to bottom, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.76)),\n    url(https://image.tmdb.org/t/p/original${this.poster})`}},watch:{genres(){this.getMoviesByGenre(this.genres)}},methods:{filtrarFilmes(e){this.movies=e;const t=e[0].movies.results[0];this.selectedMovie=t,"mobile"===this.windowWidth?this.poster=t.poster_path:"desktop"===this.windowWidth&&(this.poster=t.backdrop_path)},handleSearch(e){const t=e[0].movies.results[0];0!==e[0].movies.results.length&&(this.movies=e,this.selectedMovie=t,"mobile"===this.windowWidth?this.poster=t.poster_path:"desktop"===this.windowWidth&&(this.poster=t.backdrop_path),this.renderComponent=!1,this.$nextTick((()=>{this.renderComponent=!0})))},selecionarFilme(e){const t=e.id,o=this;_().get(`https://api.themoviedb.org/3/movie/${t}?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR`).then((function(e){o.selectedMovie=e.data})).catch((function(e){console.log(e)})),"mobile"===this.windowWidth?this.poster=e.poster_path:"desktop"===this.windowWidth&&(this.poster=e.backdrop_path)},getGenres(){const e=this;_().get("https://api.themoviedb.org/3/genre/movie/list?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR").then((function(t){e.genres=t.data.genres})).catch((function(e){console.log(e)}))},getMoviesByGenre(e){const t=[],o=new Promise((function(o,s){e.forEach((e=>{const a=e.id;_().get(`https://api.themoviedb.org/3/discover/movie?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${a}&with_watch_monetization_types=flatrate`).then((function(o){t.push({id:e.id,name:e.name,movies:o.data})})).then((function(){o(t)})).catch((function(e){console.log(e),s(e)}))}))}));o.then((e=>{console.log(e),this.movies=e;const t=this.movies[0].movies.results[0];this.selecionarFilme(t),"mobile"===this.windowWidth?this.poster=t.poster_path:"desktop"===this.windowWidth&&(this.poster=t.backdrop_path),setTimeout((()=>{this.isLoading=!1}),3e3)}))},updateWindowWidth(){window.innerWidth>=600?(this.windowWidth="desktop",this.selectedMovie&&(this.poster=this.selectedMovie.backdrop_path)):(this.windowWidth="mobile",this.selectedMovie&&(this.poster=this.selectedMovie.poster_path))}},mounted(){this.updateWindowWidth(),window.addEventListener("resize",this.updateWindowWidth),this.getGenres()}},L=o(89);const C=(0,L.Z)(S,[["render",f]]);var D=C;const T=[{path:"/login",name:"login",component:()=>o.e(443).then(o.bind(o,4746)),meta:{needsAuth:!1}},{path:"/",name:"home",component:D,meta:{needsAuth:!0}},{path:"/details/:id",name:"details",component:()=>o.e(443).then(o.bind(o,8912)),meta:{needsAuth:!0}},{path:"/status",name:"status",component:()=>o.e(443).then(o.bind(o,774)),meta:{needsAuth:!0}},{path:"/series",name:"series",component:()=>o.e(443).then(o.bind(o,6415)),meta:{needsAuth:!0}}],I=(0,a.p7)({history:(0,a.PO)("/moviewebsite/"),routes:T});I.beforeEach(((e,t,o)=>{if("true"===e.query.approved)return o("/login");localStorage.getItem("request_token")?s.Z.commit("setRequestToken",localStorage.getItem("request_token")):s.Z.dispatch("getRequestToken"),localStorage.getItem("is_authenticated")&&("guest"===localStorage.getItem("auth_type")?s.Z.commit("setGuestSessionId",localStorage.getItem("session_id")):"user"===localStorage.getItem("auth_type")&&s.Z.commit("setLoginSession",localStorage.getItem("session_id"))),e.meta.needsAuth?s.Z.state.isAuthenticated?"/login"===e.path?o({name:"home"}):o():(alert("Usuario não autenticado, favor fazer login primeiro"),o({name:"login"})):o()}));var F=I},4239:function(e,t,o){var s=o(65),a=o(6265),i=o.n(a),n=o(4042);t["Z"]=(0,s.MT)({state:{isAuthenticated:!1,authType:"",requestToken:"",sessionId:""},getters:{},mutations:{logOut(e){e.isAuthenticated=!1,e.authType="",e.requestToken="",e.sessionId="",localStorage.removeItem("is_authenticated"),localStorage.removeItem("auth_type"),localStorage.removeItem("request_token"),localStorage.removeItem("session_id"),n.Z.push({name:"login"}),n.Z.go()},setRequestToken(e,t){this.state.requestToken=t},setGuestSessionId(e,t){this.state.sessionId=t,this.state.isAuthenticated=!0,this.state.authType="guest",localStorage.getItem("session_id")||localStorage.setItem("session_id",t),localStorage.getItem("is_authenticated")||localStorage.setItem("is_authenticated",!0),localStorage.getItem("auth_type")||localStorage.setItem("auth_type","guest")},setLoginSession(e,t){this.state.sessionId=t,this.state.isAuthenticated=!0,this.state.authType="user",localStorage.getItem("session_id")||localStorage.setItem("session_id",t),localStorage.getItem("is_authenticated")||localStorage.setItem("is_authenticated",!0),localStorage.getItem("auth_type")||localStorage.setItem("auth_type","user")}},actions:{async getRequestToken({commit:e}){await i().get("https://api.themoviedb.org/3/authentication/token/new?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91").then((function(t){e("setRequestToken",t.data.request_token),localStorage.setItem("request_token",t.data.request_token)})).catch((function(e){console.log(e)}))},async createGuest({commit:e}){await i().get("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91").then((function(t){e("setGuestSessionId",t.data.guest_session_id)})).then((function(){n.Z.push("/")})).catch((function(e){console.log(e)}))},async logInWithTMDB({state:e,commit:t}){await i().post("https://api.themoviedb.org/3/authentication/session/new?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91",{request_token:e.requestToken}).then((function(e){t("setLoginSession",e.data.session_id),n.Z.push({name:"home"})})).catch((function(e){localStorage.clear(),alert("token nao autorizado")}))}},modules:{}})},6488:function(e,t,o){o.d(t,{Z:function(){return b}});var s=o(3396),a=o(9242);const i=e=>((0,s.dD)("data-v-23296dad"),e=e(),(0,s.Cn)(),e),n={class:"filtro"},r={class:"input-group mb-3"},l=i((()=>(0,s._)("option",{value:"null",disabled:""},"Escolha o filtro",-1))),c={key:0,value:"now"},d={key:1,value:"upcoming"},u=i((()=>(0,s._)("option",{value:"top"},"Melhores avaliações",-1))),h=i((()=>(0,s._)("option",{value:"popular"},"Mais populares",-1))),p={key:2,value:"onAir"},m={class:"input-group-append"};function v(e,t,o,i,v,g){return(0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("div",r,[(0,s.wy)((0,s._)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>v.tipoDeFiltro=e),class:"custom-select",id:"inputGroupSelect01"},[l,"movie"===o.idType?((0,s.wg)(),(0,s.iD)("option",c,"Em cartaz")):(0,s.kq)("",!0),"movie"===o.idType?((0,s.wg)(),(0,s.iD)("option",d," Próximas estreias ")):(0,s.kq)("",!0),u,h,"tv"===o.idType?((0,s.wg)(),(0,s.iD)("option",p,"Series no ar")):(0,s.kq)("",!0)],512),[[a.bM,v.tipoDeFiltro]]),(0,s._)("div",m,[(0,s._)("button",{onClick:t[1]||(t[1]=(0,a.iM)(((...e)=>g.filtrar&&g.filtrar(...e)),["prevent"])),class:"btn btn-outline-secondary",type:"button"}," Filtrar ")])])])}var g=o(6265),f=o.n(g),w={name:"FiltrarItens",data(){return{tipoDeFiltro:null,response:[]}},props:{idType:String},watch:{response(){this.$emit("filtroAtivado",this.response)}},methods:{filtrar(){switch(this.tipoDeFiltro){case"now":f().get(`https://api.themoviedb.org/3/${this.idType}/now_playing?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`).then((e=>{this.response=[{id:1,name:"Em cartaz",movies:e.data}]})).catch((e=>{console.log(e)}));break;case"upcoming":f().get("https://api.themoviedb.org/3/movie/upcoming?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1").then((e=>{this.response=[{id:2,name:"Próximas Estreias",movies:e.data}]})).catch((e=>{console.log(e)}));break;case"top":f().get(`https://api.themoviedb.org/3/${this.idType}/top_rated?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`).then((e=>{this.response=[{id:3,name:"Melhores Avaliações",movies:e.data}]})).catch((e=>{console.log(e)}));break;case"popular":f().get(`https://api.themoviedb.org/3/${this.idType}/popular?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`).then((e=>{this.response=[{id:4,name:"Mais Populares",movies:e.data}]})).catch((e=>{console.log(e)}));break;case"onAir":f().get(`https://api.themoviedb.org/3/${this.idType}/on_the_air?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&page=1`).then((e=>{this.response=[{id:5,name:"Series no ar",movies:e.data}]})).catch((e=>{console.log(e)}));break}}}},k=o(89);const _=(0,k.Z)(w,[["render",v],["__scopeId","data-v-23296dad"]]);var b=_},6033:function(e,t,o){o.d(t,{Z:function(){return T}});var s=o(3396),a=o(7139);const i=e=>((0,s.dD)("data-v-2a528bdc"),e=e(),(0,s.Cn)(),e),n={key:0,class:"genre"},r={class:"genre-name"},l=i((()=>(0,s._)("div",{class:"underscore"},null,-1))),c={key:1,class:"genre"},d={class:"genre-name"},u=i((()=>(0,s._)("div",{class:"underscore"},null,-1))),h={id:"wrapper"},p=i((()=>(0,s._)("div",{class:"fadeEffect"},null,-1)));function m(e,t,o,i,m,v){const g=(0,s.up)("MovieCards");return(0,s.wg)(),(0,s.iD)("section",null,[o.movies?((0,s.wg)(),(0,s.iD)("div",n,[o.movies.length>0?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s._)("h2",r,(0,a.zw)(o.genreName),1),l],64)):(0,s.kq)("",!0)])):o.crew?((0,s.wg)(),(0,s.iD)("div",c,[o.crew.length>0?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s._)("h2",d,(0,a.zw)(o.genreName),1),u],64)):(0,s.kq)("",!0)])):(0,s.kq)("",!0),(0,s._)("div",h,[(0,s._)("div",{id:"inner",onMousedown:t[0]||(t[0]=e=>v.slide(e)),onTouchstart:t[1]||(t[1]=e=>v.slideMobile(e))},[o.movies&&!o.topRated?((0,s.wg)(!0),(0,s.iD)(s.HY,{key:0},(0,s.Ko)(m.renderedMovies,(e=>((0,s.wg)(),(0,s.j4)(g,{isLoading:o.isLoading,key:e.id,poster:e.poster_path,movieName:e.title,onMousedown:t=>m.selectedMovie=e},null,8,["isLoading","poster","movieName","onMousedown"])))),128)):(0,s.kq)("",!0),o.movies&&o.topRated?((0,s.wg)(!0),(0,s.iD)(s.HY,{key:1},(0,s.Ko)(o.movies,(e=>((0,s.wg)(),(0,s.j4)(g,{isLoading:o.isLoading,key:e.id,poster:e.poster_path,movieName:e.title,onMousedown:t=>m.selectedMovie=e},null,8,["isLoading","poster","movieName","onMousedown"])))),128)):o.crew?((0,s.wg)(!0),(0,s.iD)(s.HY,{key:2},(0,s.Ko)(o.crew,(e=>((0,s.wg)(),(0,s.j4)(g,{isLoading:o.isLoading,key:e.id,poster:e.profile_path,castCharacter:e.character,castName:e.name,castDepartment:e.known_for_department},null,8,["isLoading","poster","castCharacter","castName","castDepartment"])))),128)):(0,s.kq)("",!0)],32),p])])}const v={key:0,class:"vld-parent"},g={key:0},f={key:1},w={key:2};function k(e,t,o,i,n,r){const l=(0,s.up)("loading");return(0,s.wg)(),(0,s.iD)("div",{class:"card",style:(0,a.j5)({backgroundImage:r.fullPathImage})},[o.isLoading?((0,s.wg)(),(0,s.iD)("div",v,[(0,s.Wm)(l,{active:n.stillLoading,"onUpdate:active":t[0]||(t[0]=e=>n.stillLoading=e),"can-cancel":!1,"is-full-page":!1,width:100,height:100,opacity:.8,transition:"fade"},null,8,["active","opacity"])])):(0,s.kq)("",!0),(o.castName||o.castCharacter||o.castDepartment)&&!o.isLoading?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[o.castName&&o.castCharacter?((0,s.wg)(),(0,s.iD)("p",g,(0,a.zw)(o.castName)+" as "+(0,a.zw)(o.castCharacter),1)):((0,s.wg)(),(0,s.iD)("p",f,(0,a.zw)(o.castName),1)),(0,s._)("p",null,(0,a.zw)(o.castDepartment),1)],64)):(0,s.kq)("",!0),o.movieName&&!o.isLoading?((0,s.wg)(),(0,s.iD)("p",w,(0,a.zw)(o.movieName),1)):(0,s.kq)("",!0)],4)}var _=o(3752),b=o.n(_),y={name:"MovieCards ",data(){return{stillLoading:!0}},components:{Loading:b()},props:{poster:String,movieName:String,castName:String,castCharacter:String,castDepartment:String,isLoading:Boolean},watch:{isLoading(){!0===this.isLoading?this.stillLoading=!0:this.stillLoading=!1}},computed:{fullPathImage(){return` linear-gradient(to bottom, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url(https://image.tmdb.org/t/p/original${this.poster})`}}},M=o(89);const S=(0,M.Z)(y,[["render",k],["__scopeId","data-v-22337f94"]]);var L=S,C={props:{movies:Array,genreName:String,crew:Array,isLoading:Boolean,topRated:{type:Boolean,default:!1}},data(){return{selectedMovie:null,sliderPosition:void 0,renderedMovies:[],counter:8}},components:{MovieCards:L},methods:{slide(e){const t=e.currentTarget,o=e.currentTarget.parentNode;t.style.right||(t.style.right="0px");const s=e.clientX,a=e.clientX+parseInt(t.style.right.split("px")[0]);window.onmouseup=e=>{s===e.clientX&&this.$emit("filmeSelecionado",this.selectedMovie),t.offsetLeft>52&&(t.classList.add("smooth"),t.style.right="0px",setTimeout((()=>{t.classList.remove("smooth")}),1e3)),t.offsetLeft<o.offsetWidth-t.offsetWidth-52&&(this.loadMovies(),t.classList.add("smooth"),t.style.right=t.offsetWidth-o.offsetWidth+"px",setTimeout((()=>{t.classList.remove("smooth")}),1e3)),window.onmousemove=()=>{}},window.onmousemove=e=>{if(t.offsetLeft<52&&Math.abs(t.offsetLeft)<t.offsetWidth-o.offsetWidth+52){const o=a-e.clientX;t.style.right=`${o}px`}}},slideMobile(e){const t=e.currentTarget,o=e.currentTarget.parentNode;t.style.right||(t.style.right="0px");const s=parseInt(t.style.right.split("px")[0]),a=[];e.currentTarget.addEventListener("touchmove",(e=>{a.push(e.touches[0].clientX);const o=a[0],i=a[a.length-1],n=s+(o-i);t.style.right=`${n}px`})),e.currentTarget.addEventListener("touchend",(e=>{t.offsetLeft>28&&(t.classList.add("smooth"),t.style.right="0px",setTimeout((()=>{t.classList.remove("smooth")}),1e3)),t.offsetLeft<o.offsetWidth-t.offsetWidth-52&&(t.classList.add("smooth"),t.style.right=t.offsetWidth-o.offsetWidth+"px",setTimeout((()=>{t.classList.remove("smooth")}),1e3))}))},loadMovies(){const e=[];for(let t=0;t<this.counter;t++)e.push(this.movies[t]);if(this.renderedMovies=e,this.counter<16)this.counter+=8;else if(this.counter>=6&&this.counter<20){const e=20-this.counter;this.counter+=e}}},mounted(){this.loadMovies()}};const D=(0,M.Z)(C,[["render",m],["__scopeId","data-v-2a528bdc"]]);var T=D},266:function(e,t,o){o.d(t,{Z:function(){return F}});var s=o(3396),a=o(9242);const i=e=>((0,s.dD)("data-v-c543f336"),e=e(),(0,s.Cn)(),e),n={class:"hello"},r={class:"navbar navbar-expand-lg"},l=i((()=>(0,s._)("a",{class:"navbar-brand orange-light",href:"/"},"MOVIER",-1))),c=i((()=>(0,s._)("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,s._)("img",{src:"https://www.clipartmax.com/png/full/36-365828_navbar-toggle-icon-menu-hamburger-png-white.png",alt:"hamburguer menu",style:{width:"30px",heigth:"30px"}})],-1))),d={class:"collapse navbar-collapse",id:"navbarSupportedContent"},u={class:"navbar-nav mr-auto"},h={key:0},p=(0,s.uE)('<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" data-v-c543f336><button class="btn my-2 my-sm-0" type="submit" data-v-c543f336><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c543f336><path d="M12.9008 12.2956L12.2997 12.8967L17.403 18L18.0041 17.3989L12.9008 12.2956Z" stroke="#FDFDFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c543f336></path><path d="M7.80066 14.6013C11.5566 14.6013 14.6013 11.5566 14.6013 7.80066C14.6013 4.04476 11.5566 1 7.80066 1C4.04476 1 1 4.04476 1 7.80066C1 11.5566 4.04476 14.6013 7.80066 14.6013Z" stroke="#FDFDFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c543f336></path></svg></button>',2),m=[p],v={class:"nav-item active"},g=(0,s.Uk)(" Filmes "),f={class:"nav-item active"},w=(0,s.Uk)(" Séries "),k={class:"nav-item active"},_=(0,s.Uk)(" Status "),b={class:"nav-item active logout-item"},y=i((()=>(0,s._)("a",{class:"btn","data-toggle":"collapse",href:"#collapseExample",role:"button","aria-expanded":"false","aria-controls":"collapseExample"},[(0,s._)("svg",{width:"20",height:"19",viewBox:"0 0 20 19",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[(0,s._)("path",{d:"M10.0041 9.5C5.36733 9.5 1.60413 13.084 1.60413 17.5C1.62093 17.5 18.4041 17.5 18.4041 17.5C18.4041 13.084 14.6409 9.5 10.0041 9.5Z",stroke:"#FDFDFD","stroke-width":"2","stroke-miterlimit":"10","stroke-linecap":"round","stroke-linejoin":"round"}),(0,s._)("path",{d:"M10.0041 9.5C12.3237 9.5 14.2041 7.70914 14.2041 5.5C14.2041 3.29086 12.3237 1.5 10.0041 1.5C7.68454 1.5 5.80414 3.29086 5.80414 5.5C5.80414 7.70914 7.68454 9.5 10.0041 9.5Z",stroke:"#FDFDFD","stroke-width":"2","stroke-miterlimit":"10","stroke-linecap":"round","stroke-linejoin":"round"})])],-1))),M={class:"collapse",id:"collapseExample"};function S(e,t,o,i,p,S){const L=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("nav",r,[l,c,(0,s._)("div",d,[(0,s._)("ul",u,[o.noSearch?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("li",h,[(0,s._)("form",{onSubmit:t[0]||(t[0]=(0,a.iM)((e=>S.submitSearchedValue(e)),["prevent"])),class:"form-inline my-2 my-lg-0"},m,32)])),(0,s._)("li",v,[(0,s.Wm)(L,{class:"nav-link",to:"/"},{default:(0,s.w5)((()=>[g])),_:1})]),(0,s._)("li",f,[(0,s.Wm)(L,{class:"nav-link",to:"/series"},{default:(0,s.w5)((()=>[w])),_:1})]),(0,s._)("li",k,[(0,s.Wm)(L,{class:"nav-link",to:"/status"},{default:(0,s.w5)((()=>[_])),_:1})]),(0,s._)("li",b,[y,(0,s._)("div",M,[(0,s._)("button",{onClick:t[1]||(t[1]=(...e)=>S.logOut&&S.logOut(...e)),class:"white w-"},"LOGOUT")])])])])])])}var L=o(6265),C=o.n(L),D={name:"NavBar",props:{noSearch:Boolean,idType:String},data(){return{searchedMovies:null}},watch:{searchedMovies(){this.$emit("filmeProcurado",this.searchedMovies)}},methods:{submitSearchedValue(e){const t=e.target.elements[0].value,o=t.split("").shift().toUpperCase(),s=o+t.split("").splice(1).join("");if(t)if("tv"===this.idType){const e=this;C().get(`https://api.themoviedb.org/3/search/tv?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&query=${t}&page=1&include_adult=false`).then((function(t){e.searchedMovies=[{id:"searched",name:`${s}`,movies:t.data}]})).catch((function(e){console.log(e)}))}else{const e=this;C().get(`https://api.themoviedb.org/3/search/movie?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&language=pt-BR&query=${t}&page=1&include_adult=false`).then((function(t){e.searchedMovies=[{id:"searched",name:`${s}`,movies:t.data}]})).catch((function(e){console.log(e)}))}},logOut(){this.$store.commit("logOut")}}},T=o(89);const I=(0,T.Z)(D,[["render",S],["__scopeId","data-v-c543f336"]]);var F=I},6814:function(e,t,o){o.d(t,{Z:function(){return f}});var s=o(3396),a=o(7139);const i=e=>((0,s.dD)("data-v-ef13dd56"),e=e(),(0,s.Cn)(),e),n={key:0,class:"star-container"},r=(0,s.uE)('<span id="1" class="fa fa-star rate" data-v-ef13dd56></span><span id="2" class="fa fa-star rate" data-v-ef13dd56></span><span id="3" class="fa fa-star rate" data-v-ef13dd56></span><span id="4" class="fa fa-star rate" data-v-ef13dd56></span><span id="5" class="fa fa-star rate" data-v-ef13dd56></span><span id="5" class="fa fa-star rate" data-v-ef13dd56></span><span id="5" class="fa fa-star rate" data-v-ef13dd56></span><span id="5" class="fa fa-star rate" data-v-ef13dd56></span><span id="5" class="fa fa-star rate" data-v-ef13dd56></span><span id="5" class="fa fa-star rate" data-v-ef13dd56></span>',10),l={key:0},c=i((()=>(0,s._)("svg",{width:"17",height:"17",viewBox:"0 0 17 17",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[(0,s._)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M15.8228 8.5004C15.8228 12.545 12.5445 15.8233 8.49986 15.8233C4.45523 15.8233 1.17694 12.545 1.17694 8.5004C1.17694 4.45577 4.45523 1.17748 8.49986 1.17748C12.5445 1.17748 15.8228 4.45577 15.8228 8.5004Z",stroke:"#FDFDFD","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),(0,s._)("path",{d:"M11.2165 10.8298L8.23196 9.04934V5.21214",stroke:"#FDFDFD","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1))),d={key:1,class:"vote-container"};function u(e,t,o,i,u,h){return o.rateStars?((0,s.wg)(),(0,s.iD)("div",d,[(0,s._)("span",{onClick:t[0]||(t[0]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[1]||(t[1]=e=>h.handleMouseOver(e)),id:"1",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[2]||(t[2]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[3]||(t[3]=e=>h.handleMouseOver(e)),id:"2",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[4]||(t[4]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[5]||(t[5]=e=>h.handleMouseOver(e)),id:"3",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[6]||(t[6]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[7]||(t[7]=e=>h.handleMouseOver(e)),id:"4",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[8]||(t[8]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[9]||(t[9]=e=>h.handleMouseOver(e)),id:"5",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[10]||(t[10]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[11]||(t[11]=e=>h.handleMouseOver(e)),id:"6",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[12]||(t[12]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[13]||(t[13]=e=>h.handleMouseOver(e)),id:"7",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[14]||(t[14]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[15]||(t[15]=e=>h.handleMouseOver(e)),id:"8",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[16]||(t[16]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[17]||(t[17]=e=>h.handleMouseOver(e)),id:"9",class:"fa fa-star vote"},null,32),(0,s._)("span",{onClick:t[18]||(t[18]=(...e)=>h.sendVote&&h.sendVote(...e)),onMousemove:t[19]||(t[19]=e=>h.handleMouseOver(e)),id:"10",class:"fa fa-star vote"},null,32)])):((0,s.wg)(),(0,s.iD)("div",n,[r,(0,s._)("p",null,(0,a.zw)(o.voteAverage.toFixed(1)),1),o.runTime?((0,s.wg)(),(0,s.iD)("p",l,[c,(0,s.Uk)(" "+(0,a.zw)(h.getRunTime),1)])):(0,s.kq)("",!0)]))}var h=o(6265),p=o.n(h),m={name:"StarRating",data(){return{voteRate:0,voteClicked:!1}},props:{voteAverage:Number,runTime:Number,rateStars:Boolean},watch:{voteAverage(){this.fillStars()}},methods:{sendVote(){if(!this.voteClicked){this.voteClicked=!0;const e=this.$route.params.id;let t=localStorage.getItem("idType");this.$route.params.type&&(t=this.$route.params.type);const o={value:this.voteRate},s=this.$store.state.authType,a=this.$store.state.sessionId,i=`https://api.themoviedb.org/3/${t}/${e}/rating?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&guest_session_id=${a}`,n=`https://api.themoviedb.org/3/${t}/${e}/rating?api_key=3c78ca8d7c3707902d0ca0cbb06c2d91&session_id=${a}`;"guest"===s?p().post(i,o).then((e=>{e.data.success&&(this.fillStars(),alert("Seu voto foi enviado ou atualizado com sucesso"))})).catch((e=>console.log(e))):p().post(n,o).then((e=>{e.data.success&&alert("Seu voto foi enviado ou atualizado com sucesso")})).catch((e=>console.log(e)))}},emptyStars(){const e=document.querySelectorAll(".rate");e.forEach((e=>{e.classList.remove("half"),e.classList.remove("full"),e.classList.remove("none")}))},fillStars(){this.emptyStars();let e=this.voteAverage;const t=document.querySelectorAll(".rate");t.forEach((t=>{e>=1?t.classList.add("full"):e>0&&e<1?t.classList.add("half"):t.classList.add("none"),e--}))},fillVoteStars(e,t){e<t&&this.emptyStars();const o=document.querySelectorAll(".vote");o.forEach((t=>{e>=1?(t.classList.remove("half"),t.classList.remove("full"),t.classList.remove("none"),t.classList.add("full")):e>0&&e<1?(t.classList.remove("half"),t.classList.remove("full"),t.classList.remove("none"),t.classList.add("half")):(t.classList.remove("half"),t.classList.remove("full"),t.classList.remove("none"),t.classList.add("none")),e--}))},handleMouseOver(e){const t=e.offsetX,o=e.target.id;if(t<=7){const e=.5,t=this.voteRate,s=o-1+e;this.voteRate=s,this.voteClicked||this.fillVoteStars(s,t)}else{const e=1,t=this.voteRate,s=o-1+e;this.voteRate=s,this.voteClicked||this.fillVoteStars(s,t)}}},computed:{getRunTime(){const e=this.runTime/60;return`${Math.floor(e)}h ${this.runTime%60}m`}},mounted(){this.fillStars()}},v=o(89);const g=(0,v.Z)(m,[["render",u],["__scopeId","data-v-ef13dd56"]]);var f=g}},t={};function o(s){var a=t[s];if(void 0!==a)return a.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,o),i.exports}o.m=e,function(){var e=[];o.O=function(t,s,a,i){if(!s){var n=1/0;for(d=0;d<e.length;d++){s=e[d][0],a=e[d][1],i=e[d][2];for(var r=!0,l=0;l<s.length;l++)(!1&i||n>=i)&&Object.keys(o.O).every((function(e){return o.O[e](s[l])}))?s.splice(l--,1):(r=!1,i<n&&(n=i));if(r){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[s,a,i]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,s){return o.f[s](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/about.d35e56eb.js"}}(),function(){o.miniCssF=function(e){return"css/about.9c33edff.css"}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="MOVIER:";o.l=function(s,a,i,n){if(e[s])e[s].push(a);else{var r,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==s||u.getAttribute("data-webpack")==t+i){r=u;break}}r||(l=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,o.nc&&r.setAttribute("nonce",o.nc),r.setAttribute("data-webpack",t+i),r.src=s),e[s]=[a];var h=function(t,o){r.onerror=r.onload=null,clearTimeout(p);var a=e[s];if(delete e[s],r.parentNode&&r.parentNode.removeChild(r),a&&a.forEach((function(e){return e(o)})),t)return t(o)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=h.bind(null,r.onerror),r.onload=h.bind(null,r.onload),l&&document.head.appendChild(r)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/moviewebsite/"}(),function(){var e=function(e,t,o,s){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(i){if(a.onerror=a.onload=null,"load"===i.type)o();else{var n=i&&("load"===i.type?"missing":i.type),r=i&&i.target&&i.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=n,l.request=r,a.parentNode.removeChild(a),s(l)}};return a.onerror=a.onload=i,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var a=o[s],i=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(i===e||i===t))return a}var n=document.getElementsByTagName("style");for(s=0;s<n.length;s++){a=n[s],i=a.getAttribute("data-href");if(i===e||i===t)return a}},s=function(s){return new Promise((function(a,i){var n=o.miniCssF(s),r=o.p+n;if(t(n,r))return a();e(s,r,a,i)}))},a={143:0};o.f.miniCss=function(e,t){var o={443:1};a[e]?t.push(a[e]):0!==a[e]&&o[e]&&t.push(a[e]=s(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={143:0};o.f.j=function(t,s){var a=o.o(e,t)?e[t]:void 0;if(0!==a)if(a)s.push(a[2]);else{var i=new Promise((function(o,s){a=e[t]=[o,s]}));s.push(a[2]=i);var n=o.p+o.u(t),r=new Error,l=function(s){if(o.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var i=s&&("load"===s.type?"missing":s.type),n=s&&s.target&&s.target.src;r.message="Loading chunk "+t+" failed.\n("+i+": "+n+")",r.name="ChunkLoadError",r.type=i,r.request=n,a[1](r)}};o.l(n,l,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,s){var a,i,n=s[0],r=s[1],l=s[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(a in r)o.o(r,a)&&(o.m[a]=r[a]);if(l)var d=l(o)}for(t&&t(s);c<n.length;c++)i=n[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},s=self["webpackChunkMOVIER"]=self["webpackChunkMOVIER"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=o.O(void 0,[998],(function(){return o(3878)}));s=o.O(s)})();
//# sourceMappingURL=app.b8c21d1c.js.map