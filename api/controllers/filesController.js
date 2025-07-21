const { getMediaFiles, getIncomingMediaMeta } = require('../services/filesystemService');

async function getFiles(req, res) {
  try {
    const mediaFiles = await getMediaFiles();
    res.json({ files: mediaFiles });
  } catch (err) {
    console.error('Error getting media files:', err);
    res.status(500).json({ error: err.message });
  }
};

async function getMeta(req, res) {
  try {
    const meta = await getIncomingMediaMeta();
    res.json(meta);
  } catch (err) {
    console.error('Error getting meta data:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getFiles, getMeta };