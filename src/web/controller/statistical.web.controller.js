import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'


export const statistical = async ( req,res,next ) => {
    try {
        let totalUserEmployee = await User.countDocuments({role: 'employee' });
        let totalUserDataEntry = await User.countDocuments({role: 'dataEntry' });
        let totalUserCustomer = await User.countDocuments({role: 'customer'});

        const employee = totalUserEmployee + totalUserDataEntry;

        console.log(totalUserEmployee);
        console.log(totalUserCustomer);

        res.render('index',{
            employee,
            totalUserCustomer
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}