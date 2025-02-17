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

async function deleteCustomer(req, res) {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }
        res.status(200).json({
            status: 200,
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}

module.exports = {
    getAllUsers,
    deleteCustomer,
};