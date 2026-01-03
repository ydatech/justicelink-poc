const express = require("express");
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static("public"))


// DB using SQLite
const db = require("./db");


// FPL 2024 
// ref: https://aspe.hhs.gov/sites/default/files/documents/7240229f28375f54435c5b83a3764cd1/detailed-guidelines-2024.pdf
const FPL_2024_100 = {
    1: 15060,
    2: 20440,
    3: 25820,
    4: 31200,
}

const ADDITIONAL_PERSON = 5380;

function getFPL125(size){
    if(size <= 4){
        return FPL_2024_100[size] * 1.25;
    }

    return (FPL_2024_100[4] + ((size -8)* ADDITIONAL_PERSON)) * 1.25;
}

// API for submitting screening

app.post("/api/screen",(req,res)=>{
    
    // extract req body
    const {name, householdSize, income} = req.body;

    // eligibility based on FPL 2024 125%
    const limit = getFPL125(householdSize);
    const eligible = income <= limit;

    if(!name || householdSize <= 0 || income <0){
        return res.status(400).json({error: "Invalid Input."});
    }

    // create screening record
    const record = {
        name,
        householdSize,
        income,
        limit: Math.round(limit),
        result: eligible ? "Eligible": "Ineligible",
        timestamp: new Date().toISOString()
    }

    // insert into db
    db.insert(record)

    res.json(record);

});


// Admin Dashboar Page Data (Protected)

app.get("/api/admin",(req,res)=>{
    const password = req.headers["x-admin-password"];

    if(password !== process.env.ADMIN_PASSWORD){
        return res.status(401).json({error: 'Unauthorized'});
    }

    const data = db.getAll();

    res.json(data);

})



app.listen(PORT,()=>{
    console.log(`JusticeLink POC running on http://localhost:${PORT}`)
});

