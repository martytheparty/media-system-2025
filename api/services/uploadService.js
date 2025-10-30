const dns = require("dns").promises;

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

module.exports = { checkHostExists };