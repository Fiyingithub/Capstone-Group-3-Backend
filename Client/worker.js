
export const subscribeToNotifications = async (serviceWorkerRegistration, serverUrl) => {
    try {
        const subscription = await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BPEIHFEVb0_ekT2t6wStxNd8PLtvM-bFxwEDou2Z3fFwYVG_UsKMQ6G6yeGF2h_A05-V0_dcDw9H2IisY0SKpcs'
        });

        // Save subscription to the server
        await fetch(`${serverUrl}/api/notifications/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription),
        });

        console.log('User subscribed to notifications');
    } catch (error) {
        console.error('Error subscribing to notifications:', error);
    }
};
