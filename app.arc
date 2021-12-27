@app
deno-hello

@http
get /photos
get /fast
post /photo

@tables
data
  scopeID *String
  dataID **String
  ttl TTL