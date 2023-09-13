import mongoose from "mongoose";
import { Document } from "mongoose";

enum Reaction {
  Like = 'like',
  Love = 'love',
  Laugh = 'laugh',
  Angry = 'angry',
  Sad = 'sad',
}

interface Message {
  message: string;
  isDelivered: boolean;
  isRead: boolean;
  messageReaction? : Reaction;
  createdAt: Date;
}

interface Chat extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  topic: object;
  name: string;
  message: Message[];
  created_at: Date,
}

const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    topic: { type: Object, required: true },
    message: [{ message: String, 
                isDelivered: { type: Boolean, default: false },
                isRead: { type: Boolean, default: false },
                messageReaction : { type : String, enum: Object.values(Reaction)},  
                createdAt: Date 
              }],       
    created_at: { type: Date, default: Date.now },
  }
);


const Chat = mongoose.model('chat', chatSchema);
console.log('Chat model created...');
module.exports = Chat;
export default mongoose.model<Chat>('chat', chatSchema);
