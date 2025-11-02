import axios from "axios";
import sessionService from "../services/sessionService.js";

async function whatsappRequest(to, body) {
	const whatsappToken = process.env.WHATSAPP_TOKEN;
	const phoneId = process.env.PHONE_NUMBER_ID;
	return axios.post(
		`https://graph.facebook.com/v21.0/${phoneId}/messages`,
		body,
		{ headers: {
				Authorization: `Bearer ${whatsappToken}`,
				"Content-Type": "application/json",
			},
		}
	);
	sessionService.clearSession(to);
}

export default {
    whatsappRequest
};