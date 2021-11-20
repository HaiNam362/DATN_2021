import jwt from 'jsonwebtoken';
import User from '../auth/user.models.js';

const verifyToken = async (req, res, next) => {
    const Bearer = req.body.token || req.params.token || req.header("Authorization");
    if (!Bearer) {
        return res.status(403).send("A token is required for authentication");
    }
    let token = Bearer.split(" ")[1];
    try {
        const decoded = await jwt.verify(token, 'project', { algorithm: 'HS256' });
        console.log(decoded);
        const user_abc = await User.findOne({   _id: decoded.userId  })
        console.log(user_abc._id,"có ra ko");
        req.user = user_abc._id;
    } catch (error) {
        console.log(error)
        return res.status(401).send("Invalid token");
    }
    return next();
}

const checkRole = (role) => {
    return async (req, res, next) => {
        try {
            let userRole = await User.findOne( { _id: req.user  });
            console.log(req.user);
            if(!userRole) {
                return res.status(404),send("User not found");
            }
            console.log(userRole);
            if (userRole.role === "admin"){
                 return next();
            }
            else if (userRole.role === role) {
                console.log('vào đây ======');
                return next();
            } 
            res.status(404).send('unAuthorize');
        } catch (err) {
            console.error(err);
        }
    }
}

export { verifyToken ,checkRole}