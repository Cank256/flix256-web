const User = require('../models/User')

class AuthServiceClass {
    static async signup(userData: any) {
        const { username, email, lang } = userData

        // Check if user already exists
        let user = await User.findOne({
            $or: [{ email: email }, { username: username }],
        })

        if (user) {
            throw new Error('User already exists')
        }

        // Create and save the user
        user = new User({ username, email, lang })
        await user.save()

        return user
    }

    static async login(userData: any) {
        const user = await User.findOne({
            $or: [{ email: userData.email }, { username: userData.username }],
        })
        if (!user) {
            throw new Error('User not found')
        }

        return user
    }
}

module.exports = AuthServiceClass
