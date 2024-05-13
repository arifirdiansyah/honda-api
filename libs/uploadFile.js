import { Upload } from '@aws-sdk/lib-storage';

export async function uploadImageToS3(key, body) {
  const uploadS3 = new Upload({
    queueSize: 4, // optional concurrency configuration
    leavePartsOnError: false, // optional manually handle dropped parts
    params: {
      Bucket: process.env.MEDITATION_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    },
  });

  // eslint-disable-next-line no-unused-vars
  uploadS3.on('httpUploadProgress', _progress => {});

  const result = await uploadS3.done();

  return result.Location;
}

export async function uploadMusicToS3(key, body) {
  const uploadS3 = new Upload({
    queueSize: 4, // optional concurrency configuration
    leavePartsOnError: false, // opt
    params: {
      Bucket: process.env.MEDITATION_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentEncoding: 'base64',
      ContentType: 'mp3/mp3',
    },
  });

  // eslint-disable-next-line no-unused-vars
  uploadS3.on('httpUploadProgress', _progress => {});

  const result = await uploadS3.done();

  return result.Location;
}
