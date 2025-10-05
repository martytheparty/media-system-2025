const { 
  checkFileExistence, 
  createJsonFile, 
  getFileJsonContent,
  getMediaFiles,
  getTodaysDirectoryName,
  getDirectoryCount,
  createDirectory, 
  moveFileToDir,
  updateManifest,
  setFtpConfig
} = require('../services/filesystemService');
const galleryPath = '../gallery/gallery.json';

async function initialize(req, res) {
  const { name } = req.body;

  if (typeof name === 'string') {

    let fileExists = await checkFileExistence(galleryPath);

    if (fileExists) {
      res.status(409).json({ error: 'File already exists' });
    } else {
      const gallery = { title: name, events: [] };
      await createJsonFile(galleryPath, gallery);
      fileExists = await checkFileExistence(galleryPath);

      res.json(fileExists); // return true as JSON response
    }
  } else {
    res.status(400).json({ error: 'Invalid request. Expected { name: string }' });
  }
}

async function setTitle(req, res) {
  const { name } = req.body;

  if (typeof name === 'string') {

    let fileExists = await checkFileExistence(galleryPath);

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
  const fileExists = await checkFileExistence(galleryPath);

  res.json(fileExists); // return true as JSON response
}

async function getTitle(req, res) {
  const fileExists = await checkFileExistence(galleryPath);
  const gallery = await getFileJsonContent(galleryPath);

  res.json(gallery.title); // return true as JSON response
}

async function importMedia(req, res) {

  // 1. Make sure the application has been initialized before importing
  let fileExists = await checkFileExistence(galleryPath);

    if (!fileExists) {
      res.status(503).json({ error: 'The application has not been initialized yet' });
    } 


  // 1. Get all of the files in the incoming folder
  const files = await getMediaFiles();

  if (files.length === 0) {
    res.json({imported: false});
  } else {
    // 2. Get the folder for today
    const directory = getTodaysDirectoryName();

    // 3. See if the folder exists
    const exists = await checkFileExistence(directory);


    // 4. If not create it and create a first directory
    if (exists) {
      console.log("directory already exists");
    } else {
      await createDirectory(directory);
    }

    // 5. Get current folder count
    const count = await getDirectoryCount(directory) + 1;
    const nextDirectory = `${directory}${count}`;

    // 6. If yes then find out what the next directory needs to be and make it

    await createDirectory(nextDirectory);

    // 7. Get List Of Files In Incoming Directory

    const fileList = await getMediaFiles();
    
    // 7. Move all of the files into the new directory

    const title = nextDirectory.replace(/^[.\/]+/, '').replace(/\//g, '-');

    const filePathList = fileList.map( (fileName) => {
      return nextDirectory.replace('..','') + '/' + fileName;
    } );

    updateManifest(title, filePathList);

    fileList.forEach( 
      (file) => {
        moveFileToDir(file, nextDirectory);
      }
    );
    
    res.json({imported: true});
  }

}

async function getGalleryData(req, res) {
  const gallery = await getFileJsonContent(galleryPath);
  res.json(gallery); // return true as JSON response
}

async function setConfig(req, res) {
  const { title, url, directory, pw } = req.body;

  if (
    typeof title === 'string'
    && typeof url === 'string'
    && typeof directory === 'string'
    && typeof pw === 'string'
  ) {

    // Create a JSON object
    const ftpConfig = {
      title,
      url,
      directory,
      pw
    };

      const config = await setFtpConfig(ftpConfig);
      res.json({ config }); 
  } else {
    res.status(400).json({ error: 'Invalid request. Expected { title, url, directory, pw }' });
  }
}

module.exports = { 
  initialize,
  isInitialized,
  setTitle,
  getTitle,
  importMedia,
  getGalleryData,
  setConfig
};