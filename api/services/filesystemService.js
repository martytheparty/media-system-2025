const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);

const INCOMING_DIR = path.resolve(__dirname, '../../incoming');
const allowedExtensions = require('../config/mediaTypes.json');

async function getMediaFiles() {
  try {
    const files = await readdir(INCOMING_DIR);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });
  } catch (err) {
    throw new Error('Unable to read incoming folder');
  }
}

function getIncomingMediaMeta(callback) {
  fs.readdir(INCOMING_DIR, (err, files) => {
    if (err) return callback(err);

    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });

    if (mediaFiles.length === 0) {
      return callback(null, { count: 0, totalSize: 0, totalSizeMb: 0 });
    }

    let totalSize = 0;
    let processed = 0;

    mediaFiles.forEach(file => {
      const fullPath = path.join(INCOMING_DIR, file);
      fs.stat(fullPath, (err, stats) => {
        processed++;
        if (!err && stats.isFile()) {
          totalSize += stats.size;
        }
        if (processed === mediaFiles.length) {
          const totalSizeMb = totalSize / 1024 / 1024;
          callback(null, {
            count: mediaFiles.length,
            totalSize,
            totalSizeMb
          });
        }
      });
    });
  });
}

module.exports = { getMediaFiles, getIncomingMediaMeta };
