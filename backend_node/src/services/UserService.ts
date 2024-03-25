import User from '../models/User'

class UserServiceClass {
    // Get all users from the database
    static async getAllUsers() {
        const users = await User.find()
        if (!users) {
            throw new Error('Users not found')
        }

        return users
    }

    // Get a single user by ID from the database
    static async getUserById(id: string) {
        const user = await User.findById(id)
        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    // Update user in the database
    static async updateUser(id, userData) {
        const user = User.findByIdAndUpdate(id, userData, { new: true })
        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    // Delete user from the database
    static async deleteUser(id) {
        const user = User.findByIdAndDelete(id)
        if (!user) {
            throw new Error('User not found')
        }

        return user
    }
}

module.exports = UserServiceClass
