// Product-type recognition UI. Photos stay in this browser.
let photoRecognition=null,photoMatchStatus='',photoModule;
const photoTypeNames={en:{earbuds:'Earbuds / in-ear earphones',headphones:'Over-ear headphones',watch:'Wristwatch',skincare:'Skincare / cosmetics',coffee:'Coffee machine',sneakers:'Sneakers / sports shoes',phone:'Smartphone',computer:'Laptop',camera:'Camera',bag:'Bag',clothing:'Clothing',food:'Food / drink',person:'Person',animal:'Animal',scene:'Scenery',other:'Other object'},zh:{earbuds:'入耳式耳机',headphones:'头戴式耳机',watch:'腕表',skincare:'护肤品',coffee:'咖啡机',sneakers:'运动鞋',phone:'智能手机',computer:'笔记本电脑',camera:'相机',bag:'包',clothing:'服装',food:'食品／饮料',person:'人物',animal:'动物',scene:'风景',other:'其他物品'},km:{earbuds:'កាសដាក់ក្នុងត្រចៀក',headphones:'កាសពាក់ត្រចៀក',watch:'នាឡិកាដៃ',skincare:'ផលិតផលថែស្បែក',coffee:'ម៉ាស៊ីនកាហ្វេ',sneakers:'ស្បែកជើងកីឡា',phone:'ទូរស័ព្ទ',computer:'កុំព្យូទ័រយួរដៃ',camera:'កាមេរ៉ា',bag:'កាបូប',clothing:'សម្លៀកបំពាក់',food:'អាហារ / ភេសជ្ជៈ',person:'មនុស្ស',animal:'សត្វ',scene:'ទេសភាព',other:'វត្ថុផ្សេងទៀត'}};
Object.assign(dict.en,{photoDisclaimer:'Recognizes product types. Brand and exact model are not verified.',photoLoading:'Loading the recognition model. First use may take a moment…',photoRecognizing:'Recognizing the product…',photoModelError:'Recognition is unavailable. Please choose the photo again to retry.',photoDetected:'Detected type',photoMatched:'Products of this type',photoRelated:'Related audio products',photoRelatedNote:'No in-ear earbuds or AirPods are listed in this catalog yet. These over-ear headphones are a related alternative, not an exact match.',photoUncertain:'The product type is unclear. Try a close-up of one product with a simple background.',photoUnavailable:'No products of this type are available in this catalog yet.'});
Object.assign(dict.zh,{photoDisclaimer:'识别商品类型，不验证品牌或具体型号。',photoLoading:'正在加载识别模型，首次使用可能需要一些时间…',photoRecognizing:'正在识别商品…',photoModelError:'识别暂不可用，请重新选择图片重试。',photoDetected:'识别类型',photoMatched:'同类商品',photoRelated:'相关音频商品',photoRelatedNote:'当前目录暂无入耳式耳机或 AirPods。下方头戴式耳机是相关替代商品，并非完全匹配。',photoUncertain:'无法确定商品类型，请使用背景简单的单件商品近照。',photoUnavailable:'当前目录暂无此类商品。'});
Object.assign(dict.km,{photoDisclaimer:'សម្គាល់ប្រភេទទំនិញ។ មិនផ្ទៀងផ្ទាត់ម៉ាក ឬម៉ូដែលជាក់លាក់ទេ។',photoLoading:'កំពុងផ្ទុកម៉ូដែលសម្គាល់។ ការប្រើលើកដំបូងអាចចំណាយពេលបន្តិច…',photoRecognizing:'កំពុងសម្គាល់ទំនិញ…',photoModelError:'មិនអាចសម្គាល់បាន។ សូមជ្រើសរើសរូបថតម្តងទៀត។',photoDetected:'ប្រភេទដែលបានសម្គាល់',photoMatched:'ទំនិញប្រភេទនេះ',photoRelated:'ផលិតផលសំឡេងដែលពាក់ព័ន្ធ',photoRelatedNote:'មិនទាន់មានកាសដាក់ក្នុងត្រចៀក ឬ AirPods ក្នុងកាតាឡុកនេះទេ។ កាសខាងក្រោមជាជម្រើសពាក់ព័ន្ធ មិនមែនជាទំនិញដូចគ្នាទេ។',photoUncertain:'ប្រភេទទំនិញមិនច្បាស់។ សូមសាកល្បងរូបថតជិតនៃទំនិញតែមួយលើផ្ទៃសាមញ្ញ។',photoUnavailable:'មិនទាន់មានទំនិញប្រភេទនេះក្នុងកាតាឡុកទេ។'});
function loadImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src})}
function photoSummary(){
 if(!photoRecognition)return '';
 if(photoMatchStatus==='uncertain')return `<p class='photo-recognition-note'>${t('photoUncertain')}</p>`;
 const kind=photoTypeNames[lang][photoRecognition.kind];
 return `<div class='photo-recognition'><span>${t('photoDetected')}</span><strong>${kind}</strong></div>${photoMatchStatus==='relatedAudio'?`<p class='photo-recognition-note'>${t('photoRelatedNote')}</p><h3 class='photo-result-heading'>${t('photoRelated')}</h3>`:photoMatchStatus==='unavailable'?`<p class='photo-recognition-note'>${t('photoUnavailable')}</p>`:`<h3 class='photo-result-heading'>${t('photoMatched')}</h3>`}`;
}
function photoSheet(status=''){openSheet('photo',t('photoResultsTitle'),`<div class='sheet-content'><p class='sheet-note'>${t('photoDisclaimer')}</p>${photoUrl?`<div class='photo-selected'><img src='${photoUrl}' alt='${t('photoSelected')}'><p>${t('photoPrivate')}</p></div>`:''}<p role='status' class='sheet-note' id='photoStatus'>${status}</p>${photoSummary()}<div class='photo-grid'>${photoResults?photoResults.map(productCard).join(''):''}</div><button class='primary-button full' data-action='photo'>${icon('camera')}${t('photoChoose')}</button></div>`)}
$('#photoInput').onchange=async e=>{
 const file=e.target.files[0];if(!file)return;
 const seq=++photoSequence;photoResults=null;photoRecognition=null;photoMatchStatus='';
 if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=null;
 if(!file.type.startsWith('image/')){photoSheet(t('photoError'));e.target.value='';return}
 if(file.size>10*1024*1024){photoSheet(t('photoLimit'));e.target.value='';return}
 photoUrl=URL.createObjectURL(file);photoSheet(t('photoRecognizing'));
 try{
  const image=await loadImage(photoUrl);
  photoModule??=import('./photo-search.js?v=catalog-24-1');
  const {recognizePhoto,matchPhotoProducts}=await photoModule;
  const result=await recognizePhoto(image,status=>{if(seq===photoSequence&&sheetKind==='photo'&&$('#sheet').open)$('#photoStatus').textContent=t(status==='loading'?'photoLoading':'photoRecognizing')});
  if(seq!==photoSequence)return;
  photoRecognition=result;console.debug('Photo recognition:',JSON.stringify(result));
  const match=matchPhotoProducts(result,items);photoResults=match.products;photoMatchStatus=match.status;
  if(sheetKind==='photo'&&$('#sheet').open)photoSheet();
 }catch(error){console.error('Photo recognition failed:',error.message);if(seq===photoSequence&&sheetKind==='photo'&&$('#sheet').open)photoSheet(t('photoModelError'))}
 finally{if(seq===photoSequence)e.target.value=''}
};
