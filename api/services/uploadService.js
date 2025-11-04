const dns = require("dns").promises;
const net = require("net");
const ftp = require("basic-ftp");

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

async function checkFtpCredentials( host, user, password ) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  port = 21

  try {
    await client.access({ host, port, user, password });
    await client.close();
    return { success: true, protocol: "ftp", message: "FTP login successful" };
  } catch (err) {
    return { success: false, protocol: "ftp", message: err.message };
  } finally {
    client.close();
  }
}

module.exports = { checkHostExists, checkFtpAndSftpPorts, checkFtpCredentials };