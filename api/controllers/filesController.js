const { getMediaFiles, getIncomingMediaMeta, checkDirectoryExistence } = require('../services/filesystemService');

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

async function checkTodaysDirectoryExistence(req, res) {
  try {
    // gallery/yyyy/mm/dd today

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(now.getDate()).padStart(2, '0');

    const directory = `../gallery/${year}/${month}/${day}/`;
    const found = await checkDirectoryExistence(directory);
    res.json({found});

  } catch (err) {
    console.error('Error Checking For Directory:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getFiles, getMeta, checkTodaysDirectoryExistence };