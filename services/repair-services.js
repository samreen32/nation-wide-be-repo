const Repair = require("../models/Repair");
const User = require("../models/User");

async function registerForm(req, res) {
    try {
        const { user_list, form_list } = req.body;
        const existingUser = await User.findOne({
            "nation_users.email": user_list.email,
        });
        if (!existingUser) {
            const newUser = new User({
                nation_users: {
                    firstname: user_list.firstname,
                    lastname: user_list.lastname,
                    phone: user_list.phone,
                    email: user_list.email,
                    address: user_list.address,
                    city: user_list.city,
                    state: user_list.state,
                    zip: user_list.zip,
                },
            });
            await newUser.save();
        }
        const newRepair = new Repair({
            user_list,
            form_list,
        });
        await newRepair.save();
        res.status(201).json({
            status: 201,
            message: "Repair form submitted successfully",
            data: newRepair,
        });
    } catch (error) {
        console.error("Error submitting repair form:", error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}

async function getAllRepairReports(req, res) {
    try {
        const repairReports = await Repair.find();
        res.status(200).json({
            status: 200,
            message: "Repair reports fetched successfully",
            data: repairReports,
        });
    } catch (error) {
        console.error("Error fetching repair reports:", error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}

module.exports = {
    registerForm,
    getAllRepairReports
};