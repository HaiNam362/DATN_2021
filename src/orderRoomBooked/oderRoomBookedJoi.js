import Joi from "joi";
export const create = Joi.object({
    fullName: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),
    phone: Joi.number()
        .required(),
    timeBookingStart: Joi.string()
        .required(),
    timeBookingEnd: Joi.string().required(),
    totalRoomRate: Joi.number()
        .required(),
    advanceDeposit: Joi.number().required(),
})
export const update = Joi.object({
    fullName: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),
    phone: Joi.number()
        .required(),
    timeBookingStart: Joi.string()
        .required(),
    timeBookingEnd: Joi.string().required(),
    totalRoomRate: Joi.number()
        .required(),
    advanceDeposit: Joi.number().required(),
})