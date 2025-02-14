const Repair = require("../models/Repair");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "iamsamreenk@gmail.com",
        pass: "vckvanhgrxctewnu",
    },
});

async function generateWorkOrderNumber(state) {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const datePart = `${year}${month}${day}`;
    const lastWorkOrder = await Repair.findOne({
        workOrderNumber: { $regex: `^${state}-${datePart}-` },
    }).sort({ workOrderNumber: -1 });
    let seq = "01";
    if (lastWorkOrder) {
        const lastSeq = lastWorkOrder.workOrderNumber.split("-")[2];
        seq = String(parseInt(lastSeq, 10) + 1).padStart(2, "0");
    }
    return `${state}-${datePart}-${seq}`;
}

async function sendInvoiceEmail(user, repair, workOrderNumber, currentDate) {
    const templatePath = path.join(__dirname, "../templates/invoice.ejs");
    const template = await ejs.renderFile(templatePath, {
        user,
        repair,
        workOrderNumber,
        currentDate,
    });
    const mailOptions = {
        from: "iamsamreenk@gmail.com",
        to: user.email,
        subject: "Nationwide Laptop Repair - Your Workorder",
        html: template,
    };
    await transporter.sendMail(mailOptions);
}

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
        const workOrderNumber = await generateWorkOrderNumber(user_list.state);
        const currentDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const newRepair = new Repair({
            user_list,
            form_list,
            workOrderNumber,
        });
        await newRepair.save();
        await sendInvoiceEmail(user_list, form_list, workOrderNumber, currentDate);
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