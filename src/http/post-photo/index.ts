import * as data from 'https://registry.begin.com/begin-data@master/mod.ts'

export async function handler(req: { body: string; }) {
  let photo: { created: number; }
  try {
    photo = JSON.parse(req.body);
  } catch {
    return {
      statusCode: 400,
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      body: "😢 Bad request"
    }
  }
  photo.created = photo.created || Date.now()
  await data.set({
    table: 'photos',
    ...photo
  })
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: "✊ Photo saved"
  }
}
