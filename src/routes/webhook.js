import express from "express";
import { logger } from "../utils/logger.js";
import sessionService from "../services/sessionService.js";
import flowService from "../services/flowService.js";

const router = express.Router();

router.get('/', (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN;
  logger.info("VERIFY_TOKEN xxxxxxxxxxxxx: " + process.env.VERIFY_TOKEN);
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  logger.info('GET /webhook' + mode + ' ' + token);
  logger.info(verifyToken);
  logger.info(token);

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});


router.post("/", async (req, res) => {
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message) return res.sendStatus(200);

  const from = message.from;
  const text = message.text?.body?.trim();
  
  const session = sessionService.getSession(from);
  logger.info(`Text ${JSON.stringify(message)}`);
  switch (session?.step) {
    case "MAIN_MENU":
      await flowService.handleMainMenuOptions(from, message?.interactive?.button_reply?.id);
      break;

    case "INFO_MENU":
      await flowService.handleInfoMenuOptions(from, message?.interactive?.button_reply?.id);
      break;

    default:
      await flowService.sendMainMenu(from);
  }

  res.sendStatus(200);
});

export default router;
