import { Request, Response } from "express";
import * as mqtt from "mqtt";
import { MqttClient } from "mqtt";
import Chat from "../models/chatModel";
import { Constants } from "../constants";


const client: MqttClient = mqtt.connect("mqtt://broker.hivemq.com");

client.on("error", (error) => {
  console.log("MQTT client error: service unavailable", error);
});

export function subscribeToChatMessages(receiverId: string) {
  const topic = `chat/${receiverId}`;

  client.subscribe(topic, (error) => {
    if (error) {
      console.log(`Error subscribing to topic: ${error}`);
    } 
    else {
      console.log(`Subscribed to topic ${topic}`);
    }
  });
}

async function handleMQTTMessage(receivedTopic : any, receivedMessage: any, res: Response) {
  const chatMessage = receivedMessage.toString();
  console.log(`Received message from topic ${receivedTopic} : ${chatMessage}`);
  const receivedData = JSON.parse(chatMessage);
  console.log(receivedData, "\nData received from publish");

  try {
    const existingChat = await Chat.findOne({
      $or: [{ senderId: receivedData.senderId, receiverId: receivedData.receiverId }, { senderId: receivedData.receiverId, receiverId: receivedData.senderId }]
    });

    if (existingChat) {
      existingChat.message.push({ message: receivedData.message, isDelivered: false, isRead: false, createdAt: new Date() });
      await existingChat.save();
      res.status(Constants.HttpStatusCodes.OK).json({ message: Constants.successMessages.MessageAddedToExistingChat });
    } 
    else {
      const newChat = new Chat({
        senderId: receivedData.senderId,
        receiverId: receivedData.receiverId,
        topic: receivedTopic,
        messages: [{ message: receivedData.message, isDelivered: false, isRead: false, createdAt: new Date() }]
      });
      await newChat.save();
      res.status(Constants.HttpStatusCodes.Created).json({ message: Constants.successMessages.NewChatCreated });
    }
  } 
  catch (error) {
    console.log("Error handling MQTT message:", error);    
    res.status(Constants.HttpStatusCodes.InternalServerError).json({ success: false, message: Constants.errorMsgs.error });
  }
}

export async function startChatting(req: Request, res: Response) {

  const { message, receiverId } = req.body;
  const senderId = req.body.id; 
  const topic = `chat/${receiverId}`;

  subscribeToChatMessages(receiverId);

  try {
    const chatData = {
      receiverId: receiverId,
      senderId: senderId,
      message: message,
    };

    const jsonString = JSON.stringify(chatData);

    client.publish(topic, jsonString, async (error) => {
      if (error) {
        console.log("Error publishing MQTT message:", error);
        res.status(Constants.HttpStatusCodes.InternalServerError).json({ success: false, message: Constants.errorMsgs.error });
      }
    });

    client.on("message", (receivedTopic, receivedMessage) => {
      handleMQTTMessage(receivedTopic, receivedMessage, res);
    });

  } 
  catch (error) {
    res.status(Constants.HttpStatusCodes.InternalServerError).json({ success: false, message: Constants.errorMsgs.error });
  }
}

export async function getChatOfUser(req: Request, res: Response) {
  const { chatId, receiverId } = req.query;
  const senderId = req.body.id;
  
  const page: number = +(req.query.page || "1");
  const perPage: number = +(req.query.limit || "10");

  const chatQuery = {
    $or: [
      { senderId: senderId, receiverId: receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  };

  try {
    const chatExists = await Chat.find(chatQuery);

    if (!chatExists) {
      return res.status(Constants.HttpStatusCodes.NotFound).json({ success: false, message: Constants.errorMsgs.ChatOrMessageNotFound });
    }
    
    await Chat.updateMany( { _id: chatId },
      {
        $set: {
          "message.$[].isDelivered": true,
          "message.$[].isRead": true,
        },
      }
    );

    const chatHistory = await Chat.aggregate([
      { $match: chatQuery },
      {
        $addFields: {
          message: {
            $map: {
              input: "$message",
              as: "msg",
              in: {
                message: "$$msg.message",
                isDelivered: "$$msg.isDelivered",
                isRead: "$$msg.isRead",
                createdAt: { $toDate: "$$msg.createdAt" },
              },
            },
          },
        },
      },
      { $unwind: "$message" }, 
      { $sort: { "message.createdAt": -1 } }, 
      { $group: { _id: "$_id", senderId: { $first: "$senderId" }, receiverId: { $first: "$receiverId" }, topic: { $first: "$topic" }, created_at: { $first: "$created_at" }, messages: { $push: "$message" } } }, 
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ]);

    res.status(Constants.HttpStatusCodes.OK).json(chatHistory);

  } 
  catch (error) {
    return res.status(Constants.HttpStatusCodes.InternalServerError).json({ success: false, message: Constants.errorMsgs.error });
  }
}

export async function addReactionToMessage(req: Request, res: Response) {
  try {
    const { messageId , chatId , reaction} = req.query;
    const senderId = req.body.id;
    const chat : any = await Chat.findOne({ 'message._id' : messageId})

    if (!chat) {
      res.status(Constants.HttpStatusCodes.NotFound).json({ success: false, message: Constants.errorMsgs.MessageNotFound });
    }

    if (chat.senderId != senderId) {
      res.status(Constants.HttpStatusCodes.Unauthorized).json({ success: false, message: Constants.errorMsgs.UnauthorizedPerson });
    }

    switch (reaction) {
      case 'like':
      case 'love':
      case 'laugh':
      case 'angry':
      case 'sad':
        chat.message.messageReaction = reaction;
        break;
      default:
        return res.status(Constants.HttpStatusCodes.NotFound).json({ success: false, message: Constants.errorMsgs.InvalidReaction });
    }

    await Chat.updateOne(
      { _id: chatId, "message._id": messageId },
      { $set: { "message.$.messageReaction": reaction } }
    );

    res.status(Constants.HttpStatusCodes.OK).json({ success: true, message:  Constants.successMessages.ReactionAddedToMessage });
  } 
  catch (error) {
    res.status(Constants.HttpStatusCodes.InternalServerError).json({ success: false, message: Constants.errorMsgs.error });
  }
}

export async function deleteMessageController(req: Request, res: Response) {
  const { chatId, messageId } = req.query;
  const senderId = req.body.id;

  try {
    const chat : any = await Chat.findOne({ _id : chatId, 'message._id' : messageId });
    console.log(chat)
    if (!chat) {
      res.status(Constants.HttpStatusCodes.NotFound).json({ success: false, message: Constants.errorMsgs.ChatOrMessageNotFound });
    }
    else
    {
      console.log(senderId);
      if (chat.senderId != senderId) {
        res.status(Constants.HttpStatusCodes.Unauthorized).json({ success: false, message: Constants.errorMsgs.UnauthorizedPerson });
      }
     
        const result = await Chat.updateOne(
          { _id: chatId },
          { $pull: { message : { _id: messageId } } }
        );
    
        res.status(Constants.HttpStatusCodes.OK).json({ success: true, message: Constants.successMessages.MessageDeletedSuccessfully, result});    
  }
    
  } 
  catch (error) {
    res.status(Constants.HttpStatusCodes.InternalServerError).json({ success: false, message: Constants.errorMsgs.error });
  }
}

