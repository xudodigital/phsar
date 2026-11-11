import {pipeline,env,RawImage} from '../assets/vendor/transformers.min.js';
// Self-hosted, pinned model and runtime: inference never uploads the photo.
env.allowRemoteModels=false;
env.allowLocalModels=true;
env.localModelPath=new URL('../assets/models/',import.meta.url).href;
env.backends.onnx.wasm.wasmPaths=new URL('../assets/vendor/',import.meta.url).href;
env.backends.onnx.wasm.numThreads=1;
const types=[
 ['earbuds','in-ear earbuds, such as Apple AirPods'],
 ['headphones','over-ear headphones with a headband'],
 ['watch','a wristwatch'],
 ['skincare','a bottle of skincare serum or cosmetic oil'],
 ['coffee','an espresso coffee machine'],
 ['sneakers','sneakers or sports shoes'],
 ['phone','a smartphone'],['computer','a laptop computer'],
 ['camera','a photographic camera'],['bag','a handbag or backpack'],
 ['clothing','clothing or a shirt'],['food','food or a drink'],
 ['person','a person or a face'],['animal','an animal'],
 ['scene','a landscape or a building'],['other','an unrelated object']
];
let classifierPromise,queue=Promise.resolve();
async function classify({id,pixels,width,height}){
 try{
  if(!classifierPromise){
   self.postMessage({id,status:'loading'});
   classifierPromise=pipeline('zero-shot-image-classification','clip-vit-base-patch32',{device:'wasm',dtype:'q8'}).catch(error=>{classifierPromise=null;throw error});
  }
  const classifier=await classifierPromise;
  self.postMessage({id,status:'recognizing'});
  const result=await classifier(new RawImage(new Uint8ClampedArray(pixels),width,height,4),types.map(t=>t[1]));
  const ranked=result.map(r=>({kind:types.find(t=>t[1]===r.label)[0],score:r.score}));
  self.postMessage({id,result:{kind:ranked[0].kind,score:ranked[0].score,margin:ranked[0].score-ranked[1].score,ranked}});
 }catch(error){self.postMessage({id,error:String(error.message||error)})}
}
self.onmessage=({data})=>{queue=queue.then(()=>classify(data))};
