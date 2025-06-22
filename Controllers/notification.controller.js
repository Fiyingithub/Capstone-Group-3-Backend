import { sendNotification } from '../Services/notification.service.js';
import { getSubscriptions } from '../Models/notification.model.js';

export const triggerNotifications = async (req, res) => {
    const payload = { title: 'Reminder!', body: 'Time to check your expenses!' };
    const subscriptions = await getSubscriptions();

    for (const subscription of subscriptions) {
        await sendNotification(subscription, payload);
    }

    res.status(200).json({ message: 'Notifications sent!' });
};
