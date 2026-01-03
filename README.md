# JusticeLink: Pro-Bono Eligibility Screener (POC)

JusticeLink is a lightweight full-stack proof-of-concept system that allows intake officers at legal-aid clinics to quickly determine wheter a client is financially eligible for pro-bono services using 125% of the 2024 Federal Poverty Level (FPL) guidelines.


This POC includes:

- Eligibility Engine (Node.js)
- Intake Form (HTML+CSS+JS)
- Data Persistance (SQLite)
- Review Dashboard (password protected)
- Deployment-ready configuration (Railway)


## Setup and Requirement (Local Development)
This project needs Node.js 20+

1. Clone this repository
```bash
git clone https://github.com/ydatech/justicelink-poc.git

cd justicelink-poc
```

2. Install dependencies
```bash
npm install
```

3. Copy and configure environment variables `.env`
```bash
cp .env.example .env
```
Please update `PORT` and `ADMIN_PASSWORD` variables


4. Run the app
```bash
node server.js
```


## Deploy to Railway

1. Push your clone to your own GitHub repo
2. Go to https://railway.com
3. Deploy new project
4. Choose GitHub repository
5. SignIn to your GitHub
6. Choose the repo
7. Create project and wait until deployment succeed
8. Change enviroment variable `ADMIN_PASSWORD`
9. Setup public networking in Settings tab and generate Domain
10. Example deployment on Railway can be accessed: [https://justicelink-poc-production.up.railway.app](https://justicelink-poc-production.up.railway.app)
