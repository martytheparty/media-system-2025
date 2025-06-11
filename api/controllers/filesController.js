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

function getMeta(req, res) {
  getIncomingMediaMeta((err, meta) => {
    if (err) {
      console.error('Error reading incoming folder:', err);
      return res.status(500).json({ error: 'Unable to read incoming folder' });
    }
    res.json(meta);
  });
};

module.exports = { getFiles, getMeta };