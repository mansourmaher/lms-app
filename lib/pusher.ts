import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer=new PusherServer({
    appId: "1767511",
  key: "297f24e3518931dbba40",
  secret: "7ee0cf248fb2e89f5bcf",
  cluster: "eu",
  useTLS: true
});
   

export const pusherClient=new PusherClient("297f24e3518931dbba40", {
    cluster: 'eu',
    forceTLS: true
    
    });
