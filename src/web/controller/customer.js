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
export const DeleteCustomer = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.redirect('/customer');

    } catch (error) {
        res.status(500).send(error);
    }

}