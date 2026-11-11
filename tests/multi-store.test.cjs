const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'../js/tenant-store.js'),'utf8');
const ids=['phsar-select','grace-beauty','urban-finds'];
const names=['TukTuk Store','Grace Beauty Shop','Urban Finds'];
const storage=new Map();
function boot(){
 const elements=new Map();const element=s=>{if(!elements.has(s))elements.set(s,{open:false,value:'',scrollHeight:100,addEventListener(){},focus(){}});return elements.get(s)};
 const items=ids.map((tenantId,i)=>({id:'p'+i,tenantId,name:{en:'Product '+i},price:10}));
 const ctx={items,item:id=>items.find(p=>p.id===id),readStore:(k,f)=>JSON.parse(storage.get(k)||JSON.stringify(f)),dict:{en:{},zh:{},km:{}},actions:{},lang:'en',sheetKind:null,
 document:{querySelectorAll:()=>[],addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},$:element,
 t:k=>k,icon:()=>'',esc:s=>s,name:p=>p.name.en,thumbnail:()=>'',money:String,rielPrice:()=>'',
 openSheet(kind,title,html){ctx.sheetKind=kind;element('#sheet').open=true;ctx.lastSheet={title,html}},toast(){}};
 vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/chat-media.js'),'utf8'),ctx);vm.runInContext(source,ctx);return ctx;
}
let c=boot();
for(let i=0;i<ids.length;i++){
 c.toggleTenantFollow(ids[i]);assert.equal(c.followedStoreList().length,i+1);
 c.$('#messageInput').value='Availability question for '+names[i];
 c.submitTenantMessage({dataset:{tenant:ids[i],chatProduct:'p'+i}});
 assert.equal(c.lastSheet.title,names[i]);
 for(let j=0;j<=i;j++){c.showTenantChat(ids[j]);assert.ok(c.lastSheet.html.includes('Availability question for '+names[j]));for(let k=0;k<=i;k++)if(k!==j)assert.ok(!c.lastSheet.html.includes('Availability question for '+names[k]));}
}
c=boot();assert.equal(c.followedStoreList().length,3);assert.equal(c.conversationList().length,3);
c.toggleTenantFollow(ids[1]);assert.equal(c.isSellerFollowed(ids[1]),false);assert.equal(c.isSellerFollowed(ids[0]),true);assert.equal(c.isSellerFollowed(ids[2]),true);assert.equal(c.conversationList().length,3);
for(let i=0;i<3;i++){c.showTenantChat(ids[i]);assert.equal(c.lastSheet.title,names[i]);assert.ok(c.lastSheet.html.includes('Availability question for '+names[i]));}
console.log('PASS: three independent follows and product chats; matching store titles; persistence across reload; unfollow preserves all conversations and other follows.');
