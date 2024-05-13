import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getFileUploadUrl = async (req, res) => {
  const { name, type, extension } = req.body;

  let fileName = name.replace(/\s/g, '_') + '_' + Date.now() + `.${extension}`;

  try {
    const s3Params = {
      Bucket: process.env.DUMOGI_BUCKET_NAME,
      Key: fileName,
      ContentType: type,
      ACL: 'public-read',
    };

    const uploadURL = getSignedUrl('putObject', s3Params);
    return res.send({ url: uploadURL, fileName: fileName });
  } catch (e) {
    return res.status(400).send({ error: 'Failed generating url' });
  }
};
