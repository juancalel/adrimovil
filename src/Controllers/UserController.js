import { UserModel } from "../Models/UserModel.js"



export class UserController {
    static async getAll(req, res) {
        const getUsersResult = await UserModel.getAll()
        if (getUsersResult.success) {
            res.json(getUsersResult.data)
        } else {
            res.status(400).json({ message: getUsersResult.message })
        }
    }

    static async getById(req, res) {
        const { id } = req.params

        const searchResults = await UserModel.getById({ id })
        if (searchResults.success) {
            res.json(searchResults.data)
        } else {
            res.status(404).json({ message: searchResults.message })
        }
    }


    static async changePassword(req, res) {
        const result = req.body

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id, newpassword, password } = result

        const user = await UserModel.changePassword({ id, password, newpassword })
        if (!user) return res.status(401).json({ message: 'could not password change' })

        res.status(200).json({ message: 'successful password change' })
    }

    static async updateUser(req, res) {
        const { id } = req.params
        const data = req.body

        const result = await UserModel.update({ id, input: data })


        if (result.success) {
            res.status(200).json({ message: result.message })
        } else {
            res.status(400).json({ error: result.message })
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params

        const result = await UserModel.delete({ id })

        if (result.success) {
            res.status(200).json({ message: result.message })
        } else {
            res.status(400).json({ error: result.message })
        }
    }
}
