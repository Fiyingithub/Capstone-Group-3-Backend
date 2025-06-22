import cron from 'node-cron';
import { task } from '../Middlewares/dailyNoltification.js';

// scheduling daily notification reminder at 8AM and 8PM

cron.schedule(' 8,20 * * *', () => {



});