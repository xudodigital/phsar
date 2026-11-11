let worker,requestId=0;
const pending=new Map();
function getWorker(){
 if(worker)return worker;
 worker=new Worker(new URL('./photo-search-worker.js',import.meta.url),{type:'module'});
 worker.onmessage=({data})=>{
  const request=pending.get(data.id);if(!request)return;
  if(data.status){request.onStatus(data.status);return}
  clearTimeout(request.timeout);pending.delete(data.id);
  if(data.error)request.reject(new Error(data.error));else request.resolve(data.result);
 };
 worker.onerror=event=>resetWorker(new Error(event.message||'Photo recognition could not start.'));
 return worker;
}
function resetWorker(error){worker?.terminate();worker=null;for(const request of pending.values()){clearTimeout(request.timeout);request.reject(error)}pending.clear()}
export async function recognizePhoto(image,onStatus=()=>{}){
 // Normalize only resolution and transparency, never filename or colour categories.
 const scale=Math.min(1,640/Math.max(image.naturalWidth,image.naturalHeight));
 const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
 const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
 const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
 const activeWorker=getWorker(),id=++requestId;
 return new Promise((resolve,reject)=>{
  const timeout=setTimeout(()=>resetWorker(new Error('Photo recognition timed out. Please retry.')),180000);
  pending.set(id,{resolve,reject,onStatus,timeout});
  activeWorker.postMessage({id,pixels:pixels.buffer,width:canvas.width,height:canvas.height},[pixels.buffer]);
 });
}
export function matchPhotoProducts(result,items){
 const knownTypes={airpods:'earbuds',headphones:'headphones',watch:'watch',serum:'skincare',coffee:'coffee',sneakers:'sneakers'};
 if(result.score<0.4||result.margin<0.12)return {products:[],status:'uncertain'};
 const exact=items.filter(p=>(p.photoType||knownTypes[p.id])===result.kind);
 if(exact.length)return {products:exact,status:'matched'};
 if(result.kind==='earbuds')return {products:items.filter(p=>knownTypes[p.id]==='headphones'),status:'relatedAudio'};
 return {products:[],status:'unavailable'};
}
