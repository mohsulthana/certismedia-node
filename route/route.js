import express from 'express'
import fire from './fire.js'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import saltedMd5 from 'salted-md5'
import https from 'https'
import fs from 'fs'
import app from '../app.js'
import { getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from 'firebase/storage'
import { getFirestore, collection, getDocs, query, setDoc, doc, serverTimestamp, addDoc } from "firebase/firestore";
import path from 'path'
import csv from 'csvtojson'

var router = express.Router()
var db = getFirestore(fire)
router.use(bodyParser.json())

router.get('/import', async (req, res) => {
    var data = [
        {
            "date_time": "2021-11-18 00:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "1",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1721063",
            "line_id": "239644",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12208057",
            "creative_name": "2910",
            "creative_size": "leaderboard",
            "inventory_id": "2147483647",
            "inventory_name": "tuasaude.com",
            "line_name": "2910_Certis_Bet365_Sports_Desktop_All_Magnite_BR",
            "exchange_name": "Rubicon Project",
            "device_os": "windows"
        },
        {
            "date_time": "2021-11-18 00:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "6",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1721063",
            "line_id": "239644",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12208057",
            "creative_name": "2910",
            "creative_size": "leaderboard",
            "inventory_id": "2147483647",
            "inventory_name": "chess24.com",
            "line_name": "2910_Certis_Bet365_Sports_Desktop_All_Magnite_BR",
            "exchange_name": "SMART RTB",
            "device_os": "android"
        },
        {
            "date_time": "2021-11-18 13:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "1",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1702178",
            "line_id": "239666",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12206094",
            "creative_name": "2918",
            "creative_size": "interstitial_landscape",
            "inventory_id": "2147483647",
            "inventory_name": "Photo Editor Pro 2021",
            "line_name": "2918_Certis_Betano_Sports_All_Users_Apps_All_BR",
            "exchange_name": "AppLovin",
            "device_os": "android"
        },
        {
            "date_time": "2021-11-18 07:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "15",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1680797",
            "line_id": "227697",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12202598",
            "creative_name": "2703",
            "creative_size": "mpu",
            "inventory_id": "2147483647",
            "inventory_name": "as.com",
            "line_name": "2703_Certis_Betano_Sports_Sports_Desktop_PT",
            "exchange_name": "Rubicon Project",
            "device_os": "windows"
        },
        {
            "date_time": "2021-11-18 21:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "1",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1664966",
            "line_id": "238049",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12200843",
            "creative_name": "2703",
            "creative_size": "interstitial",
            "inventory_id": "2147483647",
            "inventory_name": "dn.pt",
            "line_name": "2840_Certis_Betano_Sports_All_Categories_Mobile_PT",
            "exchange_name": "SMART RTB",
            "device_os": "android"
        },
        {
            "date_time": "2021-11-18 05:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "1",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1664966",
            "line_id": "238049",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12200843",
            "creative_name": "2703",
            "creative_size": "interstitial",
            "inventory_id": "2147483647",
            "inventory_name": "dn.pt",
            "line_name": "2840_Certis_Betano_Sports_All_Categories_Mobile_PT",
            "exchange_name": "SMART RTB",
            "device_os": "android"
        },
        {
            "date_time": "2021-11-18 13:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "1",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1702178",
            "line_id": "239666",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12206094",
            "creative_name": "2918",
            "creative_size": "interstitial_landscape",
            "inventory_id": "2147483647",
            "inventory_name": "MasterCraft 2021",
            "line_name": "2918_Certis_Betano_Sports_All_Users_Apps_All_BR",
            "exchange_name": "PubNative",
            "device_os": "android"
        },
        {
            "date_time": "2021-11-18 06:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "24",
            "impressions": "0",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1680797",
            "line_id": "227697",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12202598",
            "creative_name": "2703",
            "creative_size": "mpu",
            "inventory_id": "2147483647",
            "inventory_name": "as.com",
            "line_name": "2703_Certis_Betano_Sports_Sports_Desktop_PT",
            "exchange_name": "Rubicon Project",
            "device_os": "windows"
        },
        {
            "date_time": "2021-11-18 16:00:00",
            "other_conversions": "0",
            "registrations": "0",
            "subscriptions": "0",
            "landings": "0",
            "bids": "34",
            "impressions": "10",
            "clicks": "0",
            "views": "0",
            "completed_views": "0",
            "ctr": "0",
            "campaign_id": "30778",
            "line_creative_id": "1680797",
            "line_id": "227697",
            "campaign_name": "Campaigns - No Cookie Segmentation",
            "creative_id": "12202598",
            "creative_name": "2703",
            "creative_size": "mpu",
            "inventory_id": "2147483647",
            "inventory_name": "marca.com",
            "line_name": "2703_Certis_Betano_Sports_Sports_Desktop_PT",
            "exchange_name": "Rubicon Project",
            "device_os": "windows"
        }
    ]

    await setDoc(doc(db, "/reporting", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
})

router.get('/data', async (req, res) => {
    const allCollection = collection(db, '/reporting')

    let q = query(allCollection)

    const querySnapshot = await getDocs(q)
    const items = []
    querySnapshot.forEach(document => {
        res.send(document.data())
    })
})

router.get('/fetch-data', async (req, res) => {
    fetch('https://api-v2.smadex.com/analytics/reports/async', {
        method: 'POST',
        body: JSON.stringify({
            metrics: [
                "impressions"
            ],
            endDate: '2022-04-18'
        }),
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjIyNzMyNiwiaWF0IjoxNjUwMzc2Mzc5LCJleHAiOjE2ODE5MTIzNzksImF1ZCI6ImFwaS5hY2Nlc3MiLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFjY2VzcyIsImp0aSI6IjI5MTNmZWIwLTI5MzQtNGFjNi1iZWY4LTE0ZmMxMzRmZTBhMCJ9.X0mpLyH-sEI6lYfEjZzF7CRTWUsGPsynfwsO5_8BepQ',
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })
        .catch((error) => {
            console.error(error)
        })
})

router.get('/get-document', async (req, res) => {
    fetch('https://api-v2.smadex.com/analytics/reports/async/825a8113-5ab7-48b7-b0e2-5c82554fd2d3', {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjIyNzMyNiwiaWF0IjoxNjUwMzc2Mzc5LCJleHAiOjE2ODE5MTIzNzksImF1ZCI6ImFwaS5hY2Nlc3MiLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFjY2VzcyIsImp0aSI6IjI5MTNmZWIwLTI5MzQtNGFjNi1iZWY4LTE0ZmMxMzRmZTBhMCJ9.X0mpLyH-sEI6lYfEjZzF7CRTWUsGPsynfwsO5_8BepQ',
            'Accept': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(json => {
            https.get(json.downloadUrl, resp => {
                // store file
                let date = new Date()
                const fileName = './reporting-dsp.csv'
                resp.pipe(fs.createWriteStream(fileName))

                // store data to database
                fs.readFile('./reporting-dsp.csv', (err, data) => {
                    csv().fromFile('./reporting-dsp.csv')
                        .then(resp => {

                            const ref = doc(db, "reporting", "account")

                            setDoc(ref, {
                                email: 'cm176@certismedia.com',
                                password: 'ahahaa',
                                timestamp: serverTimestamp()
                            })

                            const docRef = doc(collection(db, "reporting", "account", "data"))
                            const dataRef = doc(db, "reporting", "account", "data", docRef.id)

                            resp.forEach(element => {
                                // const bart
                                // batch.set(dataRef, {
                                //     date_time: element.date_time,
                                //     impressions: element.impressions,
                                //     account_id: element.account_id,
                                //     timestamp: serverTimestamp()
                                // })
                                addDoc(dataRef, {
                                    date_time: element.date_time,
                                    impressions: element.impressions,
                                    account_id: element.account_id,
                                    timestamp: serverTimestamp()
                                })
                            });
                        })
                })

                // store file to storage
                const name = saltedMd5('default-name', 'SUPER-S@LT!')

                const storage = getStorage(fire)
                const storageRef = ref(storage, `${date.getTime()}-reporting-dsp.csv`)

                const metadata = {
                    contentType: 'text/csv'
                }

                fs.readFile('./reporting-dsp.csv', (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    const buff = Buffer.from(data)

                    uploadBytes(storageRef, buff).then(snapshot => {
                        // complete uploaded
                    })
                })

                // delete local file
                res.send('Done')
            })
        })
})

router.post('/login', async (req, res) => {
    fetch('https://api-v2.smadex.com/login', {
        method: 'POST',
        body: JSON.stringify({
            email: 'cm176@certismedia.com',
            password: '7Hk?rtG61'
        }),
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => console.log(json))
})

export default router