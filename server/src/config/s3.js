import { S3Client } from "@aws-sdk/client-s3";

export const awsRegion =
  process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;

export const s3Bucket = process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET;

export const validateS3Config = () => {
  const missingEnvVars = [];

  if (!awsRegion) {
    missingEnvVars.push("AWS_REGION or AWS_DEFAULT_REGION");
  }

  if (!s3Bucket) {
    missingEnvVars.push("AWS_S3_BUCKET or AWS_BUCKET");
  }

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required S3 environment variables: ${missingEnvVars.join(", ")}`
    );
  }
};

const credentials =
  process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined;

export const s3Client = new S3Client({
  region: awsRegion,
  credentials,
});
