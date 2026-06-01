import { createReadStream, existsSync } from "node:fs";
import { put } from "@vercel/blob";

const uploads = [
  {
    input: "public/projects/encoded/rd-vid-1920-60fps.mp4",
    pathname: "projects/rd-vid-1920-60fps.mp4",
  },
  {
    input: "public/projects/encoded/tfl-vid-1920-60fps.mp4",
    pathname: "projects/tfl-vid-1920-60fps.mp4",
  },
];

async function loadEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const file = Bun.file(path);
  const contents = await file.text();

  for (const line of contents.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1);

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

await loadEnvFile(".env.local");
await loadEnvFile(".env");

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error(
    "Missing BLOB_READ_WRITE_TOKEN. Add it to .env.local or export it before running this script.",
  );
}

for (const upload of uploads) {
  if (!existsSync(upload.input)) {
    throw new Error(`Missing encoded video: ${upload.input}`);
  }

  const blob = await put(upload.pathname, createReadStream(upload.input), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 31536000,
    contentType: "video/mp4",
    multipart: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  console.log(`${upload.pathname} ${blob.url}`);
}
