const Joi = require('joi')

// Validation schema for the signup process
const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    en: Joi.string().required(),
})

// Validation schema for the login process
const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
}).xor('username', 'email')

class Validate {
    static signup(req: any, res: any, next: any) {
        const { error } = signupSchema.validate(req.body)
        if (error) {
            return { status: false, message: error.details[0].message }
        }

        return { status: true }
    }

    static login(req: any, res: any, next: any) {
        const { error } = loginSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }
}

module.exports = Validate
