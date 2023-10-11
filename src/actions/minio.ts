'use server';
import * as Minio from 'minio';
import { getUserFromSession } from './user';

async function minioClient() {
  const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'vES5t2hkYuZpXCdWgqof',
    secretKey: 'REKd5s7aO6TavVo9aSAxIyOYlz955vycUyg5fVae',
  });
  return minioClient;
}

async function getProfilePicture() {
  const minio = await minioClient();
  const user = await getUserFromSession();
  const bucketExists = await minio.bucketExists('profile-pictures');
  if (!bucketExists) await minio.makeBucket('profile-pictures', 'main');

  // Upload default picture
  await minio.putObject('profile-pictures', 'default.png', './src/images/default.png', { 'Content-Type': 'image' });

  const picture = await minio.getObject('profile-pictures', user?.profilePicture ?? 'default.png');
  return picture;
}

export { getProfilePicture, minioClient };
