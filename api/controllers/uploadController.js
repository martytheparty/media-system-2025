const { 
  checkHostExists, checkFtpAndSftpPorts
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

module.exports = {
    checkForHostExistence,
    checkProtocols
};