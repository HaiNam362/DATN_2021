import Joi from "joi";
export const create = Joi.object({
    fullName: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),
    phone: Joi.string()
        .required(),
    timeBookingStart: Joi.string()
        .required(),
    timeBookingEnd: Joi.string().required(),
    totalRoomRate: Joi.number()
        .required(),
    email: Joi.string().required(),
    advanceDeposit: Joi.number().required(),
    bookingStatus: Joi.number().required(),

    serviceCharge: Joi.number(),

})
export const update = Joi.object({
    fullName: Joi.string()
        .alphanum()
        .max(20),
    phone: Joi.string(),
    email: Joi.string(),
    timeBookingStart: Joi.string(),
    timeBookingEnd: Joi.string(),
    totalRoomRate: Joi.number(),
    advanceDeposit: Joi.number(),
    bookingStatus: Joi.number(),
    serviceCharge: Joi.number(),
})