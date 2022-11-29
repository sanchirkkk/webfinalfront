import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home2.module.css'
import Router, { withRouter } from 'next/router'
import { User, Dropdown, Button, Table, Modal, Text, Row, Input, useAsyncList } from "@nextui-org/react";
import Cookie from "js-cookie"
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Doughnut, Line, Radar,Bar ,Scatter,Pie} from 'react-chartjs-2';
import 'chart.js/auto';
import Loading from '../components/loading.js';


export default function comprise() {

    // DATA 
    const [loadingschck,setLoadingCheck] = useState(true)
    let option_id1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const year = ["2019", "2020", "2021", "2022"]
    // let env = 'http://localhost:5001/'
    let env = 'https://sanchirsfinanceback.vercel.app/'
    const [inputValues, setInputValues] = useState({})
    const [monthloop, setloop] = useState(option_id1)
    const [dataAv, setdataAv] = useState(false)
    const [dataAv1, setdataAv1] = useState(false)
    const [userData, setUserdata] = useState()
    const [incomed,setincomed] = useState()
    const [addd,setaddd] = useState()
    const [checker,setchecker] = useState(false)
    const [sD, setSd] = useState('2021')
    const [eD, setEd] = useState('2022')
    const [Doughnutdata, setDouData] = useState({})
    const [Lines, setLines] = useState({})
    const [radars, setRadars] = useState({})

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const a = Cookie.get("Token")




    //FUNCTIONS

    const getdata = () => {
        let ch = false
        setLoadingCheck(true)
        axios.get(env + 'datas?userid=' + a)
            .then((res) => {
                if (res.data != "nondata") {
                    console.log(res.data)
                    setLines(lineDevider(res.data))
                    setDouData(inc(res.data))
                    setRadars(scat(res.data))
                    setaddd(allda(res.data))
                    setdataAv(true)
                   
                } else {
                    setdataAv(false)
                }
                setLoadingCheck(false)
            }).catch((err) => {
                console.log(err)
                setdataAv(false)
                setLoadingCheck(false)
            })
    
        
    }
    
    useEffect(() => {
        getdata()

    }, [])

    function lineDevider(data){
        let incomes = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, }
        let withd = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, }

        data.map((item)=>{
            let year =item.date.split('-')[0]
            let month = item.date.split('-')[1]
            if(item.type == "withdraw"){
                if( year == '2022'){
                    withd[month] = withd[month] + item.sale
                }
            } else{
                if( year == '2022'){
                    incomes[month] = incomes[month] + item.sale
                }
            }
           
        })

        return {
            labels: Object.keys(incomes),
            datasets: [
              {
                label: 'Зарлага',
                data: Object.values(withd),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Орлого',
                data: Object.values(incomes),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ]
          }
    }

    function inc(data){

        let incomes = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, }
        let withd = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, }
        let awithd = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, }
        data.map((item)=>{
            let year =item.date.split('-')[0]
            let month = item.date.split('-')[1]
            if(item.type == "withdraw"){
                if( year == '2022'){
                    withd[month] = withd[month] + item.sale
                }
            } else{
                if( year == '2022'){
                    incomes[month] = incomes[month] + item.sale
                }
            }
           
        })
        
        monthloop.map((e)=>{
            awithd[e] = incomes[e] - withd[e]
        })
        


        return {
            labels:Object.keys(awithd),
            datasets:[
            { label: 'Цэвэр үлдэгдэл',
            data: Object.values(awithd) ,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'}]
        }
    }


    function scat(data){
        let option_id1 = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        let con = []
        data.map((item)=>{
            let year =item.date.split('-')[0]
            let month = item.date.split('-')[1]
            if(item.type == "withdraw"){
                if( year == '2022'){
                   
                    if(item.sale > 200000){
                        let month = item.date.split('-')[1]
                        let dict = {}
                        dict['x'] = month ;
                        dict['y'] = item.sale;
                        con.push(dict)
                    }
                 
                }
            } 
           
        })

        console.log(con)
        return {
        datasets: [
          {
            label: 'Өндөр дүнтэй худалдан авалт сараар',
            data:con ,
            backgroundColor: 'rgba(5, 246, 206 )',
          },
        ],}
    }
    function allda(item){
        let income = 0, withd = 0
        item.map((e) => {

            let year =e.date.split('-')[0]
            if (year == "2022"){
                if (e.type != "withdraw") {
                    income = income + e.sale
                } else {
                    withd = withd +e.sale
                }
            }
            
            
        })

        let datassss = {
            labels: [
                'Орлого',
                'Зарлага',
            ],
            datasets: [{
                data: [income, withd],
                backgroundColor: [
                    'rgba(54, 162, 235  ,0.5)',
                    'rgba(255, 99, 132  ,0.5)',
                  
                
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                   
                
                ],
                borderWidth: 2,
                borderColor:"none"
            }]
        };
        return datassss

        
    }

    

    return (
        <div className={styles.container}>
            {!loadingschck&&<main className={styles.main}>

                <Row css={{ display: "flex", "flex-direction": "column" }}>
                    <div className={styles.rows}>
                <Row>2022 оны орлого зарлагын харьцуулалт</Row>
                <br/>
                   {dataAv&& <Bar  data={Lines} />}

                    </div>
                    <div className={styles.rows}>
                        <Row>2022 оны нийт орлого зарлага</Row>
                    {/* <br/> */}
                    {dataAv&& <Doughnut  data={addd} />}
                    </div>
                </Row>
                <Row css={{ display: "flex", "flex-direction": "column" }}>
                    <div className={styles.rows}>
                    <div>2022 оны өөрийн орлогын харьцаа</div>
                    <br/>
                    {dataAv&& <Line  data={Doughnutdata} />}
                    </div>
                    <div className={styles.rows} css={{display:"flex","justify-content":"center"," align-items": "center"}}>
                    <Row>2022 оны хэт өндөр дүнтэй зарлага </Row>
                <br/>
                   {dataAv&& <Scatter data={radars} />}
                    </div>
                </Row>





            </main>}
            {loadingschck&&<Loading/>}


        </div>
    )
}
