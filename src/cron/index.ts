import { AppDataSource } from "../data-source"


const schedule = require('node-schedule');



const get = async() => {
    const get = await AppDataSource.manager.query(`update sessions set is_remote = 0 WHERE timestamp < DATE_SUB(NOW(), INTERVAL '1' HOUR) and is_remote = 1`)
    console.log(get)
    console.log("running cron job update session robo")

}

AppDataSource.initialize()
.then(()=>{get()})
.catch((err)=> {
    console.error(`error :`,err)
})

// const testt = () => {
//     const get = async() => {
//         const get = await AppDataSource.manager.query(`SELECT * FROM sessions`)
//         console.log(get)
//     }
    
//     AppDataSource.initialize()
//     .then(()=>{get()})
//     .catch((err)=> {
//         console.error(`error :`,err)
//     })
// }

schedule.scheduleJob('*/60 * * * * *', get)
