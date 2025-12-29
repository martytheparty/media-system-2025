import { JobQueueService } from './services/jobQueueService.js';

console.log('Uploader worker started');

const jobService = new JobQueueService();

let busy = false;
let count = 0;

setInterval(async () => {
  if (busy) return; // skip if still processing
  busy = true;

  try {
    const inProgress = await jobService.hasIncompleteWork();
    if (inProgress) {
      count += 1;
      console.log(`Hello ${count} — found unfinished work`);
      // Here you would call your resumeWork() or processNextFile() logic
    } else {
      console.log('No unfinished work. Idle for now.');
      // Optionally claim new jobs from queued/ here
    }
  } catch (err) {
    console.error('Error in worker loop:', err);
  } finally {
    busy = false;
  }
}, 1000);

process.on('SIGINT', () => {
  console.log('\nUploader worker shutting down');
  process.exit(0);
});
