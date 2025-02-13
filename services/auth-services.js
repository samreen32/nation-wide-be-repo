const User = require("../models/User");

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 200,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}

module.exports = {
    getAllUsers
};