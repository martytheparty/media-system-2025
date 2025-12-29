// services/jobQueueService.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class JobQueueService {
  constructor(processingFolder = path.join(__dirname, '../processing')) {
    this.processingFolder = processingFolder;
  }

  /**
   * Checks if there are any files in the processing folder
   * @returns {Promise<boolean>} true if files exist, false if empty
   */
  async hasIncompleteWork() {
    try {
      const files = await fs.readdir(this.processingFolder);
      const fileCount = files.filter(f => f !== '.' && f !== '..').length;
      return fileCount > 0;
    } catch (err) {
      console.error('Error checking processing folder:', err);
      // Conservatively assume work is in progress if folder cannot be read
      return true;
    }
  }
}
