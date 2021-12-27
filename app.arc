@app
deno-hello

@http
get /
get /fast
post /photo

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
runtime deno
region eu-west-2
profile default