import { Workbox } from "workbox-window";

export default function registoreServiceWorker(){
    if ('production' !== process.env.NODE_ENV){
        return
    }

    if('serviceworker' in navigator){
        const wb = new Workbox('sw.js');

        wb.addEventListener('installed',(event) => {

            if(event.isUpdate){
                if(confirm('app is Updated ')){
                    window.location.reload();
                }
            }
        })

        wb.register()
    }
}