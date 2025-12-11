const ftpConfigPath = './config/config.json';

const { 
  checkHostExists, 
  checkFtpAndSftpPorts, 
  checkFtpCredentials,
  checkSftpCredentials,
  uploadFtpFile,
  uploadSftpFile,
  checkWebsiteUrl
} = require('../services/uploadService');

const { 
  checkFileExistence, 
  getFileJsonContent,
  generateGalleryTestFile
} = require('../services/filesystemService');

const { tryDecrypt, createKey } = require('../services/ecryptionService');

async function checkForHostExistence(req, res) {
    const { hostName } = req.body;
    const exists = await checkHostExists(hostName);

    res.json(exists);
}

async function checkProtocols(req, res) {
    const { hostName } = req.body;
    const exists = await checkFtpAndSftpPorts(hostName);

    res.json(exists);
}

async function checkFtpCreds(req, res) {
    const { key } = req.body;

    // get all of the data so the key can be generated.

    let fileExists = await checkFileExistence(ftpConfigPath);
    let config = {};

    if (fileExists) {
        config = await getFileJsonContent(ftpConfigPath);
    }

    const title = config.title;
    const host = config.host;
    const remoteDirectory = config.remoteDirectory;
    const pw = config.pw;
    const websiteUrl = config.websiteUrl;
    const websiteDirectory = config.websiteDirectory;
    const transferProtocal = config.transferProtocal;
    const userName = config.userName;
    const keyString = createKey(title, host, remoteDirectory, websiteUrl, websiteDirectory, transferProtocal, key);
    const userPassword = tryDecrypt(pw, keyString);

    let exists = false;
    if(userPassword) {
        exists = await checkFtpCredentials(host, userName, userPassword);
    } else {
        exists = {
            message: "Login Failure",
            protocal: "ftp",
            success: false
        }
    }

    res.json(exists);
}

async function uploadTestFtpUpload(req, res) {
    const { key } = req.body;

    // get all of the data so the key can be generated.

    let fileExists = await checkFileExistence(ftpConfigPath);
    let config = {};

    if (fileExists) {
        config = await getFileJsonContent(ftpConfigPath);
    }

    const title = config.title;
    const host = config.host;
    const remoteDirectory = config.remoteDirectory;
    const pw = config.pw;
    const websiteUrl = config.websiteUrl;
    const websiteDirectory = config.websiteDirectory;
    const transferProtocal = config.transferProtocal;
    const userName = config.userName;
    const keyString = createKey(title, host, remoteDirectory, websiteUrl, websiteDirectory, transferProtocal, key);
    const userPassword = tryDecrypt(pw, keyString);


    let exists = false;
    if(userPassword) {
    

        const result = await generateGalleryTestFile();
                let remotePath = result.filename;

        if(remoteDirectory.length > 0) {
            remotePath = `${remoteDirectory}/${remotePath}`;
        }

        let uploadFtpResult = {};
        if (transferProtocal === 'ftp') {
            uploadFtpResult = await uploadFtpFile(host, userName, userPassword, result.filePath, remotePath);
        } else  {
            // uploadSftpFile(host, user, password, localPath, remotePath)
           uploadFtpResult = await uploadSftpFile(host, userName, userPassword, result.filePath, remotePath);

        }

        const websiteResult = await checkWebsiteUrl(websiteUrl, websiteDirectory, result.filename);

        exists = {
            message: "Login Success is " + websiteResult,
            protocal: "ftp",
            success: websiteResult
        }    

        // exists = await checkFtpCredentials(host, userName, userPassword);
    } else {
        exists = {
            message: "Upload Failure",
            protocal: "ftp",
            success: false
        }
    }

    res.json(exists);
}

async function checkSftpCreds(req, res) {
    const { key } = req.body;

    // get all of the data so the key can be generated.

    let fileExists = await checkFileExistence(ftpConfigPath);
    let config = {};

    if (fileExists) {
        config = await getFileJsonContent(ftpConfigPath);
    }

    const title = config.title;
    const host = config.host;
    const remoteDirectory = config.remoteDirectory;
    const pw = config.pw;
    const websiteUrl = config.websiteUrl;
    const websiteDirectory = config.websiteDirectory;
    const transferProtocal = config.transferProtocal;
    const userName = config.userName;

    //let keyString = "";
    const keyString = createKey(title, host, remoteDirectory, websiteUrl, websiteDirectory, transferProtocal, key);
    const userPassword = tryDecrypt(pw, keyString);
    const exists = await checkSftpCredentials(host, userName, userPassword);

    res.json(exists);
}

module.exports = {
    checkForHostExistence,
    checkProtocols,
    checkFtpCreds,
    checkSftpCreds,
    uploadTestFtpUpload
};