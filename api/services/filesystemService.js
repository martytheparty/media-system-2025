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

async function moveFileToDir(srcFile, destDir) {
  try {
    const destPathFile = destDir + '/' + srcFile;
    // Move (rename) the file
    await fs.rename(INCOMING_DIR + '\\' + srcFile, destPathFile);

  } catch (err) {
    // If rename fails across devices, fall back to copy + unlink
    if (err.code === 'EXDEV') {
      await fs.copyFile(srcFile, destFile);
      await fs.unlink(srcFile);
      console.log(`Moved (copy+delete) ${srcFile} -> ${destFile}`);
    } else {
      console.error('Error moving file:', err);
    }
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

async function checkFileExistence(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function checkDirectoryExistence(path) {
  return await checkFileExistence(path);
}

async function createJsonFile(filePath, data) {
  try {
    const jsonString = JSON.stringify(data, null, 2); // pretty print with 2-space indent
    await fs.writeFile(filePath, jsonString, 'utf8');
    console.log('JSON file created');
  } catch (err) {
    console.error('Failed to write JSON file:', err);
    throw err;
  }
}

async function getFileJsonContent(filePath) {
   try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    throw error;
  }
}

async function getDirectoryCount(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    // filter only directories
    const directories = entries.filter(entry => entry.isDirectory());
    return directories.length;
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
    return 0;
  }
}

function getTodaysDirectoryName() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(now.getDate()).padStart(2, '0');

  const directory = `../gallery/${year}/${month}/${day}/`;

  return directory;  
}

async function createDirectory(directory) {
  directory = `../gallery/${directory}/`;

  const exists = await checkDirectoryExistence(directory);

  let created = true;

  if (!exists) {

    try {
      await fs.mkdir(directory, { recursive: true });
    } catch (err) {
      console.error('Error creating directory:', err);
      created = false;
    }
  }

  return created;

}


module.exports = { 
  getMediaFiles,
  getIncomingMediaMeta,
  checkFileExistence,
  createJsonFile,
  getFileJsonContent,
  checkDirectoryExistence,
  getDirectoryCount,
  getTodaysDirectoryName,
  createDirectory,
  moveFileToDir
};
