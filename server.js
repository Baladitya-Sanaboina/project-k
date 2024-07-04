const express = require('express')
const path = require('path')
const dbpath = path.join(__dirname, 'data.db')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
let db = null
const https = require('https')

const connectDbAndServer = async() =>{
    try{
        db = await open(
        {
            filename:dbpath,
        driver: sqlite3.Database
        }
    )
    app.listen(3000, ()=>{
        console.log(`Server is running on port 3000`)
    })
    }catch(e){
        console.log(`Database error ${e}`)
        proceess.exit(1)
    }
}
connectDbAndServer()

let get_data = ''

https.get('https://api.wazirx.com/api/v2/tickers/' ,(response)=>{
    response.on('data', (chunk)=>{
        get_data += chunk
    })
})
.on('error',(error)=>{
    console.log(error)
})

app.get('/data', (request, response)=>{
    let data = JSON.stringify(get_data)
    let listed_data = JSON.parse(data)

    response.send(listed_data)
})