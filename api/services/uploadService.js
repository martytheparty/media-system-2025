const dns = require("dns").promises;
const net = require("net");
const ftp = require("basic-ftp");
const SftpClient = require("ssh2-sftp-client");

async function checkHostExists(host) {
  try {
    const { address } = await dns.lookup(host);
    console.log(`Host is valid. IP address: ${address}`);
    return { success: true, message: address };
  } catch (err) {
    console.error(`DNS lookup failed: ${err.message}`);
    return { success: false, message: err.message };
  }
}

/**
 * Checks if the host responds on FTP (21) and/or SFTP (22)
 * Returns an object describing which protocols are open.
 */
async function checkFtpAndSftpPorts(host) {
  const ports = { ftp: 21, sftp: 22 };
  const results = {};

  for (const [protocol, port] of Object.entries(ports)) {
    results[protocol] = await isPortOpen(host, port);
  }

  return results;
}

/**
 * Try to open a TCP connection to a port.
 * Returns true if connection succeeds, false otherwise.
 */
function isPortOpen(host, port, timeout = 3000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    const onError = () => {
      socket.destroy();
      resolve(false);
    };

    socket.setTimeout(timeout);
    socket.once('error', onError);
    socket.once('timeout', onError);

    socket.connect(port, host, () => {
      socket.end();
      resolve(true);
    });
  });
}

async function ftpConnect(host, user, password) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  const port = 21
  await client.access({ host, port, user, password });
  return client; // return the connected client
}

async function sftpConnect(host, username, password) {
  const client = new SftpClient();

  // Optional: enable simple logging (similar to verbose in FTP)
  client.on('ready', () => console.log('SFTP connection ready'));
  client.on('error', err => console.error('SFTP error:', err));

  const port = 22;
  await client.connect({
    host,
    port,
    username,
    password
  });

  return client; // return the connected client
}

async function ftpDisconnect(client) {
  if (!client) return;
  try {
    await client.close();
  } catch (err) {
    console.error("Error closing FTP client:", err.message);
  }
}

async function sftpDisconnect(client) {
  if (!client) return;
  try {
    await client.end();
  } catch (err) {
    console.error("Error closing SFTP client:", err.message);
  }
}

async function checkFtpCredentials( host, user, password ) {
  let client; // declare outside so finally can access it

  try {
    client = await ftpConnect(host, user, password );
    return { success: true, protocol: "ftp", message: "FTP login successful" };
  } catch (err) {
    return { success: false, protocol: "ftp", message: err.message };
  } finally {
    await ftpDisconnect(client);
  }
}

async function uploadFtpFile(host, user, password, localPath, remotePath) {
  let client;
  try {
    client = await ftpConnect(host, user, password);
    await client.uploadFrom(localPath, remotePath);
    return { success: true, message: `Uploaded to ${remotePath}` };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    await ftpDisconnect(client);
  }
}

async function uploadSftpFile(host, user, password, localPath, remotePath) {
  let client;
  try {
    client = await sftpConnect(host, user, password);
    await client.put(localPath, remotePath);
    return { success: true, message: `Uploaded to ${remotePath}` };
  } catch (err) {
    return { success: false, message: err.message };
  } finally {
    await sftpDisconnect(client);
  }
}

async function checkSftpCredentials(host, user, password) {
  const sftp = new SftpClient();
  const port = 22;

  try {
    await sftp.connect({ host, port, username: user, password });
    return { success: true, protocol: "sftp", message: "SFTP login successful" };
  } catch (err) {
    return { success: false, protocol: "sftp", message: err.message };
  } finally {
    try {
      await sftp.end();
    } catch {
      // ignore errors during cleanup
    }
  }
}

async function checkWebsiteUrl(websiteUrl, websiteDirectory, file) {
  const url = `http://${websiteUrl.replace(/\/$/, "")}/${websiteDirectory.replace(/\/$/, "")}/${file}`;

  try {
    const response = await fetch(url, { method: "HEAD" }); // HEAD = faster check
    return response.ok; // true if 200-299
  } catch (error) {
    console.error(`Error checking URL: ${url}`, error);
    return false;
  }
}

module.exports = { 
  checkHostExists, 
  checkFtpAndSftpPorts, 
  checkFtpCredentials,
  checkSftpCredentials ,
  uploadFtpFile,
  checkWebsiteUrl,
  uploadSftpFile
};