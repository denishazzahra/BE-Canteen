const crypto = require('crypto')
const algorithm = process.env.ENCRYPTION_ALGORITHM;
const encryption_key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const encryption_iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

const encryptText = (text) => {
  const cipher = crypto.createCipheriv(algorithm, encryption_key, encryption_iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

const decryptText = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, encryption_key, encryption_iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {encryptText, decryptText};