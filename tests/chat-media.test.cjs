const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const elements=new Map();const el=s=>{if(!elements.has(s))elements.set(s,{innerHTML:'',disabled:false,addEventListener(){}});return elements.get(s)};
const ctx={dict:{en:{},km:{},zh:{}},document:{addEventListener(){},querySelectorAll:()=>[]},window:{addEventListener(){}},$:el,item:id=>id==='serum'?{id}:null,TextEncoder,URL,clearTimeout,clearInterval};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/chat-media.js'),'utf8'),ctx);
for(const text of ['Hello world '.repeat(90),'សួស្តី '.repeat(150),'你好👋'.repeat(400)]){const chunks=ctx.translationChunks(text);assert.equal(chunks.join(''),text);assert.ok(chunks.every(c=>Buffer.byteLength(c)<=450));}
const voice=ctx.normalizeChatMessage({type:'voice',voiceId:'clip-1',duration:12,productId:'serum'});assert.equal(voice.type,'voice');assert.equal(voice.voiceId,'clip-1');assert.equal(voice.productId,'serum');assert.equal(ctx.normalizeChatMessage({type:'voice'}),null);
let stopped=0,tracksStopped=0;ctx.recorder={state:'recording',stop(){stopped++}};ctx.stream={getTracks:()=>[{stop(){tracksStopped++}}]};
vm.runInContext('voiceDraft={recorder,stream,chunks:[]}',ctx);ctx.cancelVoiceDraft();assert.equal(stopped,1);assert.equal(tracksStopped,1);assert.equal(vm.runInContext('voiceDraft',ctx),null);assert.equal(el('[data-voice-record]').disabled,false);
console.log('PASS: UTF-8 request byte bounds preserve all text; voice metadata survives normalization; cancel stops recording/tracks and releases composer.');
