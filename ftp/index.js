import fs from 'fs';
import FtpSrv from 'ftp-srv';
import path from 'path';
import { fileURLToPath } from 'url';

// Needed for __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, './uploads');

const ftpServer = new FtpSrv({
  url: 'ftp://127.0.0.1:21',
  anonymous: false,
  greeting: ['Welcome to the local FTP server!']
});

ftpServer.on("login", ({ username, password }, resolve, reject) => {
  // simple authentication
  if (username === "test" && password === "1234") {
    const rootDir = path.resolve("uploads");
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir, { recursive: true });
    }
    resolve({ root: rootDir });
  } else {
    reject(new Error("Invalid credentials"));
  }
});

ftpServer.listen()
  .then(() => console.log('FTP server running at ftp://127.0.0.1:21'));
