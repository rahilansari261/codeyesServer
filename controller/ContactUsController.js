import ContactUs from "../src/models/ContactUsModel.js";
import handleResponse from "../config/http-response.js";

class ContactUsController {
    // Add new contact
    static AddContactUs = async (req, resp) => {
        try {
            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return handleResponse(400, "All fields are required", {}, resp);
            }

            const newContactUs = new ContactUs({
                name,
                email,
                message,
                option
            });

            await newContactUs.save();

            return handleResponse(201, "Contact Us added successfully", newContactUs, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };

    // Get all contacts
    static GetAllContactUs = async (req, resp) => {
        try {
            const contacts = await ContactUs.find();
            return handleResponse(200, "Contact Us records fetched successfully", contacts, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };

    // Get contact by ID
    static GetContactUsById = async (req, resp) => {
        try {
            const { id } = req.params;

            const contact = await ContactUs.findOne({ id: id });

            if (!contact) {
                return handleResponse(404, "Contact Us record not found", {}, resp);
            }

            return handleResponse(200, "Contact Us record fetched successfully", contact, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };
}

export default ContactUsController;
