import nodemailer  from 'nodemailer'
import path  from 'path'
import ejs from 'ejs'
import {htmlToText} from 'html-to-text'
import juice  from 'juice'
import {TransporterOptions,mainOptions} from '../configs/nodemailer.config.js'
import fs from 'fs'


const senMail = (options) => {
    let {type, content , from , mailReceiver} = options;
    const templatePath = 
    type === 1 
    ? path.resolve(__dirname, '../../public/_views/form.html')
    : path.resolve(__dirname, '../../public/_views/form2.html')

    const templateVars = {
        content: options.content,
    }
    const template = fs.readFileSync(templatePath,"utf-8");
    const html = ejs.render(template,templateVars);
    const text = htmlToText(html);
    const htmlWithStylesInlined = juice(html);

    mainOptions.html = htmlWithStylesInlined;
    mainOptions.text = text;
    if(from != null){
        TransporterOptions.auth = from;
    }
    if(html != null){

    }
    mainOptions.subject = type === 0 ? "Periodic assessment" : "Probation";
    mainOptions.text = content;
    
    var transporter = nodemailer.createTransport(TransporterOptions);
    let mainOp = {
        ...mainOptions,
        to: mailReceiver,
    }
    transporter.sendMail(mainOp,function(err,info){
        if(err){
            console.log(err);
        }else{
            log.info(`message sent: ${info.response}`);
        }
    });
};

export {senMail}
