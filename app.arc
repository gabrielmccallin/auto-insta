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