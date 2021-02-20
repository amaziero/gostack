import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk'
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import mime from 'mime'
import AppError from '@shared/errors/AppError';

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    })
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new AppError('Could not get the file extension')
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file
    }).promise()
  }
}

export default S3StorageProvider;
