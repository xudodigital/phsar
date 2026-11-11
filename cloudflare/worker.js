import manifest from './model-manifest.json';
import productIds from './deploy-products.json';
const products=new Set(productIds);
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...headers}});
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(url.pathname==='/assets/models/clip-vit-base-patch32/onnx/model_quantized.onnx'){
  if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405});
  const headers={'Content-Type':'application/octet-stream','Content-Length':String(manifest.size),'Cache-Control':'public,max-age=86400'};
  if(request.method==='HEAD')return new Response(null,{headers});
  let index=0,reader;
  return new Response(new ReadableStream({async pull(controller){try{
   while(true){if(!reader){if(index>=manifest.chunks.length){controller.close();return}const part=await env.ASSETS.fetch(new URL(manifest.chunks[index++],url));if(!part.ok||!part.body)throw Error('Model unavailable');reader=part.body.getReader()}
    const next=await reader.read();if(next.done){reader.releaseLock();reader=null;continue}controller.enqueue(next.value);return}
  }catch(error){controller.error(error)}},cancel(){return reader?.cancel()}}),{headers});
 }
 if(url.pathname!=='/api/video-views')return url.pathname.startsWith('/api/')?json({error:'Not found'},404):env.ASSETS.fetch(request);
 if(!env.DB)return json({error:'Video counts are not configured'},503);
 if(!['GET','POST'].includes(request.method))return json({error:'Method not allowed'},405);
 const old=(request.headers.get('Cookie')||'').match(/(?:^|;\s*)phsar_viewer=([\w-]+)/)?.[1];
 const visitor=/^[a-f0-9-]{36}$/.test(old||'')?old:crypto.randomUUID();
 const cookie=old===visitor?{}:{'Set-Cookie':`phsar_viewer=${visitor}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=31536000`};
 if(request.method==='GET'){const rows=await env.DB.prepare('SELECT product,COUNT(*) AS count FROM views GROUP BY product').all();return json({counts:Object.fromEntries(rows.results.map(x=>[x.product,x.count]))},200,cookie)}
 if(request.headers.get('Sec-Fetch-Site')==='cross-site'||(request.headers.get('Origin')&&request.headers.get('Origin')!==url.origin))return json({error:'Forbidden'},403);
 if(Number(request.headers.get('Content-Length')||0)>512)return json({error:'Invalid product'},400);
 let product;try{const body=await request.text();if(body.length>512)throw Error();product=JSON.parse(body).product;if(!products.has(product))throw Error()}catch{return json({error:'Invalid product'},400)}
 const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(visitor)))].map(n=>n.toString(16).padStart(2,'0')).join('');
 const day=new Date().toISOString().slice(0,10);
 const results=await env.DB.batch([env.DB.prepare('INSERT OR IGNORE INTO views(product,visitor,day) VALUES(?,?,?)').bind(product,hash,day),env.DB.prepare('SELECT COUNT(*) AS count FROM views WHERE product=?').bind(product)]);
 return json({product,count:results[1].results[0].count,counted:results[0].meta.changes>0},200,cookie);
}};
