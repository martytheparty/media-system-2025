const { 
  checkFileExistence, 
  createJsonFile, 
  getFileJsonContent,
  getMediaFiles,
  getTodaysDirectoryName
} = require('../services/filesystemService');
const galleryPath = '../gallery/gallery.json';

async function initialize(req, res) {
  const { name } = req.body;

  if (typeof name === 'string') {

    let fileExists = await checkFileExistance(galleryPath);

    if (fileExists) {
      res.status(409).json({ error: 'File already exists' });
    } else {
      const gallery = { title: name, directories: [] };
      await createJsonFile(galleryPath, gallery);
      fileExists = await checkFileExistance(galleryPath);

      res.json(fileExists); // return true as JSON response
    }
  } else {
    res.status(400).json({ error: 'Invalid request. Expected { name: string }' });
  }
}

async function setTitle(req, res) {
  const { name } = req.body;

  if (typeof name === 'string') {

    let fileExists = await checkFileExistance(galleryPath);

    if (fileExists) {
      // const gallery = { title: name, directories: [] };
      // await updateJsonFile(galleryPath, gallery);
      const gallery = await getFileJsonContent(galleryPath);
      gallery.title = name;
      console.log(gallery);

      createJsonFile(galleryPath, gallery);

      res.json(gallery); 
    } else {
      res.status(409).json({ error: 'File Does Not Exist Yet' });
    }
  } else {
    res.status(400).json({ error: 'Invalid request. Expected { name: string }' });
  }
}

async function isInitialized(req, res) {
  const fileExists = await checkFileExistance(galleryPath);

  res.json(fileExists); // return true as JSON response
}

async function getTitle(req, res) {
  const fileExists = await checkFileExistance(galleryPath);
  const gallery = await getFileJsonContent(galleryPath);

  res.json(gallery.title); // return true as JSON response
}

async function importMedia(req, res) {
  // 1. Get all of the files in the incoming folder
  const files = await getMediaFiles();
  console.log("The files...", files);

  // 2. Get the folder for today
  const directory = getTodaysDirectoryName();

  // 3. See if the folder exists
  const exists = await checkFileExistence(directory);

  console.log('exists', exists);

  // 4. If not create it and create a first directory
  if (exists) {
    console.log("get the next directory");
  } else {
    console.log("create today's directory");
  }

  // 5. If yes then find out what the next directory needs to be and make it

  // 6. Move all of the files into the new directory
  
  res.json({imported: true});
}

module.exports = { 
  initialize,
  isInitialized,
  setTitle,
  getTitle,
  importMedia
};