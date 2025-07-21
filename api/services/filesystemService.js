const path = require('path');
const fs = require('fs').promises;

const INCOMING_DIR = path.resolve(__dirname, '../../incoming');
const allowedExtensions = require('../config/mediaTypes.json');

async function getMediaFiles() {
  try {
    const files = await fs.readdir(INCOMING_DIR);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });
  } catch (err) {
    throw new Error('Unable to read incoming folder');
  }
}

async function getIncomingMediaMeta() {
  try {
    const mediaFiles = await getMediaFiles();

    if (mediaFiles.length === 0) {
      return { count: 0, totalSize: 0, totalSizeMb: 0 };
    }

    let totalSize = 0;

    for (const file of mediaFiles) {
      const fullPath = path.join(INCOMING_DIR, file);
      try {
        const stats = await fs.stat(fullPath);
        if (stats.isFile()) {
          totalSize += stats.size;
        }
      } catch (err) {
        console.warn(`Failed to stat file ${fullPath}:`, err);
      }
    }

    return {
      count: mediaFiles.length,
      totalSize,
      totalSizeMb: totalSize / 1024 / 1024,
    };
  } catch (err) {
    throw new Error('Unable to read meta data');    
  }
}

module.exports = { getMediaFiles, getIncomingMediaMeta };
