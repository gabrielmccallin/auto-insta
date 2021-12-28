@app
deno-hello

@http
get /photos
post /photo

@tables
data
  scopeID *String
  dataID **String
  ttl TTL