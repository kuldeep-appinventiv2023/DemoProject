import express from 'express';
import { authMiddleware } from '../middleware/jwtMiddleware';
import  { startChatting , getChatOfUser , addReactionToMessage, deleteMessageController} from "../controller/mqttControllers";

const mqttRouter = express.Router();

mqttRouter.post('/initiateChat', authMiddleware, startChatting);
mqttRouter.get('/fetchChatHistory', authMiddleware, getChatOfUser);
mqttRouter.patch('/reactToMessage', authMiddleware, addReactionToMessage);
mqttRouter.delete('/deleteChatMessage', authMiddleware, deleteMessageController);


export default  mqttRouter;
 