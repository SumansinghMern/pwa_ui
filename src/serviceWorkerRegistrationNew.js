import { Workbox } from "workbox-window";

export default function registoreServiceWorker(){

    console.log('serviceWorker' in navigator,'---------1111111111111111111111', 'production' !== process.env.NODE_ENV)
    if ('production' !== process.env.NODE_ENV){
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb')
        return
    }

    if ('serviceWorker' in navigator){
        const wb = new Workbox('sw.js');
        console.log('-2222222222222222222')

        wb.addEventListener('installed',(event) => {
            console.log('333333333333333333333333333333')

            if(event.isUpdate){
                if(confirm('app is Updated ')){
                    window.location.reload();
                }
            }
        })

        wb.register()
    }else{
        console.log('service Worker is not there...')
    }
}