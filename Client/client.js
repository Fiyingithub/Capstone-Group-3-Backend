const publicVapidKey = "BPEIHFEVb0_ekT2t6wStxNd8PLtvM-bFxwEDou2Z3fFwYVG_UsKMQ6G6yeGF2h_A05-V0_dcDw9H2IisY0SKpcs"

// confirm ServiceWorker 

if ('serviceWorker' in navigator){
    send().catch(err => console.error());
}

// REGISTER SW register push, send push

async function send(){
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });


    // register push 
    const reminder = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey: publicVapidKey
    });

    // sending push 

    await fetch ('/reminder', {
        method: 'POST',
        body: JSON.stringify(reminder),
        headers: {
            'content-type' : 'application/json'
        }

    });
}