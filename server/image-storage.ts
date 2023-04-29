import { Storage } from "@google-cloud/storage";

export class ImageStorage {
  private storage: Storage;
  private bucket: string;

  public constructor(keyPath: string, bucketName: string) {
    this.storage = new Storage({ keyFilename: keyPath });
    this.bucket = bucketName;
  }

  public async upload(imgPath: string) {
    const [_, object] = await this.storage.bucket(this.bucket).upload(imgPath);
    return object.name;
  }

  public async getUrl(imgName: string) {
    const [signedUrl] = await this.storage
      .bucket(this.bucket)
      .file(imgName)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
      });
    return signedUrl;
  }
}
