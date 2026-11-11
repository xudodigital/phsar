const vm=require('vm'),fs=require('fs'),assert=require('assert');
const pending=[];
class Video{
 constructor(id){this.id=id;this.paused=true;this._muted=false;this._volume=1;this.events={};}
 addEventListener(k,fn){(this.events[k]??=[]).push(fn)}
 emit(k){for(const fn of this.events[k]||[])fn()}
 get muted(){return this._muted}set muted(v){v=!!v;if(v!==this._muted){this._muted=v;pending.push(()=>this.emit('volumechange'))}}
 get volume(){return this._volume}set volume(v){if(v!==this._volume){this._volume=v;pending.push(()=>this.emit('volumechange'))}}
 pause(){this.paused=true}play(){this.paused=false;pending.push(()=>this.emit('play'));return Promise.resolve()}
}
const videos=['feed1','detail','feed2','silent','preview'].map(id=>new Video(id));let permitted=new Set(videos),modal=false;const context=vm.createContext({});vm.runInContext(fs.readFileSync(require('path').join(__dirname,'../js/playback.js'),'utf8'),context);
const c=context.createPlaybackController({getVideos:()=>videos,canPlay:v=>!modal&&permitted.has(v)});
const [feed,detail,second,silent,preview]=videos;
for(const v of videos)c.bind(v,{hasAudio:![silent,preview].includes(v),preview:v===preview});
const assertSingle=()=>assert(videos.filter(v=>!v.paused&&!v.muted&&v.volume>0).length<=1);
function flush(){let count=0;while(pending.length){assert(++count<200,'event loop');pending.shift()();assertSingle()}}
c.play(feed);flush();assert(feed.muted);assert(!c.soundEnabled);
c.setSound(true);flush();assert(!feed.muted);assert(c.soundEnabled);
c.play(detail);flush();assert(!detail.muted);assert(feed.paused&&feed.muted);
detail.muted=true;flush();assert(!c.soundEnabled);c.play(second);flush();assert(second.muted);
second.muted=false;flush();assert(c.soundEnabled);c.play(silent);flush();assert(silent.muted&&c.soundEnabled);c.play(second);flush();assert(!second.muted);
c.play(preview);flush();assert(preview.muted&&c.soundEnabled);c.play(detail);flush();assert(!detail.muted);
detail.volume=.35;flush();c.play(second);flush();assert.equal(second.volume,.35);
permitted.delete(detail);detail.paused=false;detail.emit('play');flush();assert(detail.paused&&detail.muted);
modal=true;c.pauseAll();second.paused=false;second.emit('play');flush();assert(second.paused&&second.muted);assert(c.soundEnabled);
modal=false;c.play(second);flush();assert(!second.muted);
second.volume=0;flush();assert(!c.soundEnabled);c.play(detail);flush();assert(detail.paused&&detail.muted);
console.log('PASS: default mute, feed/detail sync both ways, silent/preview preference preservation, volume, stale play, modal pause, single audible owner.');
