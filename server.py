"""Phsar static files plus shared, persistent video view counts."""
import http.server, json, sqlite3, os, uuid, time, hashlib
from http.cookies import SimpleCookie
from pathlib import Path
ROOT=Path(__file__).resolve().parent
DB=Path(os.environ.get('PHSAR_VIEWS_DB',str(ROOT/'data/video-views.sqlite3')))
DB.parent.mkdir(exist_ok=True)
def connect():
 c=sqlite3.connect(DB,timeout=10)
 c.execute('CREATE TABLE IF NOT EXISTS views(product TEXT, visitor TEXT, day TEXT, PRIMARY KEY(product,visitor,day))')
 return c
with connect():pass
class Handler(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT),**kw)
 def reply(self,status,value,cookie=None):
  body=json.dumps(value).encode();self.send_response(status);self.send_header('Content-Type','application/json');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(body)))
  if cookie:self.send_header('Set-Cookie','phsar_viewer='+cookie+'; HttpOnly; SameSite=Strict; Path=/; Max-Age=31536000')
  self.end_headers();self.wfile.write(body)
 def visitor(self):
  cookies=SimpleCookie();cookies.load(self.headers.get('Cookie',''));value=cookies.get('phsar_viewer');raw=value.value if value else ''
  try:uuid.UUID(raw)
  except ValueError:raw=str(uuid.uuid4())
  return hashlib.sha256(raw.encode()).hexdigest(),raw if not value else None
 def do_GET(self):
  if self.path.split('?')[0]=='/api/video-views':
   _,cookie=self.visitor()
   with connect() as c:counts=dict(c.execute('SELECT product,COUNT(*) FROM views GROUP BY product'))
   return self.reply(200,{'counts':counts},cookie)
  relative=Path(self.translate_path(self.path)).relative_to(ROOT)
  if (relative.parts and relative.parts[0] in ('data','tests','rebuild-backup','video-rebuild-backup')) or any(part.startswith('.') for part in relative.parts) or relative.suffix not in ('.html','.js','.css','.mp4','.jpg','.png','.svg','.webp','.woff2','') :return self.send_error(404)
  super().do_GET()
 def do_POST(self):
  if self.path!='/api/video-views':return self.reply(404,{'error':'Not found'})
  if self.headers.get('Sec-Fetch-Site')=='cross-site':return self.reply(403,{'error':'Forbidden'})
  try:
   length=int(self.headers.get('Content-Length','0'))
   if not 0<length<512:raise ValueError()
   product=json.loads(self.rfile.read(length)).get('product','')
   if not isinstance(product,str) or not product or any(x not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for x in product) or not (ROOT/'assets/products'/f'{product}.mp4').is_file():raise ValueError()
  except (ValueError,TypeError):return self.reply(400,{'error':'Invalid product'})
  visitor,cookie=self.visitor();day=time.strftime('%Y-%m-%d',time.gmtime())
  with connect() as c:
   cur=c.execute('INSERT OR IGNORE INTO views VALUES(?,?,?)',(product,visitor,day));count=c.execute('SELECT COUNT(*) FROM views WHERE product=?',(product,)).fetchone()[0]
  self.reply(200,{'product':product,'count':count,'counted':cur.rowcount==1},cookie)
if __name__=='__main__':
 os.chdir(ROOT);http.server.ThreadingHTTPServer(('127.0.0.1',8765),Handler).serve_forever()
