const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync(require('path').join(__dirname,'../js/tenant-store.js'),'utf8');
const functions=source.slice(source.indexOf('function requestConversationDeletion('),source.indexOf("$('#sheet').addEventListener('close',()=>{pendingConversationDelete=null})"));
function setup(following,storeId){
 const messages={[storeId]:[{text:'Test message'}],other:[{text:'Keep this'}]};
 const storage=new Map([['phsar-tenant-messages-v1',JSON.stringify(messages)],['phsar-followed-tenants-v1',JSON.stringify(following?[storeId]:[])]]);
 const sheet={open:false},error={textContent:''},badge={textContent:'1'},focus={focus(){}};
 const ctx={tenantById:id=>['phsar-select','grace-beauty','urban-finds'].includes(id)?{id,name:id}:null,tenantThreads:JSON.parse(JSON.stringify(messages)),pendingConversationDelete:null,sheetKind:'conversations',followedTenants:new Set(following?[storeId]:[]),failWrite:false,storage,JSON,Error,
  t:x=>x,icon:()=>'',esc:x=>x,$:s=>s==='#sheet'?sheet:s==='#conversationDeleteError'?error:focus,
  document:{querySelectorAll:()=>[badge]},toast(){},conversationList(){return ctx.tenantThreads[storeId]?[{}]:[]},
  localStorage:{getItem:k=>storage.get(k)||null,setItem(k,v){if(ctx.failWrite)throw Error('Storage full');storage.set(k,v)}},
  openSheet(kind){ctx.sheetKind=kind;sheet.open=true},showConversations(){ctx.pendingConversationDelete=null;ctx.sheetKind='conversations'}
 };vm.createContext(ctx);vm.runInContext(functions,ctx);return {ctx,storage,sheet,error,badge};
}
for(const storeId of ['phsar-select','grace-beauty','urban-finds'])for(const followed of [true,false]){
 const {ctx,storage,badge}=setup(followed,storeId);const initial=storage.get('phsar-tenant-messages-v1'),followData=storage.get('phsar-followed-tenants-v1');
 ctx.confirmConversationDeletion(storeId);assert.equal(storage.get('phsar-tenant-messages-v1'),initial);
 ctx.requestConversationDeletion(storeId);assert.equal(storage.get('phsar-tenant-messages-v1'),initial);
 ctx.showConversations();ctx.confirmConversationDeletion(storeId);assert.equal(storage.get('phsar-tenant-messages-v1'),initial);
 ctx.requestConversationDeletion(storeId);ctx.failWrite=true;ctx.confirmConversationDeletion(storeId);assert.ok(ctx.tenantThreads[storeId]);assert.equal(storage.get('phsar-tenant-messages-v1'),initial);
 ctx.failWrite=false;ctx.confirmConversationDeletion(storeId);assert.equal(ctx.tenantThreads[storeId],undefined);assert.equal(JSON.parse(storage.get('phsar-tenant-messages-v1'))[storeId],undefined);assert.equal(JSON.parse(storage.get('phsar-tenant-messages-v1')).other[0].text,'Keep this');assert.equal(badge.textContent,0);
 assert.equal(storage.get('phsar-followed-tenants-v1'),followData);assert.equal(ctx.followedTenants.has(storeId),followed);
}
console.log('PASS: confirmation required; cancel preserves messages; failed storage preserves history; confirmed deletion persists; unrelated thread and Follow true/false remain unchanged.');
