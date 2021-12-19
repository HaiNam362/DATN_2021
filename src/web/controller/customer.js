import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'

export const listCustomers = async(req, res, next) => {
        let { keySearch } = req.query;
        let data;


        if (keySearch) {
            var options = {
                email: { $regex: ".*" + keySearch + ".*" },
            }
            data = await User.find(options);
            console.log(data, 1);
        } else {
            data = await User.find({ role: "customer" });

        }
        res.render('customer', { CustomerDB: data });
    }
    // customerDetail
export const DeleteCustomer = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.redirect('/customer');

    } catch (error) {
        res.status(500).send(error);
    }

}
export const findOneCustomer = async(req, res) => {
    try {
        let { email } = req.params;
        let CustomerDB = await User.findOne({ email });
        if (!CustomerDB) {
            return res.sendStatus(404);
        }
        let payload = {
            CustomerDB,
        }
        console.log(email);
        res.render('custommerDetail', payload);
    } catch (error) {
        res.send(error.message);
    }
}
export const listCustomersDetail = async(req, res, next) => {
    try {
        const { email } = req.params;
        let data = await User.findOne({ email });
        console.log(data,222222222222222);
        if (!data) {
            return res.sendStatus(404)
        }
        res.render('custommerDetail', { CustomerDetailDB: data });
    } catch (error) {
        res.send(error.message);
    }
}