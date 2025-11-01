import sessionService from "./sessionService.js";
import { logger } from "../utils/logger.js";
import request from "../utils/request.js";

async function handleMainMenuOptions(to, interactive) {
	logger.info(`User selected option: ${interactive}`);
	switch (interactive) {
		case "view_catalog":
			sendCatalogUrl(to);
			break;

		case "info_menu":
			sendInfoMenu(to);
			break;

		case "place_order":
			sendOrderInfo(to);
			break;
		
		default:
			sessionService.clearSession(to);
			break;
	}
}

async function handleInfoMenuOptions(to, interactive) {
	logger.info(`User selected option: ${interactive}`);
	switch (interactive) {
		case "social_media":
			sendSocialMedia(to);
			break;

		case "frequent_questions":
			sendFAQ(to);
			break;

		case "talk_agent":
			sendToAgent(to);
			break;
		
		default:
			sessionService.clearSession(to);
			break;
	}
}

async function sendMainMenu(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "interactive",
		interactive: {
			type: "button",
			header: {
					type: "image",
					image: {
							link: "https://instagram.fbog8-1.fna.fbcdn.net/v/t51.2885-19/568618532_17846158536592842_4473692965279959755_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45MzguYzIifQ&_nc_ht=instagram.fbog8-1.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QFONY7Y6Uzft6gd4l2aSokkEuI3uW5UcYvzbSo7t5wJ1N-HISspJ3ietV0JwTgKqPA&_nc_ohc=lWQ90wzknAcQ7kNvwERTj0U&_nc_gid=ZV_Nm27FliK62aqqUIN5Lw&edm=ACE-g0gBAAAA&ccb=7-5&oh=00_Afdi76K5IDZHdr-E7A9cjWCT-6X5E1OJxKF8KCg3hfIYzQ&oe=690A1245&_nc_sid=b15361",
					},
			},
			body: { text: "Bienvenido a Cima! Elige una opción:" },
			action: {
				buttons: [
					{ type: "reply", reply: { id: "view_catalog", title: "Ver Catálogo" } },
					{ type: "reply", reply: { id: "place_order", title: "Haz tu pedido" } },
					{ type: "reply", reply: { id: "info_menu", title: "Información" } },
				]
			}
		}
	};
	await request.whatsappRequest(to, body);
	sessionService.updateSession(to, { step: "MAIN_MENU" });
}

async function sendInfoMenu(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "interactive",
		interactive: {
			type: "button",
			header: {
					type: "image",
					image: {
							link: "https://instagram.fbog8-1.fna.fbcdn.net/v/t51.2885-19/568618532_17846158536592842_4473692965279959755_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45MzguYzIifQ&_nc_ht=instagram.fbog8-1.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QFONY7Y6Uzft6gd4l2aSokkEuI3uW5UcYvzbSo7t5wJ1N-HISspJ3ietV0JwTgKqPA&_nc_ohc=lWQ90wzknAcQ7kNvwERTj0U&_nc_gid=ZV_Nm27FliK62aqqUIN5Lw&edm=ACE-g0gBAAAA&ccb=7-5&oh=00_Afdi76K5IDZHdr-E7A9cjWCT-6X5E1OJxKF8KCg3hfIYzQ&oe=690A1245&_nc_sid=b15361",
					},
			},
			body: { text: "Bienvenido a Cima! Elige una opción:" },
			action: {
				buttons: [
					{ type: "reply", reply: { id: "frequent_questions", title: "Preguntas frecuentes" } },
					{ type: "reply", reply: { id: "social_media", title: "Redes Sociales" } },
					{ type: "reply", reply: { id: "talk_agent", title: "Asesor" } },
				]
			}
		}
	};
	await request.whatsappRequest(to, body);
	sessionService.updateSession(to, { step: "INFO_MENU" });
}

async function sendCatalogUrl(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "text",
		text: { 
			preview_url: true,
			body: "Puedes ver nuestro catálogo aquí: https://drive.google.com/drive/folders/1x9BW5mPL8SGTCdFiwKw0IAyEVfrO8dtk?fbclid=PAZXh0bgNhZW0CMTEAAadTyB5OyNy7RxTDVSLfWnZ9fW2DpHAfX9jQsjSmtsz0rCccjeHEpS5ptJBUfA_aem_474pkZ2FSOFt802gxQJXGA"
		}
	};
	await request.whatsappRequest(to, body);
	await clearConversation(to);
}

async function sendFAQ(to) {
	let body = {
			messaging_product: "whatsapp",
			to,
			type: "text",
			text: {
				body: `📚 *Preguntas Frecuentes*  

1️⃣ *¿Cuáles son sus horarios de atención?*  
🕒 Lunes a Viernes de *8:00 a.m. a 6:00 p.m.*  

2️⃣ *¿Dónde están ubicados?*  
📍 Actualmente no contamos con un punto fisico  

3️⃣ *¿Cómo puedo hacer un pedido?*  
🛒 Puedes hacerlo escribiendonos por Instagram *@cima.brand*

4️⃣ *¿Hacen envíos a todo el país?*  
🚚 ¡Sí! Realizamos envíos a nivel nacional con nuestros aliados logísticos.

✨ Si tienes otra pregunta, escríbenos y con gusto te ayudaremos.`
			}
		};
	await request.whatsappRequest(to, body);
	await clearConversation(to);
}

async function sendSocialMedia(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "text",
		text: { 
			preview_url: true,
			body: `Síguenos en nuestras redes sociales 🌐:
Instagram: https://www.instagram.com/cima.brand/
Facebook: https://www.facebook.com/cima.brand/
Tiktok: https://www.tiktok.com/@cima.brand`
		}
	};

	await request.whatsappRequest(to, body);
	await clearConversation(to);
}

async function sendOrderInfo(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "text",
		text: { 
			preview_url: true,
			body: "Opción no disponible temporalmente."
		}
	};
	await request.whatsappRequest(to, body);
	await clearConversation(to);
}

async function sendToAgent(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "text",
		text: { 
			preview_url: true,
			body: "Opción no disponible temporalmente."
		}
	};
	await request.whatsappRequest(to, body);
	await clearConversation(to);
}
async function clearConversation(to) {
	let body = {
		messaging_product: "whatsapp",
		to,
		type: "text",
		text: { 
			preview_url: true,
			body: "Gracias por contactarnos. Si deseas iniciar una nueva conversación, simplemente envíanos un mensaje."
		}
	};
	await request.whatsappRequest(to, body);
	sessionService.clearSession(to);
}

export default {
	sendMainMenu,
	handleInfoMenuOptions,
	handleMainMenuOptions
};