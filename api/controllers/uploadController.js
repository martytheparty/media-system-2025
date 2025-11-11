const { 
  checkHostExists, 
  checkFtpAndSftpPorts, 
  checkFtpCredentials,
  checkSftpCredentials
} = require('../services/uploadService');

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
    const { hostName, userName, userPassword } = req.body;

    const exists = await checkFtpCredentials(hostName, userName, userPassword);

    res.json(exists);
}

async function checkSftpCreds(req, res) {
    const { hostName, userName, userPassword } = req.body;

    const exists = await checkSftpCredentials(hostName, userName, userPassword);

    res.json(exists);
}

module.exports = {
    checkForHostExistence,
    checkProtocols,
    checkFtpCreds,
    checkSftpCreds
};