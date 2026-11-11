// One sound preference and one playback owner per app session.
// New page sessions start muted; silent clips and home previews never change the preference.
function createPlaybackController({getVideos,canPlay,onPreferenceChange=()=>{}}){
 let soundEnabled=false,volume=1,active=null;
 const settings=new WeakMap(),applied=new WeakMap();
 function apply(video,muted){
  applied.set(video,{muted,volume});
  if(video.volume!==volume)video.volume=volume;
  if(video.muted!==muted)video.muted=muted;
 }
 function silenceOthers(video){
  for(const other of getVideos())if(other!==video){other.pause();apply(other,true)}
 }
 function select(video){
  if(!canPlay(video)){video.pause();apply(video,true);return false}
  active=video;silenceOthers(video);
  const config=settings.get(video)||{};
  apply(video,!soundEnabled||config.hasAudio!==true||config.preview===true);
  return true;
 }
 function bind(video,config){
  if(settings.has(video))return;
  settings.set(video,config);apply(video,true);
  video.addEventListener('play',()=>select(video));
  video.addEventListener('volumechange',()=>{
   if(video!==active||!canPlay(video)||!config.hasAudio||config.preview)return;
   const expected=applied.get(video);
   // Browser volumechange events also fire after our own programmatic assignments.
   if(expected&&video.muted===expected.muted&&video.volume===expected.volume)return;
   soundEnabled=!video.muted&&video.volume>0;
   if(video.volume>0)volume=video.volume;
   silenceOthers(video);apply(video,!soundEnabled);onPreferenceChange();
  });
 }
 return {
  get soundEnabled(){return soundEnabled},
  bind,select,
  play(video){if(!select(video))return Promise.resolve();return video.play()},
  setSound(enabled){
   soundEnabled=!!enabled;
   if(active&&canPlay(active))select(active);
   onPreferenceChange();
  },
  pauseAll(){for(const video of getVideos())video.pause()}
 };
}
