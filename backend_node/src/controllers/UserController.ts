const UserService = require('../services/UserService')

class UserControllerClass {
    // Get all users
    static async getAllUsers(req: any, res: any) {
        try {
            // This will interact with a UserService to fetch all users
            const users = await UserService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Get a single user by ID
    static async getUserById(req: any, res: any) {
        try {
            const user = await UserService.getUserById(req.params.id)
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Update a user by ID
    static async updateUser(req: any, res: any) {
        try {
            const updatedUser = await UserService.updateUser(
                req.params.id,
                req.body,
            )
            if (updatedUser) {
                res.status(200).json(updatedUser)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // Delete a user by ID
    static async deleteUser(req: any, res: any) {
        try {
            const user = await UserService.deleteUser(req.params.id)
            if (user) {
                res.status(200).json({ message: 'User deleted' })
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = UserControllerClass
