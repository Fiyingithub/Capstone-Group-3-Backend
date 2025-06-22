import express from 'express';
import webpush from 'web-push';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { title } from 'process';


const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY ;
app.use(express.static(path.join(__dirname, 'client')));
webpush.setVapidDetails('mailto:trackwise@gmail.com', publicVapidKey, privateVapidKey);
//  i might only need the send notification and payload not the entire route
// Reminder route
app.post('/remind', (req, res) => {

    //get pushReminder object

    const reminder = req.body;

    // send 201 - resource created
    res.status(201).json({});


    // create payload

    const payload = JSON.stringify({title: 'Daily Reminder'}); 


    webpush.sendNotification(reminder, payload).catch(err => console.error(err));





});