const { checkFileExistance, createJsonFile, getFileJsonContent } = require('../services/filesystemService');
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

module.exports = { 
  initialize,
  isInitialized,
  setTitle,
  getTitle
};