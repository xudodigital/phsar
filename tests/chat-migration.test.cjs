const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'../js/tenant-store.js'),'utf8');
const code=source.slice(source.indexOf('function migrateTestChatMessages('),source.indexOf('const storedTenantThreads='));
const data={'phsar-select':[{text:'Uji percakapan toko Phsar Select.'},{text:'Uji pertanyaan tentang Skincare oil.',productId:'serum',sentAt:123},{text:'Apakah Skincare oil masih tersedia?'}],'grace-beauty':[{text:'Please keep this message.',productId:'lipstick'}]};
const storage=new Map([['phsar-followed-tenants-v1','["urban-finds"]']]);
const ctx={localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)}};vm.createContext(ctx);vm.runInContext(code,ctx);
const result=ctx.migrateTestChatMessages(data);
assert.equal(result['phsar-select'][2].text,'Is Skincare oil still available?');
assert.equal(result['phsar-select'][1].productId,'serum');assert.equal(result['phsar-select'][1].sentAt,123);
assert.equal(result['grace-beauty'][0].text,'Please keep this message.');
assert.equal(storage.get('phsar-followed-tenants-v1'),'["urban-finds"]');
assert.equal(JSON.parse(storage.get('phsar-tenant-messages-v1'))['phsar-select'][0].text,'Test conversation with TukTuk Store.');
assert.equal(ctx.migrateTestChatMessages(data),data); // Marker prevents rewriting future user messages.
console.log('PASS: known test messages translated and persisted; metadata, unrelated messages and Follow preserved; migration runs only once.');
