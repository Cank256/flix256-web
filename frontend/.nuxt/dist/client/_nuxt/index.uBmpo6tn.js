import{_ as f,a as h}from"./ListingCarousel.QpOo1yOj.js";import{u as T}from"./Functions.G-etegh6.js";import{_ as M}from"./_plugin-vue_export-helper.x3n3nnut.js";import{r as m,c as w,g as c,h as g,o as i}from"./entry.vVFzJHlF.js";import"./nuxt-link.HmH_W_nj.js";import"./axios.dHanLt5T.js";const p={components:{Hero:f,ListingCarousel:h},setup(){const t=T(),a=m(null),o=m(null),e=m(null),v=t.getListItem("movie","trending").title,r=t.getListItem("tv","trending").title;async function s(){try{const n=await t.getMovies("trending"),u=await t.getTvShows("trending");let l;const _=[...n.data.results,...u.data.results],d=_[Math.floor(Math.random()*_.length)];(d.title?"movie":"tv")==="movie"?l=await t.getMovie(d.id):l=await t.getTvShow(d.id),e.value=l.data,a.value=n.data.results,o.value=u.data.results}catch(n){console.error("There was an error in fetching data",n)}}return s(),{trendingMovies:a,trendingTv:o,featuredItem:e,trendingMoviesTitle:v,trendingTvTitle:r}},computed:{trendingMoviesUrl(){return this.trendingMovies?{name:"movie-category-name",params:{name:"trending"}}:""},trendingTvUrl(){return this.trendingTv?{name:"tv-category-name",params:{name:"trending"}}:""}}},k={class:"main"};function y(t,a,o,e,v,r){const s=f,n=h;return i(),w("main",k,[e.featuredItem?(i(),c(s,{key:0,item:e.featuredItem,id:"hero"},null,8,["item"])):g("",!0),e.trendingMovies&&e.trendingMovies.length?(i(),c(n,{key:1,title:e.trendingMoviesTitle,"view-all-url":r.trendingMoviesUrl,items:e.trendingMovies},null,8,["title","view-all-url","items"])):g("",!0),e.trendingTv&&e.trendingTv.length?(i(),c(n,{key:2,title:e.trendingTvTitle,"view-all-url":r.trendingTvUrl,items:e.trendingTv},null,8,["title","view-all-url","items"])):g("",!0)])}const S=M(p,[["render",y]]);export{S as default};