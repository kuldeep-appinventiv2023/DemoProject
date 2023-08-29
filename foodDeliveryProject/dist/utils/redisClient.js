"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToRedis = exports.getFromRedis = exports.connectToRedis = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
async function connectToRedis() {
    await client.connect();
}
exports.connectToRedis = connectToRedis;
async function getFromRedis(key) {
    return await client.get(key);
}
exports.getFromRedis = getFromRedis;
async function setToRedis(key, value) {
    await client.set(key, value);
}
exports.setToRedis = setToRedis;
//# sourceMappingURL=redisClient.js.map