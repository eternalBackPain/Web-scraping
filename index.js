// Following tutorial from https://www.youtube.com/watch?v=-3lqUHeZs_0&ab_channel=CodewithAniaKub%C3%B3w but with another website

//cheerio is used to access html elements
//axios used to make http requests from node: https://www.npmjs.com/package/axios
//express is used for the framework
//in package.json file: add a script <"start": "nodemon index.js"> instead of running "node index.js" in the terminal to auto update upon saving. To start it off run command "npm run start"

//Bring in packages for use
const axios = require('axios')
const cheerio = require('cheerio');
const express = require('express');
const app = express();
app.listen(3000, () => console.log('heello server running test'))


//Pulling the entire html
const url = "https://www.caselaw.nsw.gov.au/browse?display=all#sort:decisionDate,desc,decisionDate,desc;courts:54a634063004de94513d8278;years:2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998;startsWith:a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0-9;page:0"
axios(url).then(response => {
    const html = response.data //load the response of the GET request
    // console.log(html)
    const $ = cheerio.load(html) //loads the entire html into cheerio
    const cases = []

    $('.row.result', html).each(function() { //go over each row result (replace any space in classname with a dot)
        const caseName = $(this).find('h4').text().trim() //use cheerio to traverse DOM
        const url = "https://www.caselaw.nsw.gov.au" + $('h4').find('a').attr('href')
        const catchwords = $(this).find('p').last().text().trim()
        cases.push({
            caseName,
            url,
            catchwords
        })
    })
    console.log(cases)

    //NOW IDK HOW TO BRING THIS INTO THE CLIENT TO INTERACT WITH

})