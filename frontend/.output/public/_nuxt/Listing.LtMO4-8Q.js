import{_}from"./nuxt-link.HmH_W_nj.js";import{_ as l,b as u}from"./Functions.G-etegh6.js";import{_ as m}from"./_plugin-vue_export-helper.x3n3nnut.js";import{o as t,c as i,t as h,h as s,g as n,w as f,a,F as g,k as p,i as w}from"./entry.vVFzJHlF.js";const y={components:{Card:l},props:{title:{type:String,required:!1,default:""},viewAllUrl:{type:Object,required:!1,default:function(){return null}},items:{type:Object,required:!0},show:{type:Number,required:!1,default:null},loading:{type:Boolean,required:!1,default:!1}},created(){this.show&&(this.items.results=this.items.results.splice(0,this.show),this.items.total_pages=1,this.items.total_results=this.show)},mounted(){window.addEventListener("scroll",this.getScrollPosition)},beforeDestroy(){window.removeEventListener("scroll",this.getScrollPosition)},methods:{getScrollPosition:u(function(){this.items.page<this.items.total_pages?window.innerHeight+window.pageYOffset>=document.body.offsetHeight-600&&!this.loading&&this.loadMore():window.removeEventListener("scroll",this.getScrollPosition)},50),loadMore(){this.$emit("loadMore")}}},v={class:"listing"},k={key:0,class:"listing__head"},b={key:0,class:"listing__title"},x=a("strong",null,"Explore All",-1),S={class:"listing__items"},C={key:1,class:"listing__nav"},N={key:0},M=w('<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#2196f3"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g></svg>',1),B=[M];function q(r,A,e,E,O,L){const c=_,d=l;return t(),i("div",v,[e.title||e.viewAllUrl?(t(),i("div",k,[e.title?(t(),i("h2",b,h(e.title),1)):s("",!0),e.viewAllUrl?(t(),n(c,{key:1,to:e.viewAllUrl,class:"listing__explore"},{default:f(()=>[x]),_:1},8,["to"])):s("",!0)])):s("",!0),a("div",S,[(t(!0),i(g,null,p(e.items.results,o=>(t(),n(d,{key:`card-${o.id}`,item:o},null,8,["item"]))),128))]),e.items.page<e.items.total_pages?(t(),i("div",C,[e.loading?(t(),i("div",N,B)):s("",!0)])):s("",!0)])}const j=m(y,[["render",q]]);export{j as _};
