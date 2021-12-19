type S3BucketConfig = {
  accessKeyID: string;
  secretKey: string;
  bucket: string;
  region: string;
  endpointURL: string;
};

export interface PutObjectResponse {
  /**
   * An ETag is an opaque identifier assigned by a web server to a
   * specific version of a resource found at a URL.
   */
  etag: string;

  /**
   * Version of the object.
   */
  versionId?: string;
}

export class S3Bucket {
  constructor(_params: S3BucketConfig) {}
  putObject(
    _photoName: string,
    _photo: Uint8Array,
    { contentType }: { contentType: string }
  ) {
    return new Promise<PutObjectResponse>((resolve) => {
      resolve({
        etag: "wow",
        versionId: "0.0.1"
      });
    });
  }
}
