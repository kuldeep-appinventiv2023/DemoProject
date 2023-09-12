import express from 'express';
import { authMiddleware } from '../middleware/jwtMiddleware';
import  { startChatting , getChatOfUser , addReactionToMessage, deleteMessageController} from "../controller/mqttControllers";

const mqttRouter = express.Router();

mqttRouter.post('/startChatting', authMiddleware, startChatting);
mqttRouter.get('/getChatOfUser', authMiddleware, getChatOfUser);
mqttRouter.post('/addReactionToMessage', authMiddleware, addReactionToMessage);
mqttRouter.delete('/deleteMessage', authMiddleware, deleteMessageController);


export default  mqttRouter;
 