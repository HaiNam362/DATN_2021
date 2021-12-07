import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(__dirname, '')});// con đường dẫn env 

const TRANSPORTER = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {user: "namnhph11371@fpt.edu.vn", pass: "hainam20192019"},
};

const MAIN_OPTION ={
    from: "NQH-test nodemailLer",
    subject: "test Nodemailer",
    text: "your text is here",
    html: "<h1>hello billy</h1>"
};

const TransporterOptions = {
    ...TRANSPORTER,
    tls:{
        rejectUnauthorized: false,
    },
};

const mainOptions = {
    ...MAIN_OPTION,
},

export {TransporterOptions,mainOptions};