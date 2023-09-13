import { createClient } from "redis";

const client = createClient();

export async function connectToRedis() {
  await client.connect();
}

export async function getFromRedis(key: string) {
  return await client.get(key);
}

export async function setToRedis(key: string, value: string) {
  await client.set(key, value);
}
