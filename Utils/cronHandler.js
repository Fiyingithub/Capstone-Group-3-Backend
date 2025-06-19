import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

cron.schedule('0 8 * * *', async () => {
  console.log('[CRON] Triggering daily reminder at 8AM');
  try {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/notifications/send-daily-reminder`
    );
    console.log('Cron Success:', res.data);
  } catch (err) {
    console.error('Cron Error:', err.message);
  }
});


