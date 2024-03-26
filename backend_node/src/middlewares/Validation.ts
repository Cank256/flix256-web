const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// Validation schema for the signup process
const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    lang: Joi.string().required(),
})

// Validation schema for the login process
const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
}).xor('username', 'email')

// Validation schema for the user process
const userSchema = Joi.object({
    id: Joi.objectId().required(),
})

// Validation schema for the user process
const userUpdateSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    en: Joi.string(),
}).xor('username', 'email', 'en')

// Validation schema for the movie process
const movieSchema = Joi.object({
    id: Joi.string().required(),
})

// Validation schema for the tv show process
const tvSchema = Joi.object({
    id: Joi.string().required(),
})

// Validation schema for the tv show episode process
const episodeSchema = Joi.object({
    tv_show_id: Joi.number().required(),
    season: Joi.number().required(),
})

class Validate {
    static signup(req: any, res: any, next: any) {
        const { error } = signupSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }

    static login(req: any, res: any, next: any) {
        const { error } = loginSchema.validate(req.body)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }

    static user(req: any, res: any, next: any) {
        const { error } = userSchema.validate(req.params)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }

    static userUpdate(req: any, res: any, next: any) {
        const { userError } = userSchema.validate(req.params)
        if (userError) {
            res.status(400).json({ message: userError.details[0].message })
            return // Stop further execution in this callback
        }

        const { bodyError } = userUpdateSchema.validate(req.body)
        if (bodyError) {
            res.status(400).json({ message: bodyError.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }

    static movie(req: any, res: any, next: any) {
        const { error } = movieSchema.validate(req.params)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }

    static tv(req: any, res: any, next: any) {
        const { error } = tvSchema.validate(req.params)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }

    static episode(req: any, res: any, next: any) {
        const { error } = episodeSchema.validate(req.query)
        if (error) {
            res.status(400).json({ message: error.details[0].message })
            return // Stop further execution in this callback
        }
        next()
    }
}

module.exports = Validate
