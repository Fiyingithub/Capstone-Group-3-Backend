import webPush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY ;

// Configure VAPID keys
webPush.setVapidDetails(
    'mailto:your-email@example.com', publicVapidKey, privateVapidKey
);

export const sendNotification = async (subscription, payload) => {
    try {
        await webPush.sendNotification(subscription, JSON.stringify(payload));
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
