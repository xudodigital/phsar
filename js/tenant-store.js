// Store data is derived from catalog ownership; no invented ratings or sales counts.
const tenants=[
 {id:'phsar-select',name:'TukTuk Store',about:{en:'Practical appliances and everyday essentials for your kitchen and home.',zh:'为厨房和家庭精选实用电器与日常用品。',km:'ឧបករណ៍ប្រើប្រាស់ និងសម្ភារៈប្រចាំថ្ងៃសម្រាប់ផ្ទះបាយ និងផ្ទះរបស់អ្នក។'}},
 {id:'grace-beauty',name:'Grace Beauty Shop',about:{en:'Discover skincare, makeup and beauty tools for your daily routine.',zh:'探索护肤、彩妆与日常美容工具。',km:'ស្វែងរកផលិតផលថែរក្សាស្បែក គ្រឿងសម្អាង និងឧបករណ៍សម្រស់សម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃ។'}},
 {id:'urban-finds',name:'Urban Finds',about:{en:'Electronics, fashion and accessories for everyday life.',zh:'发现日常生活所需的电子产品、服饰与配饰。',km:'ផលិតផលអេឡិចត្រូនិក សម្លៀកបំពាក់ និងគ្រឿងតុបតែងសម្រាប់ជីវិតប្រចាំថ្ងៃ។'}}
];
function tenantById(id){return tenants.find(store=>store.id===id)}
function productTenant(p){return tenantById(p.tenantId)}
let tenantFilter='',tenantScroll=0;
const storedTenantFollows=readStore('phsar-followed-tenants-v1',[]);
const followedTenants=new Set(Array.isArray(storedTenantFollows)?storedTenantFollows.filter(id=>tenantById(id)):[]);
// One-time translation of the known legacy QA messages, preserving user messages and metadata.
function migrateTestChatMessages(threads){
 const marker='phsar-test-chat-english-v1';
 const translations={
  'Uji percakapan toko Phsar Select.':'Test conversation with TukTuk Store.',
  'Uji pertanyaan tentang Skincare oil.':'Test question about Skincare oil.',
  'Apakah Skincare oil masih tersedia?':'Is Skincare oil still available?'
 };
 try{
  if(localStorage.getItem(marker))return threads;
  let changed=false;const updated={...threads};
  for(const [id,messages] of Object.entries(updated)){
   if(!Array.isArray(messages))continue;
   updated[id]=messages.map(message=>{const text=message&&translations[message.text];if(!text)return message;changed=true;return {...message,text}});
  }
  if(changed)localStorage.setItem('phsar-tenant-messages-v1',JSON.stringify(updated));
  localStorage.setItem(marker,'1');
  return updated;
 }catch{return threads}
}
// Move only the identified legacy Skincare oil test messages to their product owner.
function migrateSkincareChat(threads){
 const marker='phsar-skincare-chat-owner-v1',owner=item('serum')?.tenantId;
 try{
  if(localStorage.getItem(marker)||!owner||!tenantById(owner))return threads;
  const source=threads['phsar-select'];
  if(!Array.isArray(source)){localStorage.setItem(marker,'1');return threads}
  const isSkincare=m=>m&&(m.productId==='serum'||['Test question about Skincare oil.','Is Skincare oil still available?'].includes(m.text));
  const moved=source.filter(isSkincare).map(m=>({...m,productId:'serum'}));
  if(!moved.length){localStorage.setItem(marker,'1');return threads}
  const updated={...threads,'phsar-select':source.filter(m=>!isSkincare(m)),[owner]:[...(Array.isArray(threads[owner])?threads[owner]:[]),...moved]};
  localStorage.setItem('phsar-tenant-messages-v1',JSON.stringify(updated));
  localStorage.setItem(marker,'1');return updated;
 }catch{return threads}
}
const storedTenantThreads=migrateSkincareChat(migrateTestChatMessages(readStore('phsar-tenant-messages-v1',{})));
const tenantThreads={};
for(const store of tenants){const list=storedTenantThreads?.[store.id];if(Array.isArray(list))tenantThreads[store.id]=list.map(normalizeChatMessage).filter(Boolean)}
function isSellerFollowed(id){return followedTenants.has(id)}
function followButtonContent(id){return `${icon(isSellerFollowed(id)?'check':'plus')}<span>${t(isSellerFollowed(id)?'following':'follow')}</span>`}
function syncTenantFollowButtons(){
 document.querySelectorAll('[data-feed-follow],[data-store-follow]').forEach(b=>{
  const id=b.dataset.storeFollow||item(b.dataset.feedFollow)?.tenantId,following=isSellerFollowed(id);
  b.setAttribute('aria-pressed',String(following));
  if(b.classList.contains('feed-follow-toggle')){b.innerHTML=icon(following?'check':'plus');b.setAttribute('aria-label',t(following?'following':'follow'))}
  else if(b.hasAttribute('data-store-follow'))b.innerHTML=followButtonContent(id);
  else b.textContent=t(following?'following':'follow');
 });
 document.querySelectorAll('[data-followed-store-count]').forEach(el=>el.textContent=followedStoreList().length);
 if($('#sheet').open&&sheetKind==='followedStores'){const focusWasFollow=document.activeElement?.hasAttribute('data-store-follow');$('#sheetContent').innerHTML=followedStoresContent();if(focusWasFollow)$('#sheetContent [data-action=profile]').focus({preventScroll:true})}
}
function toggleTenantFollow(id){if(!tenantById(id))return;if(followedTenants.has(id))followedTenants.delete(id);else followedTenants.add(id);localStorage.setItem('phsar-followed-tenants-v1',JSON.stringify([...followedTenants]));syncTenantFollowButtons()}
function showTenantChat(id,productId=null,returnTo=null){
 if(item(productId))id=item(productId).tenantId;
 const tenant=tenantById(id);
 if(!tenantById(id))return;
 const product=item(productId),list=tenantThreads[id]||[],backTo=['followedStores','conversations'].includes(returnTo)?returnTo:null;
 openSheet('chat',tenant.name,`<div class='sheet-content tenant-chat'>${backTo?`<button class='text-button order-back' data-action='${backTo}'>${icon('back')}${t(backTo)}</button>`:''}<p class='sheet-note'>${t('chatNotice')}</p>${product?`<button class='chat-product-context' data-product='${product.id}'>${thumbnail(product)}<span><strong>${name(product)}</strong><small>${money(product.price)}${rielPrice(product.price)}</small></span>${icon('chevron')}</button>`:''}${chatToolsMarkup()}<div class='tenant-messages' role='log' aria-label='${t('messages')}' aria-live='polite'>${list.map(chatMessageMarkup).join('')}</div><form id='chatForm' data-tenant='${id}' data-chat-product='${product?.id||''}' data-chat-return='${backTo||''}'><textarea class='sheet-input' id='messageInput' rows='3' maxlength='1000' required aria-label='${t('messages')}' placeholder='${esc(t('question'))}'></textarea><button class='primary-button full' type='submit'>${icon('comment')}${t('send')}</button>${voiceComposerMarkup()}</form></div>`);
 hydrateChatAudio();
}
function submitTenantMessage(form){if(typeof voiceDraft!=='undefined'&&voiceDraft)return;const id=item(form.dataset.chatProduct)?.tenantId||form.dataset.tenant,text=$('#messageInput').value.trim();if(!tenantById(id)||!text)return;const productId=item(form.dataset.chatProduct)?.id||null,next=[...(tenantThreads[id]||[]),{text,productId}];try{localStorage.setItem('phsar-tenant-messages-v1',JSON.stringify({...tenantThreads,[id]:next}))}catch{voiceStatus('voiceSaveError');return}tenantThreads[id]=next;const source=$('#chatSourceLanguage')?.value,target=$('#chatTargetLanguage')?.value;showTenantChat(id,productId,form.dataset.chatReturn);if(source)$('#chatSourceLanguage').value=source;if(target)$('#chatTargetLanguage').value=target;$('.tenant-messages').scrollTop=$('.tenant-messages').scrollHeight}
window.addEventListener('storage',e=>{if(e.key!=='phsar-followed-tenants-v1')return;const list=readStore(e.key,[]);followedTenants.clear();if(Array.isArray(list))list.filter(id=>tenantById(id)).forEach(id=>followedTenants.add(id));syncTenantFollowButtons()});

const tenantText={
 en:{visitStore:'Visit store',backToStore:'Back to store',storeProfile:'Store profile',storeAbout:'Discover everyday finds in beauty, electronics, fashion and home. Watch each product in action before you choose.',storeProducts:'Shop products',storeCount:'products',storeCategories:'categories',storeVideoNote:'Product videos',storeVideoDescription:'Tap any product to watch its video and see the details.',storeMarket:'On Phsar · Cambodia'},
 km:{visitStore:'មើលហាង',backToStore:'ត្រឡប់ទៅហាង',storeProfile:'ប្រវត្តិរូបហាង',storeAbout:'ស្វែងរកទំនិញប្រចាំថ្ងៃ ផលិតផលសម្រស់ អេឡិចត្រូនិក ម៉ូដ និងសម្ភារៈផ្ទះ។ មើលវីដេអូផលិតផលមុនពេលជ្រើសរើស។',storeProducts:'ទំនិញក្នុងហាង',storeCount:'ផលិតផល',storeCategories:'ប្រភេទ',storeVideoNote:'វីដេអូផលិតផល',storeVideoDescription:'ចុចលើផលិតផលដើម្បីមើលវីដេអូ និងព័ត៌មានលម្អិត។',storeMarket:'នៅលើ Phsar · កម្ពុជា'},
 zh:{visitStore:'进入店铺',backToStore:'返回店铺',storeProfile:'店铺简介',storeAbout:'发现美妆、电子、时尚与家居日常好物。选购前，先看商品的实际展示视频。',storeProducts:'店铺商品',storeCount:'件商品',storeCategories:'个分类',storeVideoNote:'商品视频',storeVideoDescription:'点击商品观看视频并查看详情。',storeMarket:'Phsar 店铺 · 柬埔寨'}
};
Object.keys(tenantText).forEach(l=>Object.assign(dict[l],tenantText[l]));
function tenantProducts(){return items.filter(p=>p.tenantId===activeStore)}
function tenantCatalog(){const list=tenantProducts().filter(p=>!tenantFilter||p.cat===tenantFilter);return `<p class='store-result-count' role='status'>${list.length} ${t('storeCount')}</p><div class='product-grid store-product-grid'>${list.map(productCard).join('')||`<p class='empty'>${t('empty')}</p>`}</div>`}
function renderTenantStore(){const tenant=tenantById(activeStore);const list=tenantProducts(),storeCategories=categories.filter(([id])=>!id||list.some(p=>p.cat===id));return `<div class='app store-page'>${header()}<main><div class='detail-breadcrumb'><button data-action='storeBack'>${icon('back')}${t(history.state?.storeReturn?'returnOrigin':'back')}</button><span>${t('storeProfile')}</span></div><section class='store-profile' aria-labelledby='storeName'><div class='store-identity'><span class='store-avatar'>${icon('store')}</span><div><p class='store-eyebrow'>${t('storeMarket')}</p><h1 id='storeName'>${tenant.name}</h1></div></div><p class='store-about'>${esc(tenant.about[lang]||tenant.about.en)}</p><div class='store-stats'><span><strong>${list.length}</strong> ${t('storeCount')}</span><span><strong>${storeCategories.length-1}</strong> ${t('storeCategories')}</span></div><div class='store-actions'><button class='primary-button store-follow' data-store-follow='${tenant.id}' aria-pressed='${isSellerFollowed(tenant.id)}'>${followButtonContent(tenant.id)}</button><button class='store-chat' data-store-chat='${tenant.id}'>${icon('comment')}<span>${t('chatShort')}</span></button></div></section><section class='store-video-note'>${icon('video')}<div><strong>${t('storeVideoNote')}</strong><p>${t('storeVideoDescription')}</p></div></section><section class='store-catalog' aria-labelledby='storeProductsTitle'><h2 id='storeProductsTitle'>${t('storeProducts')}</h2><div class='categories store-categories' aria-label='${t('categories')}'>${storeCategories.map(([id,k,i])=>`<button class='category ${tenantFilter===id?'active':''}' data-store-category='${id}' aria-pressed='${tenantFilter===id}'>${icon(i)}${t(k)}</button>`).join('')}</div><div id='storeResults'>${tenantCatalog()}</div></section></main>${nav()}</div>`}
function openTenantStore(id,restore=false){if(!tenantById(id))return;const returningToStore=restore;const origin=captureStoreOrigin();if(!returningToStore)history.replaceState({...history.state,storeOriginView:origin},'',location.href);if($('#videoFeed')?.open)closeVideoFeed(false);$('#sheet').close();if(!activeId&&!activeStore&&!activeCatalog){homeScroll=window.scrollY;feedScroll=$('#videoSlider')?.scrollLeft||0}if(!restore){tenantFilter='';tenantScroll=0}activeId=null;activeCatalog=null;activeStore=id;history.pushState({storeReturn:!returningToStore},'',location.pathname+'#store/'+id);render();window.scrollTo(0,restore?tenantScroll:0)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-store-category]');if(!b)return;tenantFilter=b.dataset.storeCategory;document.querySelectorAll('[data-store-category]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});$('#storeResults').innerHTML=tenantCatalog()});

document.addEventListener('click',e=>{const b=e.target.closest('[data-store-follow],[data-store-chat]');if(!b)return;if(b.dataset.storeFollow)toggleTenantFollow(b.dataset.storeFollow);else showTenantChat(b.dataset.storeChat)});

const followedStoreText={
 en:{followedStores:'Following stores',noFollowedStores:'No followed stores yet',noFollowedStoresNote:'Follow a store from its page or a product video. Find it here to shop again or continue your chat.',followedStoresNote:'Your followed stores, ready whenever you want to shop or chat.',exploreStores:'Explore products'},
 km:{followedStores:'ហាងដែលកំពុងតាមដាន',noFollowedStores:'មិនទាន់មានហាងដែលតាមដាន',noFollowedStoresNote:'តាមដានហាងពីទំព័រហាង ឬវីដេអូផលិតផល។ ស្វែងរកហាងនៅទីនេះ ដើម្បីទិញទំនិញ ឬបន្តការជជែក។',followedStoresNote:'ហាងដែលអ្នកតាមដាន សម្រាប់ទិញទំនិញ ឬជជែក។',exploreStores:'ស្វែងរកផលិតផល'},
 zh:{followedStores:'关注的店铺',noFollowedStores:'还没有关注店铺',noFollowedStoresNote:'在店铺页面或商品视频中关注店铺，即可在这里再次购物或继续聊天。',followedStoresNote:'随时访问已关注的店铺，购物或继续聊天。',exploreStores:'发现商品'}
};
Object.keys(followedStoreText).forEach(l=>Object.assign(dict[l],followedStoreText[l]));
function followedStoreList(){return tenants.filter(store=>isSellerFollowed(store.id))}
function followedStoresContent(){const list=followedStoreList();return `<div class='sheet-content followed-stores'><button class='text-button order-back' data-action='profile'>${icon('back')}${t('backProfile')}</button>${list.length?`<p class='sheet-note'>${t('followedStoresNote')}</p><div class='followed-store-list'>${list.map(store=>`<article class='followed-store-card'><div class='followed-store-heading'><span class='store-avatar'>${icon('store')}</span><div><button class='followed-store-name store-link' data-store='${store.id}'>${esc(store.name)}${icon('chevron')}</button><p>${items.filter(p=>p.tenantId===store.id).length} ${t('storeCount')}</p></div></div><button class='followed-store-status' data-store-follow='${store.id}' aria-pressed='true'>${followButtonContent(store.id)}</button><div class='followed-store-actions'><button class='primary-button' data-store='${store.id}'>${icon('store')}${t('visitStore')}</button><button class='store-chat' data-followed-chat='${store.id}'>${icon('comment')}${t('chatShort')}</button></div></article>`).join('')}</div>`:`<div class='followed-stores-empty'>${icon('store')}<h3>${t('noFollowedStores')}</h3><p>${t('noFollowedStoresNote')}</p><button class='primary-button full' data-action='exploreStores'>${t('exploreStores')}</button></div>`}</div>`}
function showFollowedStores(){openSheet('followedStores',t('followedStores'),followedStoresContent())}
Object.assign(actions,{followedStores:showFollowedStores,exploreStores:()=>{$('#sheet').close();goHome()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-followed-chat]');if(b)showTenantChat(b.dataset.followedChat,null,'followedStores')});

const conversationText={
 en:{conversations:'Chats',conversationNote:'Continue your conversations, including stores you no longer follow.',noConversations:'No conversations yet',noConversationsNote:'Start a chat from a store or product. Your conversations will appear here.'},
 km:{conversations:'ការជជែក',conversationNote:'បន្តការសន្ទនារបស់អ្នក រួមទាំងហាងដែលអ្នកលែងតាមដាន។',noConversations:'មិនទាន់មានការសន្ទនា',noConversationsNote:'ចាប់ផ្តើមជជែកពីហាង ឬផលិតផល។ ការសន្ទនារបស់អ្នកនឹងបង្ហាញនៅទីនេះ។'},
 zh:{conversations:'聊天',conversationNote:'继续与店铺聊天，取消关注后仍可查看会话。',noConversations:'暂无会话',noConversationsNote:'从店铺或商品页面开始聊天，会话将在这里显示。'}
};
Object.keys(conversationText).forEach(l=>Object.assign(dict[l],conversationText[l]));
// Conversations depend on message history, never on the follow list.
function conversationList(){return tenants.filter(store=>tenantThreads[store.id]?.length).map(store=>({store,last:tenantThreads[store.id][tenantThreads[store.id].length-1]}))}
function conversationsContent(){const list=conversationList();return `<div class='sheet-content conversations'><button class='text-button order-back' data-action='profile'>${icon('back')}${t('backProfile')}</button>${supportEntry()}${list.length?`<p class='sheet-note'>${t('conversationNote')}</p><div class='conversation-list'>${list.map(({store,last})=>`<article class='conversation-item'><button class='conversation-row' data-conversation='${store.id}'><span class='store-avatar'>${icon('store')}</span><span class='conversation-copy'><strong>${esc(store.name)}</strong><span class='conversation-preview'>${t('you')}: ${last.type==='voice'?t('voiceNote')+' · '+voiceTime(last.duration):esc(last.text)}</span></span>${icon('chevron')}</button><button class='conversation-delete' data-delete-conversation='${store.id}' aria-label='${t('deleteConversation')}: ${esc(store.name)}'>${icon('trash')}<span>${t('deleteConversation')}</span></button></article>`).join('')}</div>`:`<div class='followed-stores-empty'>${icon('comment')}<h3>${t('noConversations')}</h3><p>${t('noConversationsNote')}</p><button class='primary-button full' data-action='exploreStores'>${t('exploreStores')}</button></div>`}</div>`}
function showConversations(){pendingConversationDelete=null;openSheet('conversations',t('conversations'),conversationsContent())}
actions.conversations=showConversations;
document.addEventListener('click',e=>{const b=e.target.closest('[data-conversation]');if(b)showTenantChat(b.dataset.conversation,null,'conversations')});

const conversationDeleteText={
 en:{deleteConversation:'Delete conversation',deleteConversationTitle:'Delete this conversation?',deleteConversationNote:'All messages with this store will be removed from this device. This cannot be undone. Your Follow status will stay the same.',keepConversation:'Keep conversation',conversationDeleted:'Conversation deleted',conversationDeleteError:'Could not delete the conversation. Your messages are unchanged. Please try again.'},
 km:{deleteConversation:'លុបការសន្ទនា',deleteConversationTitle:'លុបការសន្ទនានេះ?',deleteConversationNote:'សារទាំងអស់ជាមួយហាងនេះនឹងត្រូវលុបចេញពីឧបករណ៍នេះ។ មិនអាចត្រឡប់វិញបានទេ។ ស្ថានភាពតាមដានរបស់អ្នកនឹងនៅដដែល។',keepConversation:'រក្សាការសន្ទនា',conversationDeleted:'បានលុបការសន្ទនា',conversationDeleteError:'មិនអាចលុបការសន្ទនាបានទេ។ សាររបស់អ្នកនៅដដែល។ សូមព្យាយាមម្តងទៀត។'},
 zh:{deleteConversation:'删除会话',deleteConversationTitle:'删除此会话？',deleteConversationNote:'与该店铺的全部消息将从此设备移除，且无法撤销。关注状态不会改变。',keepConversation:'保留会话',conversationDeleted:'会话已删除',conversationDeleteError:'无法删除会话，消息未改变，请重试。'}
};
Object.keys(conversationDeleteText).forEach(l=>Object.assign(dict[l],conversationDeleteText[l]));
let pendingConversationDelete=null;
function requestConversationDeletion(id){
 const tenant=tenantById(id);
 if(!tenantById(id)||!tenantThreads[id]?.length)return;
 openSheet('deleteConversation',t('deleteConversationTitle'),`<div class='sheet-content delete-conversation-confirmation'><div class='delete-conversation-store'><span class='store-avatar'>${icon('store')}</span><strong>${esc(tenant.name)}</strong></div><p class='sheet-note'>${t('deleteConversationNote')}</p><p id='conversationDeleteError' class='cancel-error' role='alert'></p><button class='primary-button full' data-action='conversations'>${t('keepConversation')}</button><button class='cancel-order-button full' data-confirm-delete-conversation='${id}'>${icon('trash')}${t('deleteConversation')}</button></div>`);
 pendingConversationDelete=id;
 $('#sheetContent [data-action="conversations"]').focus({preventScroll:true});
}
function confirmConversationDeletion(id){
 if(!tenantById(id)||pendingConversationDelete!==id||sheetKind!=='deleteConversation'||!$('#sheet').open)return;
 // Commit only the message history. Follow storage and state are never changed here.
 try{
  const persisted=JSON.parse(localStorage.getItem('phsar-tenant-messages-v1')||'{}');
  if(!persisted||typeof persisted!=='object'||Array.isArray(persisted))throw new Error('Invalid chat history');
  delete persisted[id];
  localStorage.setItem('phsar-tenant-messages-v1',JSON.stringify(persisted));
 }catch{const error=$('#conversationDeleteError');if(error)error.textContent=t('conversationDeleteError');return}
 (tenantThreads[id]||[]).filter(m=>m.type==='voice').forEach(m=>voiceStorage('delete',m.voiceId).catch(()=>{}));
 delete tenantThreads[id];pendingConversationDelete=null;
 document.querySelectorAll('[data-conversation-count]').forEach(el=>el.textContent=conversationList().length);
 showConversations();toast(t('conversationDeleted'));
}
$('#sheet').addEventListener('close',()=>{pendingConversationDelete=null});
document.addEventListener('click',e=>{const b=e.target.closest('[data-delete-conversation],[data-confirm-delete-conversation]');if(!b)return;if(b.dataset.deleteConversation)requestConversationDeletion(b.dataset.deleteConversation);else confirmConversationDeletion(b.dataset.confirmDeleteConversation)});

// The origin history entry owns its scroll and playback snapshot, not Follow state.
function captureStoreOrigin(){
 const video=$('#videoFeed')?.open?$(`[data-feed-video='${feedCurrentId}']`):null;
 const player=$('#player');
 return {scroll:window.scrollY,feedScroll:$('#videoSlider')?.scrollLeft||0,
  feed:video?{id:feedCurrentId,time:video.currentTime,paused:video.paused}:null,
  detail:player?{id:activeId,time:player.currentTime,paused:player.paused}:null};
}
function restoreMediaPosition(video,snapshot){
 if(!video||!snapshot)return;
 const apply=()=>{if(!video.isConnected)return;video.currentTime=Math.min(snapshot.time||0,Number.isFinite(video.duration)?Math.max(0,video.duration-.01):snapshot.time||0);if(snapshot.paused)video.pause();else mediaPlayback.play(video).catch(()=>{})};
 if(video.readyState>=1)apply();else video.addEventListener('loadedmetadata',apply,{once:true});
}
function restoreStoreOrigin(){
 const origin=history.state?.storeOriginView;if(!origin)return;
 window.scrollTo(0,origin.scroll||0);
 if($('#videoSlider'))$('#videoSlider').scrollLeft=origin.feedScroll||0;
 if(origin.feed)openVideoFeed(origin.feed);
 else if(origin.detail&&origin.detail.id===activeId)restoreMediaPosition($('#player'),origin.detail);
}
Object.assign(dict.en,{returnOrigin:'Back'});Object.assign(dict.km,{returnOrigin:'ត្រឡប់ក្រោយ'});Object.assign(dict.zh,{returnOrigin:'返回'});
actions.storeBack=()=>history.state?.storeReturn?history.back():goHome();
