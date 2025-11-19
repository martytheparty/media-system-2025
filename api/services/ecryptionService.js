const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Recommended for GCM
const AUTH_TAG_LENGTH = 16;

function createKey(title, host, remoteDirectory, websiteUrl, websiteDirectory, transferProtocal, key) {
  return title + host + remoteDirectory + websiteUrl + websiteDirectory + transferProtocal + key;
}

/**
 * Derive a 32-byte key from a user-supplied key (string).
 * Ensures consistent key size for AES-256.
 */
function deriveKey(keyString) {
  return crypto.createHash('sha256').update(String(keyString)).digest();
}

/**
 * Encrypt a string using AES-256-GCM.
 * @param {string} text - The plain text to encrypt.
 * @param {string} keyString - The user-supplied key.
 * @returns {string} Base64-encoded encrypted data.
 */
function encrypt(text, keyString) {
  const key = deriveKey(keyString);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const authTag = cipher.getAuthTag();

  // Combine IV + AuthTag + Ciphertext → Base64
  return Buffer.concat([iv, authTag, Buffer.from(encrypted, 'base64')]).toString('base64');
}

/**
 * Decrypt a previously encrypted string.
 * @param {string} encryptedText - Base64-encoded encrypted data.
 * @param {string} keyString - The same key used during encryption.
 * @returns {string} Decrypted text.
 */
  function decrypt(encryptedText, keyString) {
    const key = deriveKey(keyString);
    const data = Buffer.from(encryptedText, 'base64');

    const iv = data.subarray(0, IV_LENGTH);
    const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const ciphertext = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

module.exports = { encrypt, decrypt, createKey };
