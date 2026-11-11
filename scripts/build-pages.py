from pathlib import Path
import shutil,json,hashlib
root=Path(__file__).resolve().parent.parent;out=root/'dist'
out.mkdir(exist_ok=True)
for name in ['index.html','css','js','assets']:
 p=root/name;target=out/name
 if p.is_dir():shutil.copytree(p,target,dirs_exist_ok=True)
 else:shutil.copy2(p,target)
model=out/'assets/models/clip-vit-base-patch32/onnx/model_quantized.onnx';size=model.stat().st_size;chunks=[]
with model.open('rb') as f:
 i=0
 while data:=f.read(20*1024*1024):
  target=model.with_name('model-part-'+str(i)+'.bin');target.write_bytes(data);chunks.append('/'+str(target.relative_to(out)));i+=1
model.unlink()
(out/'model-manifest.json').write_text(json.dumps({'size':size,'chunks':chunks}))
(out/'_routes.json').write_text(json.dumps({'version':1,'include':['/api/*','/assets/models/clip-vit-base-patch32/onnx/model_quantized.onnx'],'exclude':[]}))
(out/'_headers').write_text('/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/js/*\n  Cache-Control: public, max-age=0, must-revalidate\n/css/*\n  Cache-Control: public, max-age=0, must-revalidate\n')
ids=[]
for p in (out/'assets/products').glob('*.mp4'):ids.append(p.stem)
(out/'deploy-products.json').write_text(json.dumps(ids))
print('Staging ready:',len(list(out.rglob('*'))),'entries; model split:',len(chunks),'parts')

shutil.copy2(root/'cloudflare/worker.js',out/'_worker.js')
