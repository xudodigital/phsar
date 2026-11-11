// Local prototype experience: fixed display rate, immersive video, demo login.
const experienceText={
 en:{rateNote:'Display rate: $1 = 4,000 ៛',deleteItem:'Delete item',checkoutAction:'Proceed to checkout',loginTitle:'Log in to continue',loginDemo:"Phsar account",loginNote:"Your profile is saved on this device. Online account verification is not connected.",displayName:'Your name',email:'Email',loginContinue:"Continue",logout:'Log out',signedIn:'Signed in as',orderSummary:'Order summary',subtotal:'Subtotal',shipping:'Delivery',address:'Delivery address',phone:'Phone number',payment:'Payment method',cod:'Cash on delivery',demoOrder:"Place order",orderNote:"Saved on this device. No payment is collected and no order is sent to a seller.",orderDone:"Order saved",orderDoneNote:"Find this order in your Profile. No payment was collected or order sent to a seller.",continue:'Continue',forYou:'For You',swipeUp:'Swipe up for the next product',follow:'Follow',following:'Following',mute:'Mute',unmute:'Sound on',seek:'Video progress',pause:'Pause',play:'Play',closeFeed:'Close video feed',feedCart:'View cart',loginProfile:'Log in',notNow:'Back to cart',each:'each'},
 zh:{rateNote:'显示汇率：1 美元 = 4,000 瑞尔',deleteItem:'删除商品',checkoutAction:'前往结算',loginTitle:'登录后继续',loginDemo:"Phsar 账户",loginNote:"个人资料保存在此设备上，尚未连接在线账户验证。",displayName:'姓名',email:'电子邮箱',loginContinue:"继续",logout:'退出登录',signedIn:'当前账户',orderSummary:'订单摘要',subtotal:'商品小计',shipping:'配送费',address:'收货地址',phone:'电话号码',payment:'付款方式',cod:'货到付款',demoOrder:"提交订单",orderNote:"订单保存在此设备上，不收取付款，也不会发送给卖家。",orderDone:"订单已保存",orderDoneNote:"可在个人中心查看此订单。未收款，也未发送给卖家。",continue:'继续',forYou:'推荐',swipeUp:'向上滑动查看下一件商品',follow:'关注',following:'已关注',mute:'静音',unmute:'开启声音',seek:'视频进度',pause:'暂停',play:'播放',closeFeed:'关闭视频流',feedCart:'查看购物车',loginProfile:'登录',notNow:'返回购物车',each:'每件'},
 km:{rateNote:'អត្រាបង្ហាញ៖ $1 = 4,000 រៀល',deleteItem:'លុបទំនិញ',checkoutAction:'បន្តទៅទូទាត់',loginTitle:'ចូលគណនីដើម្បីបន្ត',loginDemo:"គណនី Phsar",loginNote:"ព័ត៌មានគណនីរក្សាទុកក្នុងឧបករណ៍នេះ។ មិនទាន់ភ្ជាប់ការផ្ទៀងផ្ទាត់គណនីតាមអ៊ីនធឺណិតទេ។",displayName:'ឈ្មោះរបស់អ្នក',email:'អ៊ីមែល',loginContinue:"បន្ត",logout:'ចាកចេញពីគណនី',signedIn:'បានចូលជា',orderSummary:'សង្ខេបការបញ្ជាទិញ',subtotal:'សរុបទំនិញ',shipping:'ថ្លៃដឹកជញ្ជូន',address:'អាសយដ្ឋានដឹកជញ្ជូន',phone:'លេខទូរស័ព្ទ',payment:'វិធីទូទាត់',cod:'បង់ប្រាក់ពេលទទួលទំនិញ',demoOrder:"ដាក់ការបញ្ជាទិញ",orderNote:"រក្សាទុកក្នុងឧបករណ៍នេះ។ មិនគិតប្រាក់ និងមិនផ្ញើការបញ្ជាទិញទៅអ្នកលក់ទេ។",orderDone:"បានរក្សាទុកការបញ្ជាទិញ",orderDoneNote:"មើលការបញ្ជាទិញក្នុងគណនី។ មិនបានគិតប្រាក់ ឬផ្ញើទៅអ្នកលក់ទេ។",continue:'បន្ត',forYou:'សម្រាប់អ្នក',swipeUp:'អូសឡើងដើម្បីមើលទំនិញបន្ទាប់',follow:'តាមដាន',following:'កំពុងតាមដាន',mute:'បិទសំឡេង',unmute:'បើកសំឡេង',seek:'វឌ្ឍនភាពវីដេអូ',pause:'ផ្អាក',play:'ចាក់',closeFeed:'បិទវីដេអូ',feedCart:'មើលកន្ត្រក',loginProfile:'ចូលគណនី',notNow:'ត្រឡប់ទៅកន្ត្រក',each:'ក្នុងមួយ'}
};
const orderText={
 en:{orderHistory:'Order history',viewOrders:'View my orders',historyNote:"Your order history on this device.",historyLogin:"Log in with the same email to see your orders on this device.",noOrders:'No orders yet',noOrdersNote:"Your orders will appear here after checkout.",orderNumber:'Order',orderStatus:'Status',orderRecorded:"Order received",orderQuantity:'Quantity',backProfile:'Back to Profile',orderSaveError:'Could not save your order in this browser. Your cart is unchanged. Please try again.',historyLoadError:'Could not load order history. Please try again.',orderRate:'Order rate: $1 = 4,000 ៛'},
 zh:{orderHistory:'订单历史',viewOrders:'查看我的订单',historyNote:"此设备上的订单记录。",historyLogin:"使用相同邮箱登录以查看此设备上的订单。",noOrders:'暂无订单',noOrdersNote:"结算后，订单将显示在这里。",orderNumber:'订单',orderStatus:'状态',orderRecorded:"已接收订单",orderQuantity:'数量',backProfile:'返回我的',orderSaveError:'无法在此浏览器中保存订单，购物车保持不变，请重试。',historyLoadError:'无法加载订单历史，请重试。',orderRate:'订单汇率：1 美元 = 4,000 瑞尔'},
 km:{orderHistory:'ប្រវត្តិការបញ្ជាទិញ',viewOrders:'មើលការបញ្ជាទិញរបស់ខ្ញុំ',historyNote:"ប្រវត្តិការបញ្ជាទិញក្នុងឧបករណ៍នេះ។",historyLogin:"ចូលដោយអ៊ីមែលដដែល ដើម្បីមើលការបញ្ជាទិញក្នុងឧបករណ៍នេះ។",noOrders:'មិនទាន់មានការបញ្ជាទិញ',noOrdersNote:"ការបញ្ជាទិញនឹងបង្ហាញនៅទីនេះបន្ទាប់ពីទូទាត់។",orderNumber:'ការបញ្ជាទិញ',orderStatus:'ស្ថានភាព',orderRecorded:"បានទទួលការបញ្ជាទិញ",orderQuantity:'ចំនួន',backProfile:'ត្រឡប់ទៅគណនី',orderSaveError:'មិនអាចរក្សាទុកការបញ្ជាទិញក្នុងកម្មវិធីរុករកនេះបានទេ។ កន្ត្រករបស់អ្នកមិនបានផ្លាស់ប្តូរទេ។ សូមព្យាយាមម្តងទៀត។',historyLoadError:'មិនអាចផ្ទុកប្រវត្តិការបញ្ជាទិញបានទេ។ សូមព្យាយាមម្តងទៀត។',orderRate:'អត្រាការបញ្ជាទិញ៖ $1 = 4,000 រៀល'}
};
const orderDetailText={
 en:{orderDetails:'Order details',viewOrderDetails:'View details',backOrders:'Back to order history',deliveryDetails:'Delivery details',recipient:'Recipient',addressNotSaved:'Delivery details were not saved for this older order.',paymentDetails:'Payment details',paymentStatus:'Payment status',paymentUnpaid:"Unpaid",paymentUnknown:'Not recorded',orderProgress:'Order progress',stepPreparing:'Preparing your order',stepShipping:'On the way',stepDelivered:'Delivered',stepPending:'Not started',progressDemo:"These status controls update this device only. Seller dispatch and delivery are not connected.",orderNotFound:'This order is unavailable for the signed-in account.',deliverySaved:"Delivery details stay with this order on your device.",deliveryRequired:'Please enter a delivery address and phone number.'},
 zh:{orderDetails:'订单详情',viewOrderDetails:'查看详情',backOrders:'返回订单历史',deliveryDetails:'配送信息',recipient:'收件人',addressNotSaved:'此旧订单未保存配送信息。',paymentDetails:'付款信息',paymentStatus:'付款状态',paymentUnpaid:"未付款",paymentUnknown:'未记录',orderProgress:'订单进度',stepPreparing:'备货中',stepShipping:'运输中',stepDelivered:'已送达',stepPending:'尚未开始',progressDemo:"状态仅更新在此设备上，尚未连接卖家发货或配送服务。",orderNotFound:'当前账户无法查看此订单。',deliverySaved:"配送信息随订单保存在此设备上。",deliveryRequired:'请输入收货地址和电话号码。'},
 km:{orderDetails:'ព័ត៌មានលម្អិតការបញ្ជាទិញ',viewOrderDetails:'មើលព័ត៌មានលម្អិត',backOrders:'ត្រឡប់ទៅប្រវត្តិការបញ្ជាទិញ',deliveryDetails:'ព័ត៌មានដឹកជញ្ជូន',recipient:'អ្នកទទួល',addressNotSaved:'ព័ត៌មានដឹកជញ្ជូនមិនត្រូវបានរក្សាទុកសម្រាប់ការបញ្ជាទិញចាស់នេះទេ។',paymentDetails:'ព័ត៌មានទូទាត់',paymentStatus:'ស្ថានភាពទូទាត់',paymentUnpaid:"មិនទាន់បង់ប្រាក់",paymentUnknown:'មិនបានកត់ត្រា',orderProgress:'ដំណើរការបញ្ជាទិញ',stepPreparing:'កំពុងរៀបចំទំនិញ',stepShipping:'កំពុងដឹកជញ្ជូន',stepDelivered:'បានដឹកជញ្ជូនរួច',stepPending:'មិនទាន់ចាប់ផ្តើម',progressDemo:"ប៊ូតុងទាំងនេះផ្លាស់ប្តូរស្ថានភាពក្នុងឧបករណ៍នេះប៉ុណ្ណោះ។ មិនទាន់ភ្ជាប់ការផ្ញើទំនិញ និងការដឹកជញ្ជូនទេ។",orderNotFound:'ការបញ្ជាទិញនេះមិនមានសម្រាប់គណនីដែលបានចូលទេ។',deliverySaved:"ព័ត៌មានដឹកជញ្ជូនរក្សាទុកជាមួយការបញ្ជាទិញក្នុងឧបករណ៍នេះ។",deliveryRequired:'សូមបញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន និងលេខទូរស័ព្ទ។'}
};
const simulationText={
 en:{statusProcessing:"Processing",statusShipped:"Shipped",statusCompleted:"Completed",simulateStatus:"Update order status",simulateProcessing:"Mark as processing",simulateShipping:"Mark as shipped",simulateCompletion:"Mark as completed",simulationComplete:"All steps completed",progressDemo:"These status controls update this device only. Seller dispatch and delivery are not connected.",statusSaveError:'Could not save the status. Please try again.',statusChanged:'Order status updated',statusStale:'The status has already changed. Review the latest step.'},
 zh:{statusProcessing:"处理中",statusShipped:"已发货",statusCompleted:"已完成",simulateStatus:"更新订单状态",simulateProcessing:"标记为处理中",simulateShipping:"标记为已发货",simulateCompletion:"标记为已完成",simulationComplete:"所有步骤已完成",progressDemo:"状态仅更新在此设备上，尚未连接卖家发货或配送服务。",statusSaveError:'无法保存状态，请重试。',statusChanged:'订单状态已更新',statusStale:'状态已发生变化，请查看最新步骤。'},
 km:{statusProcessing:"កំពុងដំណើរការ",statusShipped:"បានផ្ញើទំនិញ",statusCompleted:"បានបញ្ចប់",simulateStatus:"កែប្រែស្ថានភាពបញ្ជាទិញ",simulateProcessing:"កំណត់ថាកំពុងដំណើរការ",simulateShipping:"កំណត់ថាបានផ្ញើទំនិញ",simulateCompletion:"កំណត់ថាបានបញ្ចប់",simulationComplete:"បានបញ្ចប់គ្រប់ជំហាន",progressDemo:"ប៊ូតុងទាំងនេះផ្លាស់ប្តូរស្ថានភាពក្នុងឧបករណ៍នេះប៉ុណ្ណោះ។ មិនទាន់ភ្ជាប់ការផ្ញើទំនិញ និងការដឹកជញ្ជូនទេ។",statusSaveError:'មិនអាចរក្សាទុកស្ថានភាពបានទេ។ សូមព្យាយាមម្តងទៀត។',statusChanged:'បានធ្វើបច្ចុប្បន្នភាពស្ថានភាពបញ្ជាទិញ',statusStale:'ស្ថានភាពបានផ្លាស់ប្តូររួចហើយ។ សូមពិនិត្យជំហានចុងក្រោយ។'}
};
const cancellationText={
 en:{statusCancelled:"Cancelled",cancelOrder:'Cancel order',cancelBeforeShipping:'Available only before shipment.',cancelTitle:'Cancel this order?',cancelQuestion:"The order will remain in your history as Cancelled.",confirmCancel:'Yes, cancel order',keepOrder:'Keep order',cancelledNote:'This order was cancelled. Processing and shipment have stopped. No payment was collected.',cancelUnavailable:'This order can no longer be cancelled.',cancelSaveError:'Could not save the cancellation. The order is unchanged. Please try again.',cancelledAt:'Cancelled on'},
 zh:{statusCancelled:"已取消",cancelOrder:'取消订单',cancelBeforeShipping:'仅可在发货前取消。',cancelTitle:'取消此订单？',cancelQuestion:"此订单将保留在历史记录中，状态为已取消。",confirmCancel:'确认取消订单',keepOrder:'保留订单',cancelledNote:'此订单已取消，处理和配送已停止，未收取任何付款。',cancelUnavailable:'此订单已无法取消。',cancelSaveError:'无法保存取消操作，订单未改变，请重试。',cancelledAt:'取消时间'},
 km:{statusCancelled:"បានបោះបង់",cancelOrder:'បោះបង់ការបញ្ជាទិញ',cancelBeforeShipping:'អាចបោះបង់បានតែមុនពេលផ្ញើទំនិញ។',cancelTitle:'បោះបង់ការបញ្ជាទិញនេះ?',cancelQuestion:"ការបញ្ជាទិញនឹងនៅក្នុងប្រវត្តិដោយមានស្ថានភាពបានបោះបង់។",confirmCancel:'យល់ព្រម បោះបង់ការបញ្ជាទិញ',keepOrder:'រក្សាការបញ្ជាទិញ',cancelledNote:'ការបញ្ជាទិញនេះត្រូវបានបោះបង់។ ដំណើរការ និងការដឹកជញ្ជូនបានបញ្ឈប់។ មិនបានគិតប្រាក់ទេ។',cancelUnavailable:'មិនអាចបោះបង់ការបញ្ជាទិញនេះបានទៀតទេ។',cancelSaveError:'មិនអាចរក្សាទុកការបោះបង់បានទេ។ ការបញ្ជាទិញមិនបានផ្លាស់ប្តូរទេ។ សូមព្យាយាមម្តងទៀត។',cancelledAt:'បានបោះបង់នៅ'}
};
Object.keys(cancellationText).forEach(l=>Object.assign(simulationText[l],cancellationText[l]));
Object.keys(simulationText).forEach(l=>Object.assign(orderDetailText[l],simulationText[l]));
Object.keys(orderDetailText).forEach(l=>Object.assign(orderText[l],orderDetailText[l]));
Object.keys(orderText).forEach(l=>Object.assign(experienceText[l],orderText[l]));
Object.keys(experienceText).forEach(l=>Object.assign(dict[l],experienceText[l]));
Object.keys(PHSAR_COPY).forEach(l=>Object.assign(dict[l],PHSAR_COPY[l]));
Object.assign(paths,{reels:'<path d="m5 5 2-2h10l2 2v14l-2 2H7l-2-2z"/><path d="m10 8 6 4-6 4z"/><path d="M2 8v8M22 8v8"/>',trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',volume:'<path d="M3 9h4l5-5v16l-5-5H3zM16 8a6 6 0 0 1 0 8M19 4a11 11 0 0 1 0 16"/>',muted:'<path d="M3 9h4l5-5v16l-5-5H3zM16 9l6 6M22 9l-6 6"/>'});
const RIEL_PER_USD=4000;
function rielPrice(value,rate=RIEL_PER_USD){const amount=Math.round(value*rate).toLocaleString('en-US');return `<small class='riel-price' lang='km'>${amount} ៛</small>`}
function dualPrice(value,rate=RIEL_PER_USD){return `<span class='dual-price'><strong>${money(value)}</strong>${rielPrice(value,rate)}</span>`}
let demoUser=null,pendingCheckout=false,pendingHistory=false;
try{const user=JSON.parse(sessionStorage.getItem('phsar-demo-user'));if(user&&typeof user.name==='string'&&typeof user.email==='string')demoUser=user}catch{}

// Snapshot purchase-time values so catalog edits cannot change old receipts.
const ORDER_STORAGE_KEY='phsar-demo-orders-v1';
const ORDER_STATES=['demo-recorded','demo-processing','demo-shipped','demo-completed'];
const ORDER_STATUS_LABELS=['orderRecorded','statusProcessing','statusShipped','statusCompleted'];
let displayedOrderId=null;
const orderStage=order=>Math.max(0,ORDER_STATES.indexOf(order.status));
const canCancelOrder=order=>['demo-recorded','demo-processing'].includes(order.status);
const orderStatusLabel=order=>t(order.status==='demo-cancelled'?'statusCancelled':order.payment?.method==='prepaid'&&order.payment.status!=='paid'?'awaitPayment':ORDER_STATUS_LABELS[orderStage(order)]);
function orderStatusBadge(order){return `<span class='order-status ${order.status==='demo-cancelled'?'stage-cancelled':`stage-${orderStage(order)}`}' aria-label='${t('orderStatus')}: ${orderStatusLabel(order)}'>${icon(order.status==='demo-cancelled'?'close':'check')}${orderStatusLabel(order)}</span>`}

const orderEmail=email=>email.trim().toLowerCase();
function readOrders(){
 const orders=JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)||'[]');
 if(!Array.isArray(orders))throw new Error('Invalid order history');
 return orders.filter(o=>o&&typeof o.id==='string'&&typeof o.email==='string'&&Number.isFinite(Date.parse(o.createdAt))&&(ORDER_STATES.includes(o.status)||o.status==='demo-cancelled')&&Number.isFinite(o.rate)&&o.rate>0&&Number.isFinite(o.total)&&o.total>=0&&Number.isFinite(o.subtotal)&&Number.isFinite(o.delivery)&&Array.isArray(o.lines)&&o.lines.length&&o.lines.every(p=>p&&typeof p.id==='string'&&p.name&&typeof p.name.en==='string'&&Number.isInteger(p.quantity)&&p.quantity>0&&Number.isFinite(p.price)&&p.price>=0));
}
function createOrder(checkout){
 const packages=checkoutPackages(checkout.get('zone')),lines=packages.flatMap(p=>p.lines),subtotal=packages.reduce((n,p)=>n+Math.round(p.subtotal*100),0),delivery=packages.reduce((n,p)=>n+Math.round(p.delivery*100),0);
 const field=k=>String(checkout.get(k)||'').trim();
 let location=null;try{const pin=JSON.parse(field('mapLocation')||'null');if(pin&&Number.isFinite(pin.lat)&&Math.abs(pin.lat)<=90&&Number.isFinite(pin.lng)&&Math.abs(pin.lng)<=180&&['address','province','district','zone'].every(k=>pin[k]===field(k))&&typeof pin.label==='string')location={lat:pin.lat,lng:pin.lng,label:pin.label,address:pin.address,province:pin.province,district:pin.district,zone:pin.zone,source:'sample',confirmedAt:pin.confirmedAt}}catch{}

 return {id:crypto.randomUUID(),email:orderEmail(demoUser.email),createdAt:new Date().toISOString(),status:'demo-recorded',shipping:{recipient:field('recipient'),address:field('address'),phone:field('phone'),province:field('province'),district:field('district'),zone:field('zone'),mapLink:location?'https://www.google.com/maps/search/?api=1&query='+location.lat+','+location.lng:field('mapLink'),location,note:field('deliveryNote')},payment:{method:'prepaid',status:'unpaid'},packages,rate:RIEL_PER_USD,lines,subtotal:subtotal/100,delivery:delivery/100,total:(subtotal+delivery)/100};
}
function recordOrder(order){const orders=readOrders();localStorage.setItem(ORDER_STORAGE_KEY,JSON.stringify([order,...orders]));}
function orderCard(order,detail=false){
 const date=new Date(order.createdAt).toLocaleString({en:'en-GB',km:'km-KH',zh:'zh-CN'}[lang],{dateStyle:'medium',timeStyle:'short'});
 return `<article class='order-card'><div class='order-card-heading'><div><h3>${t('orderNumber')} #${esc(order.id.slice(0,8).toUpperCase())}</h3><time datetime='${esc(order.createdAt)}'>${esc(date)}</time></div>${orderStatusBadge(order)}</div><div class='order-items'>${order.lines.map(p=>{const product=item(p.id);return `<div class='order-item'>${product?thumbnail(product,'order-thumbnail'):`<span class='order-thumbnail order-placeholder'>${icon('bag')}</span>`}<div class='order-item-copy'><h4>${esc(p.name[lang]||p.name.en)}</h4><p>${t('orderQuantity')}: ${p.quantity} · ${money(p.price)} ${t('each')}</p></div>${dualPrice(p.price*p.quantity,order.rate)}</div>`}).join('')}</div><div class='order-totals'><div><span>${t('subtotal')}</span>${dualPrice(order.subtotal,order.rate)}</div><div><span>${t('shipping')}</span>${dualPrice(order.delivery,order.rate)}</div><div class='order-grand-total'><strong>${t('total')}</strong>${dualPrice(order.total,order.rate)}</div></div><p class='order-payment'>${t('payment')}: ${orderPaymentMethod(order)}</p>${detail?'':`<button class='order-details-link' data-order-detail='${esc(order.id)}' aria-label='${t('viewOrderDetails')}: ${t('orderNumber')} #${esc(order.id.slice(0,8).toUpperCase())}'>${t('viewOrderDetails')}${icon('chevron')}</button>`}</article>`;
}
function showOrderHistory(){
 let body;
 if(!demoUser)body=`<div class='orders-empty'>${icon('bag')}<p>${t('historyLogin')}</p><button class='primary-button full' data-action='historyLogin'>${t('loginProfile')}</button></div>`;
 else{
  try{const orders=readOrders().filter(o=>o.email===orderEmail(demoUser.email)).sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt));
   body=`<p class='sheet-note history-note'>${t('historyNote')}</p>${orders.length?orders.map(order=>orderCard(order)).join(''):`<div class='orders-empty'>${icon('bag')}<h3>${t('noOrders')}</h3><p>${t('noOrdersNote')}</p></div>`}`;
  }catch{body=`<p class='empty' role='alert'>${t('historyLoadError')}</p>`}
 }
 openSheet('orders',t('orderHistory'),`<div class='sheet-content order-history'><button class='text-button order-back' data-action='profile'>${icon('back')}${t('backProfile')}</button>${body}</div>`);
}

function renderOrderProgress(order){
 if(order.status==='demo-cancelled')return renderCancelledProgress(order);
 if(order.payment?.method==='prepaid'&&order.payment.status!=='paid')return `<p class='sheet-note'>${t('awaitPayment')}</p><p class='sheet-note'>${t('paymentGate')}</p>${canCancelOrder(order)?`<button class='cancel-order-button' data-order-cancel='${esc(order.id)}'>${t('cancelOrder')}</button>`:''}`;
 const stage=orderStage(order),nextLabels=['simulateProcessing','simulateShipping','simulateCompletion'];
 return `<ol class='order-timeline'>${ORDER_STATES.map((status,i)=>{
  const reached=i<=stage,stamp=i===0?order.createdAt:order.statusTimes?.[status];
  const when=reached?(Number.isFinite(Date.parse(stamp))?new Date(stamp).toLocaleString({en:'en-GB',km:'km-KH',zh:'zh-CN'}[lang],{dateStyle:'medium',timeStyle:'short'}):t('paymentUnknown')):t('stepPending');
  return `<li class='${i===stage?'current':i<stage?'done':''}' ${i===stage?"aria-current='step'":''}><span class='timeline-dot'>${reached?icon('check'):i+1}</span><div><strong>${t(ORDER_STATUS_LABELS[i])}</strong><small>${esc(when)}</small></div></li>`;
 }).join('')}</ol><div class='order-simulation'><h4>${t('simulateStatus')}</h4><p class='order-detail-note'>${t('progressDemo')}</p>${stage<ORDER_STATES.length-1?`<button class='primary-button full' data-order-advance='${esc(order.id)}' data-order-from='${esc(order.status)}'>${t(nextLabels[stage])}${icon('chevron')}</button>`:`<p class='simulation-finished'>${icon('check')}${t('simulationComplete')}</p>`}</div>${canCancelOrder(order)?`<div class='order-cancel-option'><button class='cancel-order-button' data-order-cancel='${esc(order.id)}'>${t('cancelOrder')}</button><small>${t('cancelBeforeShipping')}</small></div>`:''}`;
}
function advanceOrderStatus(id,expectedStatus){
 if(!demoUser){showOrderHistory();return}
 let orders,order;try{orders=readOrders();order=orders.find(o=>o.id===id&&o.email===orderEmail(demoUser.email))}catch{toast(t('historyLoadError'));return}
 if(!order){toast(t('orderNotFound'));return}
 if(order.payment?.method==='prepaid'&&order.payment.status!=='paid'){toast(t('paymentGate'));return}
 const stage=orderStage(order);
 if(order.status!==expectedStatus){showOrderDetails(id);toast(t('statusStale'));return}
 if(order.status==='demo-cancelled'||stage>=ORDER_STATES.length-1)return;
 const next=ORDER_STATES[stage+1],now=new Date().toISOString();
 const updated={...order,status:next,statusTimes:{...order.statusTimes,[next]:now},updatedAt:now};
 try{localStorage.setItem(ORDER_STORAGE_KEY,JSON.stringify(orders.map(o=>o.id===id?updated:o)))}catch{toast(t('statusSaveError'));return}
 showOrderDetails(id);
 // Put the updated status in view and announce the successful transition.
 const announcement=document.createElement('p');announcement.className='status-update-announcement';announcement.setAttribute('role','status');announcement.textContent=`${t('statusChanged')}: ${orderStatusLabel(updated)}`;$('.order-detail-id').append(announcement);
}

function renderCancelledProgress(order){
 const steps=[['orderRecorded',order.createdAt]];
 if(order.cancelledFrom==='demo-processing'||order.statusTimes?.['demo-processing'])steps.push(['statusProcessing',order.statusTimes?.['demo-processing']]);
 steps.push(['statusCancelled',order.cancelledAt]);
 return `<ol class='order-timeline cancelled-timeline'>${steps.map(([label,stamp],i)=>{const last=i===steps.length-1,date=Number.isFinite(Date.parse(stamp))?new Date(stamp).toLocaleString({en:'en-GB',km:'km-KH',zh:'zh-CN'}[lang],{dateStyle:'medium',timeStyle:'short'}):t('paymentUnknown');return `<li class='${last?'cancelled current':'done'}' ${last?"aria-current='step'":''}><span class='timeline-dot'>${icon(last?'close':'check')}</span><div><strong>${t(label)}</strong><small>${esc(date)}</small></div></li>`}).join('')}</ol><p class='order-cancelled-note' role='status'>${t('cancelledNote')}</p>`;
}
function requestOrderCancellation(id){
 if(!demoUser){showOrderHistory();return}
 let order;try{order=readOrders().find(o=>o.id===id&&o.email===orderEmail(demoUser.email))}catch{toast(t('historyLoadError'));return}
 if(!order){showOrderHistory();return}
 if(!canCancelOrder(order)){showOrderDetails(id);return}
 displayedOrderId=id;
 openSheet('cancelOrder',t('cancelTitle'),`<div class='sheet-content cancel-confirmation'><p class='cancel-question'>${t('cancelQuestion')}</p><div class='cancel-order-summary'><strong>${t('orderNumber')} #${esc(order.id.slice(0,8).toUpperCase())}</strong>${orderStatusBadge(order)}<ul>${order.lines.map(p=>`<li>${esc(p.name[lang]||p.name.en)} × ${p.quantity}</li>`).join('')}</ul><div class='cart-total'><span>${t('total')}</span>${dualPrice(order.total,order.rate)}</div></div><p id='cancelOrderError' class='cancel-error' role='alert'></p><button class='primary-button full' data-order-detail='${esc(id)}'>${t('keepOrder')}</button><button class='cancel-order-button full' data-confirm-cancel='${esc(id)}' data-cancel-from='${esc(order.status)}'>${t('confirmCancel')}</button></div>`);
}
function confirmOrderCancellation(id,expectedStatus){
 if(!demoUser){showOrderHistory();return}
 let orders,order;
 try{orders=readOrders();order=orders.find(o=>o.id===id&&o.email===orderEmail(demoUser.email))}catch{const error=$('#cancelOrderError');if(error)error.textContent=t('cancelSaveError');return}
 if(!order){showOrderHistory();return}
 // Recheck persisted state at confirmation, including changes from another tab.
 if(!canCancelOrder(order)||order.status!==expectedStatus){showOrderDetails(id);return}
 const now=new Date().toISOString(),updated={...order,status:'demo-cancelled',cancelledFrom:order.status,cancelledAt:now,updatedAt:now,statusTimes:{...order.statusTimes,'demo-cancelled':now}};
 try{localStorage.setItem(ORDER_STORAGE_KEY,JSON.stringify(orders.map(o=>o.id===id?updated:o)))}catch{const error=$('#cancelOrderError');if(error)error.textContent=t('cancelSaveError');return}
 showOrderDetails(id);
}

window.addEventListener('storage',e=>{if(e.key!==ORDER_STORAGE_KEY||!$('#sheet').open)return;if(sheetKind==='orders')showOrderHistory();else if(['orderDetails','cancelOrder'].includes(sheetKind)&&displayedOrderId)showOrderDetails(displayedOrderId)});

function orderPaymentMethod(order){return order.payment?.method==='prepaid'?t('prepaid'):order.payment?.method==='cod'?t('cod'):t('paymentUnknown')}
function showOrderDetails(id){
 if(!demoUser){showOrderHistory();return}
 let order;try{order=readOrders().find(o=>o.id===id&&o.email===orderEmail(demoUser.email))}catch{toast(t('historyLoadError'));return}
 if(!order){toast(t('orderNotFound'));showOrderHistory();return}
 displayedOrderId=order.id;
 const shipping=order.shipping,hasShipping=shipping&&['recipient','address','phone'].every(key=>typeof shipping[key]==='string'&&shipping[key].trim());
 const date=new Date(order.createdAt).toLocaleString({en:'en-GB',km:'km-KH',zh:'zh-CN'}[lang],{dateStyle:'medium',timeStyle:'short'});
 openSheet('orderDetails',t('orderDetails'),`<div class='sheet-content order-history order-detail'><button class='text-button order-back' data-action='orders'>${icon('back')}${t('backOrders')}</button><div class='order-detail-id'><strong>${t('orderNumber')} #${esc(order.id.slice(0,8).toUpperCase())}</strong><time datetime='${esc(order.createdAt)}'>${esc(date)}</time></div><section class='order-detail-section'><h3>${t('orderProgress')}</h3>${renderOrderProgress(order)}</section><section class='order-detail-section'><h3>${t('deliveryDetails')}</h3>${hasShipping?`<dl class='order-info'><div><dt>${t('recipient')}</dt><dd>${esc(shipping.recipient)}</dd></div><div><dt>${t('phone')}</dt><dd>${esc(shipping.phone)}</dd></div><div><dt>${t('address')}</dt><dd class='order-address'>${esc([shipping.address,shipping.district,shipping.province].filter(Boolean).join(', '))}${shipping.note?`<p>${esc(shipping.note)}</p>`:''}${typeof orderLocationMarkup==='function'?orderLocationMarkup(order):''}</dd></div></dl>`:`<p class='order-detail-note'>${t('addressNotSaved')}</p>`}</section><section class='order-detail-section'><h3>${t('paymentDetails')}</h3><dl class='order-info'><div><dt>${t('payment')}</dt><dd>${orderPaymentMethod(order)}</dd></div><div><dt>${t('paymentStatus')}</dt><dd>${!order.payment||order.payment.status==='unpaid'?t('paymentUnpaid'):t('paymentUnknown')}</dd></div></dl></section>${renderOrderPackages(order)}${orderCard(order,true)}<button class="primary-button full" data-support-order="${esc(order.id)}">${icon('comment')}${t('liveChat')} · ${t('supportTitle')}</button></div>`);
}
document.addEventListener('click',e=>{const button=e.target.closest('[data-order-detail]');if(button)showOrderDetails(button.dataset.orderDetail);const advance=e.target.closest('[data-order-advance]');if(advance)advanceOrderStatus(advance.dataset.orderAdvance,advance.dataset.orderFrom);const cancel=e.target.closest('[data-order-cancel]');if(cancel)requestOrderCancellation(cancel.dataset.orderCancel);const confirm=e.target.closest('[data-confirm-cancel]');if(confirm)confirmOrderCancellation(confirm.dataset.confirmCancel,confirm.dataset.cancelFrom)});

function cartSubtotal(){return items.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0)}
function showCart(){
 const list=items.filter(p=>cart[p.id]);
 openSheet('cart',t('yourCart'),`<div class='sheet-content'><p class='sheet-note'>${t('cartNote')}</p>${list.length?list.map(p=>`<div class='sheet-product cart-line'>${thumbnail(p,'sheet-product-image')}<div><h3>${name(p)}</h3>${dualPrice(p.price)}<small class='unit-label'>${t('each')}</small></div><div class='cart-line-actions'><button class='delete-cart' data-delete='${p.id}' aria-label='${t('deleteItem')}: ${esc(name(p))}'>${icon('trash')}</button><div class='quantity'><button data-quantity='${p.id}' data-delta='-1' aria-label='${t('remove')}: ${esc(name(p))}'>${icon('minus')}</button><span>${cart[p.id]}</span><button data-quantity='${p.id}' data-delta='1' aria-label='${t('addCart')}: ${esc(name(p))}'>${icon('plus')}</button></div></div></div>`).join('')+`<div class='cart-total'><span>${t('subtotal')}</span>${dualPrice(cartSubtotal())}</div><p class='exchange-note'>${t('rateNote')}</p><button class='primary-button full' data-action='checkout'>${t('checkoutAction')}</button>`:`<p class='empty'>${t('cartEmpty')}</p>`}</div>`);
}
function beginCheckout(){pendingHistory=false;if(!cartCount()){showCart();return}pendingCheckout=true;if(!demoUser){showLogin();return}showCheckout()}
function showLogin(){openSheet('login',t('loginTitle'),`<div class='sheet-content'><div class='login-symbol'>${icon('user')}</div><p class='sheet-note'>${t('loginNote')}</p><form id='loginForm' class='stack-form'><label>${t('displayName')}<input class='sheet-input' name='displayName' autocomplete='name' maxlength='80' required></label><label>${t('email')}<input class='sheet-input' type='email' name='email' autocomplete='email' maxlength='200' required></label><button class='primary-button full'>${t('loginContinue')}</button></form>${pendingCheckout?`<button class='text-button full' data-action='cart'>${t('notNow')}</button>`:''}</div>`)}
function showCheckout(){
 if(!demoUser){pendingCheckout=true;showLogin();return}if(!cartCount()){showCart();return}
 openSheet('checkout',t('orderSummary'),`<div class='sheet-content'><p class='account-line'>${t('signedIn')} <strong>${esc(demoUser.name)}</strong></p><form id='checkoutForm' class='stack-form'>${shippingFields()}<div id='checkoutQuote' aria-live='polite'>${checkoutQuote()}</div><label>${t('payment')}<select class='sheet-input' name='payment'><option value='prepaid'>${t('prepaid')}</option></select></label><p class='sheet-note'>${t('prepaidNote')}</p><p class='sheet-note'>${t('orderNote')} ${t('deliverySaved')}</p><button class='primary-button full'>${t('saveUnpaid')}</button></form></div>`);
}
function showProfile(){openSheet('profile',t('profile'),`<div class='sheet-content'><div class='profile-avatar'>${icon('user')}</div><h3 class='profile-name'>${demoUser?esc(demoUser.name):t('guest')}</h3><p class='sheet-note'>${demoUser?esc(demoUser.phone||demoUser.accountLabel||demoUser.email):t('guestText')}</p><button class='primary-button full' data-action='${demoUser?'logout':'login'}'>${t(demoUser?'logout':'loginProfile')}</button>${[['support','headphones','liveChat'],['orders','bag','orderHistory'],['conversations','comment','conversations'],['saved','heart','saved'],['followedStores','store','followedStores'],['cart','cart','cart']].map(([a,i,k])=>`<button class='profile-row' data-action='${a}'>${icon(i)}${t(k)}${a==='conversations'?`<span class='profile-store-count' data-conversation-count>${conversationList().length}</span>`:''}${a==='followedStores'?`<span class='profile-store-count' data-followed-store-count>${followedStoreList().length}</span>`:''}${icon('chevron')}</button>`).join('')}</div>`)}
Object.assign(actions,{cart:showCart,checkout:beginCheckout,profile:showProfile,orders:showOrderHistory,historyLogin:()=>{pendingCheckout=false;pendingHistory=true;showLogin()},login:()=>{pendingCheckout=false;pendingHistory=false;showLogin()},logout:()=>{demoUser=null;pendingCheckout=false;pendingHistory=false;sessionStorage.removeItem('phsar-demo-user');showProfile()}});
document.addEventListener('submit',e=>{
 if(e.target.id==='loginForm'){
  e.preventDefault();if(!e.target.reportValidity())return;const fields=new FormData(e.target),displayName=String(fields.get('displayName')).trim();if(!displayName)return;
  demoUser={name:displayName,email:String(fields.get('email')).trim()};sessionStorage.setItem('phsar-demo-user',JSON.stringify(demoUser));if(pendingCheckout)showCheckout();else if(pendingHistory){pendingHistory=false;showOrderHistory()}else showProfile();
 }
 if(e.target.id==='checkoutForm'){
  e.preventDefault();if(!demoUser){showLogin();return}if(!e.target.reportValidity()||!cartCount())return;
  const checkout=new FormData(e.target);if(!String(checkout.get('address')||'').trim()||!String(checkout.get('phone')||'').trim()){toast(t('deliveryRequired'));return}const order=createOrder(checkout);try{recordOrder(order)}catch{toast(t('orderSaveError'));return}const total=order.total;cart={};updateCart();pendingCheckout=false;
  openSheet('orderComplete',t('orderDone'),`<div class='sheet-content order-success'>${icon('check')}<h3>${t('orderDone')}</h3><p>${t('orderDoneNote')}</p>${dualPrice(total)}<button class='primary-button full' data-action='orders'>${t('viewOrders')}</button><button class='text-button full' data-action='close'>${t('continueShop')}</button></div>`);
 }
});

let feedCurrentId=null,immersiveObserver=null,feedReturnFocus=null,feedManualPause=false;
// Follow state belongs to the tenant and is shared with its store page.
function renderVideoActions(p,extraClass=''){return `<div class='feed-social ${extraClass}'><div class='feed-store-actions'><button class='feed-avatar' data-store='${p.tenantId}' aria-label='${t('visitStore')}: ${esc(productTenant(p).name)}'>${icon('store')}</button><button class='feed-follow-toggle' data-feed-follow='${p.id}' aria-label='${t(isSellerFollowed(p.tenantId)?'following':'follow')}' aria-pressed='${isSellerFollowed(p.tenantId)}'>${icon(isSellerFollowed(p.tenantId)?'check':'plus')}</button></div>${socialButtons(p)}<button class='feed-save ${saved.includes(p.id)?'saved':''}' data-save='${p.id}' aria-label='${t('saved')}' aria-pressed='${saved.includes(p.id)}'>${icon('heart')}<small>${t('saved')}</small></button></div>`}
function renderFeedCard(p,i){return `<article class='feed-card' data-feed-id='${p.id}' aria-label='${esc(name(p))}'><video data-feed-video='${p.id}' data-src='${p.video}' poster='${p.poster}' loop muted playsinline preload='none' style='${assetStyle(p)}'></video><div class='feed-shade'></div><button class='feed-toggle' data-feed-toggle='${p.id}' aria-label='${t('pause')}: ${esc(name(p))}'>${icon('play')}</button>${renderVideoActions(p)}<div class='feed-caption'><div class='feed-seller'><button class='feed-store-name' data-store='${p.tenantId}'>${esc(productTenant(p).name)}</button> <button data-feed-follow='${p.id}' aria-pressed='${isSellerFollowed(p.tenantId)}'>${t(isSellerFollowed(p.tenantId)?'following':'follow')}</button></div><button class='feed-product-title' data-product='${p.id}'>${name(p)} ${icon('chevron')}</button></div><div class='feed-purchase'><button class='feed-product-link' data-product='${p.id}' aria-label='${t('viewProduct')}: ${esc(name(p))}'>${thumbnail(p)}</button><button class='feed-chat' data-feed-chat='${p.id}'>${icon('comment')}${t('chatShort')}</button><button class='feed-buy' data-buy='${p.id}'><span class='purchase-buy-label'>${t('buyShort')}</span><strong class='purchase-buy-price'>${money(p.price)}${rielPrice(p.price)}</strong></button></div><div class='feed-progress'><span data-feed-time>0:00</span><input type='range' min='0' max='1000' value='0' step='1' data-feed-seek='${p.id}' aria-label='${t('seek')}'><span>${Math.floor(p.duration/60)}:${String(p.duration%60).padStart(2,'0')}</span></div></article>`}
function openVideoFeed(restore=null){
 closeSearch();$('#sheet').close();document.querySelectorAll('video').forEach(v=>v.pause());feedReturnFocus=document.activeElement;feedManualPause=restore?.paused||false;feedCurrentId=restore?.id&&item(restore.id)?restore.id:items[0].id;
 const dialog=$('#videoFeed');dialog.innerHTML=`<div class='feed-top'><button data-feed-close aria-label='${t('closeFeed')}'>${icon('back')}</button><strong>${t('forYou')}<i></i></strong><button data-feed-sound hidden aria-label='${t(mediaPlayback.soundEnabled?'mute':'unmute')}'>${icon(mediaPlayback.soundEnabled?'volume':'muted')}</button></div><div class='feed-track' tabindex='0' aria-label='${t('swipeUp')}'>${items.map(renderFeedCard).join('')}</div><div class='feed-hint'>${t('swipeUp')}</div>`;
 document.body.classList.add('feed-open');dialog.showModal();
 const track=dialog.querySelector('.feed-track');if(restore)track.scrollTop=items.findIndex(p=>p.id===feedCurrentId)*track.clientHeight;let initialRestore=restore;

 immersiveObserver=new IntersectionObserver(entries=>{for(const entry of entries){const video=entry.target.querySelector('video');if(entry.isIntersecting&&entry.intersectionRatio>.6){if(initialRestore&&entry.target.dataset.feedId!==initialRestore.id)continue;feedCurrentId=entry.target.dataset.feedId;feedManualPause=initialRestore?initialRestore.paused:false;initialRestore=null;document.querySelectorAll('[data-feed-video]').forEach(v=>{if(v!==video)v.pause()});resumeVideoFeed()}else video.pause()}},{root:dialog.querySelector('.feed-track'),threshold:[0,.6]});
 dialog.querySelectorAll('.feed-card').forEach(card=>immersiveObserver.observe(card));
 dialog.querySelectorAll('[data-feed-video]').forEach(v=>{
  mediaPlayback.bind(v,{hasAudio:item(v.dataset.feedVideo)?.hasAudio===true});
  const card=v.closest('.feed-card');v.addEventListener('timeupdate',()=>{card.querySelector('[data-feed-seek]').value=v.duration?Math.round(v.currentTime/v.duration*1000):0;card.querySelector('[data-feed-time]').textContent=`${Math.floor(v.currentTime/60)}:${String(Math.floor(v.currentTime%60)).padStart(2,'0')}`});
  const sync=()=>{card.classList.toggle('feed-paused',v.paused);card.querySelector('[data-feed-toggle]').setAttribute('aria-label',`${t(v.paused?'play':'pause')}: ${name(item(v.dataset.feedVideo))}`)};v.addEventListener('play',sync);v.addEventListener('pause',sync);v.addEventListener('error',()=>{card.classList.add('feed-paused');toast(t('videoError'))});
 });
 if(restore){const v=$(`[data-feed-video='${feedCurrentId}']`);ensureSource(v);restoreMediaPosition(v,restore)}
 resumeVideoFeed();dialog.querySelector('[data-feed-close]').focus({preventScroll:true});
}
function pauseVideoFeed(){document.querySelectorAll('[data-feed-video]').forEach(v=>v.pause())}
// Audio metadata is checked per active product, not from the mute preference.
function syncFeedSoundButton(){
 const button=$('[data-feed-sound]');if(!button)return;
 button.hidden=item(feedCurrentId)?.hasAudio!==true;
 button.setAttribute('aria-label',t(mediaPlayback.soundEnabled?'mute':'unmute'));
 button.innerHTML=icon(mediaPlayback.soundEnabled?'volume':'muted');
}
function resumeVideoFeed(){syncFeedSoundButton();if(!$('#videoFeed').open||$('#sheet').open||document.hidden||feedManualPause)return;const v=$(`[data-feed-video='${feedCurrentId}']`);if(!v)return;ensureSource(v);mediaPlayback.play(v).catch(()=>v.closest('.feed-card').classList.add('feed-paused'))}
function closeVideoFeed(restoreFocus=true){$('#videoFeed').close();if(restoreFocus&&feedReturnFocus?.isConnected)feedReturnFocus.focus({preventScroll:true})}
$('#videoFeed').addEventListener('close',()=>{pauseVideoFeed();immersiveObserver?.disconnect();immersiveObserver=null;feedCurrentId=null;document.body.classList.remove('feed-open');$('#videoFeed').innerHTML='';schedulePreview()});
$('#sheet').addEventListener('close',resumeVideoFeed);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseVideoFeed();else resumeVideoFeed()});
$('#videoFeed').addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp'].includes(e.key)||e.target.matches('input'))return;e.preventDefault();const track=$('.feed-track');track.scrollBy({top:(e.key==='ArrowDown'?1:-1)*track.clientHeight,behavior:'smooth'})});
$('#videoFeed').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.hasAttribute('data-feed-close'))closeVideoFeed();
 if(b.hasAttribute('data-feed-sound')){if(item(feedCurrentId)?.hasAudio!==true)return;mediaPlayback.setSound(!mediaPlayback.soundEnabled)}
 if(b.dataset.feedToggle){const v=$(`[data-feed-video='${b.dataset.feedToggle}']`);feedManualPause=!v.paused;if(v.paused){ensureSource(v);mediaPlayback.play(v).catch(()=>{})}else v.pause()}
 if(b.dataset.feedChat)showChat(b.dataset.feedChat);
});
$('#videoFeed').addEventListener('input',e=>{if(e.target.dataset.feedSeek){const v=$(`[data-feed-video='${e.target.dataset.feedSeek}']`);if(Number.isFinite(v.duration))v.currentTime=Number(e.target.value)/1000*v.duration}});
function toggleSellerFollow(id){const p=item(id);if(p)toggleTenantFollow(p.tenantId)}
document.addEventListener('click',e=>{const b=e.target.closest('button[data-feed-follow]');if(b)toggleSellerFollow(b.dataset.feedFollow)});
actions.videos=openVideoFeed;

// Show on each fresh page launch, never again during in-app navigation.
function dismissSplash(){const splash=$('#splash');if(!splash)return;$('#app').inert=false;splash.remove();schedulePreview()}
$('.splash-orbit').innerHTML=icon('brand');
$('#splashContinue').textContent=t('continue');$('#splashContinue').onclick=dismissSplash;
readRoute();render();
setTimeout(dismissSplash,1800);

Object.assign(dict.en,{prepaid:'Online payment — before shipment',prepaidNote:'Online payment is not connected yet. Orders remain unpaid; cash on delivery is not available.'});
Object.assign(dict.zh,{prepaid:'在线付款 — 发货前支付',prepaidNote:'在线支付尚未接入。订单保持未付款状态，不支持货到付款。'});
Object.assign(dict.km,{prepaid:'ទូទាត់តាមអ៊ីនធឺណិត មុនពេលផ្ញើទំនិញ',prepaidNote:'មិនទាន់ភ្ជាប់ការទូទាត់តាមអ៊ីនធឺណិតទេ។ ការបញ្ជាទិញនៅតែមិនទាន់បង់ប្រាក់ ហើយមិនមានការបង់ប្រាក់ពេលទទួលទំនិញទេ។'});
