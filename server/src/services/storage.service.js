import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import path from "node:path";
import { awsRegion, s3Bucket, s3Client } from "../config/s3.js";

const sanitizeFileName = (fileName) =>
  path
    .basename(fileName, path.extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getPublicS3Url = (key) => {
  if (process.env.AWS_S3_PUBLIC_URL) {
    return `${process.env.AWS_S3_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  }

  return `https://${s3Bucket}.s3.${awsRegion}.amazonaws.com/${key}`;
};

const getKeyFromPublicUrl = (url) => {
  if (!url) {
    return null;
  }

  if (process.env.AWS_S3_PUBLIC_URL) {
    const base = process.env.AWS_S3_PUBLIC_URL.replace(/\/$/, "");
    if (url.startsWith(base)) {
      return decodeURIComponent(url.slice(base.length).replace(/^\/+/, ""));
    }
  }

  try {
    const { pathname } = new URL(url);
    return decodeURIComponent(pathname.replace(/^\/+/, ""));
  } catch {
    return null;
  }
};

export const uploadProductImage = async (file) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const baseName = sanitizeFileName(file.originalname) || "product-image";
  const key = `products/${Date.now()}-${crypto.randomUUID()}-${baseName}${extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: s3Bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return getPublicS3Url(key);
};

export const deleteProductImage = async (imageUrl) => {
  const key = getKeyFromPublicUrl(imageUrl);
  if (!key) {
    return;
  }

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: s3Bucket,
      Key: key,
    })
  );
};
