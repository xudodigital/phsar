// Count visible playback, not product navigation. The API owns the shared ranking.
const globalVideoViews={};let videoViewsReady=false,videoViewsFailed=false;
async function loadVideoViews(){try{const r=await fetch('/api/video-views',{cache:'no-store'});if(!r.ok)throw Error();const data=await r.json();Object.keys(globalVideoViews).forEach(k=>delete globalVideoViews[k]);Object.assign(globalVideoViews,data.counts);videoViewsReady=true;videoViewsFailed=false;refreshPopularRail()}catch{videoViewsFailed=true;refreshPopularRail()}}
function refreshPopularRail(){const rail=document.querySelector('#collection-popular');if(rail){rail.innerHTML=discoveryItems('popular').slice(0,6).map(productCard).join('')||`<p class='empty'>${t(videoViewsFailed?'viewsOffline':'viewsEmpty')}</p>`}if(activeCatalog==='popular'&&!document.querySelector('#videoFeed')?.open){const y=scrollY;render();window.scrollTo(0,y)}}

const viewPlayback=new WeakMap(),submittedViews=new Set();
document.addEventListener('timeupdate',async e=>{
 const v=e.target;if(v.tagName!=='VIDEO')return;
 const id=v.dataset.feedVideo||v.dataset.preview||(v.id==='player'?activeId:null);if(!id||submittedViews.has(id))return;
 let s=viewPlayback.get(v);if(!s){s={last:v.currentTime,wall:performance.now(),watched:0,pending:false};viewPlayback.set(v,s)}
 const now=performance.now(),delta=v.currentTime-s.last,elapsed=(now-s.wall)/1000;s.last=v.currentTime;s.wall=now;
 const r=v.getBoundingClientRect(),visible=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,70))*Math.max(0,Math.min(r.right,innerWidth)-Math.max(r.left,0));
 if(v.paused||v.seeking||document.hidden||document.querySelector('#sheet')?.open||visible<r.width*r.height*.6||delta<=0||delta>1||elapsed>1.5)return;
 s.watched+=Math.min(delta,elapsed);if(s.watched<3||s.pending)return;s.pending=true;
 try{if(!videoViewsReady)await loadVideoViews();if(!videoViewsReady)throw Error();const response=await fetch('/api/video-views',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({product:id})});if(!response.ok)throw Error();const data=await response.json();globalVideoViews[id]=data.count;submittedViews.add(id);refreshPopularRail()}catch{s.watched=0}finally{s.pending=false}
},true);
Object.assign(dict.en,{mostViewedSub:'Most watched across Phsar',popularCatalogNote:'Ranked by video views from all visitors.',viewsEmpty:'No qualifying video views yet.',viewsOffline:'Video rankings are temporarily unavailable.'});
Object.assign(dict.zh,{mostViewedSub:'Phsar 全站热门视频',popularCatalogNote:'按所有访客的视频观看次数排序。',viewsEmpty:'暂无符合条件的视频观看记录。',viewsOffline:'暂时无法加载视频排行榜。'});
Object.assign(dict.km,{mostViewedSub:'វីដេអូដែលបានមើលច្រើននៅ Phsar',popularCatalogNote:'តម្រៀបតាមការមើលវីដេអូរបស់អ្នកប្រើប្រាស់ទាំងអស់។',viewsEmpty:'មិនទាន់មានការមើលវីដេអូទេ។',viewsOffline:'មិនអាចផ្ទុកចំណាត់ថ្នាក់វីដេអូបានទេ។'});
loadVideoViews();window.addEventListener('focus',loadVideoViews);
