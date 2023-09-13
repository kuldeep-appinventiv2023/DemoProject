export class Constants {
    static HttpStatusCodes = {
        OK: 200,
        Created: 201,
        BadRequest: 400,
        NotFound: 404,
        Unauthorized: 401,
        InternalServerError: 500,
      };
    static authMessages = {
        success: "Authentication successful",
        tokenMissing: "Token is missing",
        unauthorized: "Unauthorized",
    }
    static successMessages = {
        userRegistered: "User registered successfully",
        loginSuccess: "Login successful",
        MessageAddedToExistingChat: "Message added to existing chat",
        NewChatCreated: "New chat created",
        ReactionAddedToMessage: "Reaction added to the message",
        MessageDeletedSuccessfully: "Message deleted successfully"
      }
    static errorMsgs = {
      error: "Something went wrong",
      userExists: "User already exists",
      userNotFound: "User not found",
      invalidPassword: "Invalid password",  
      UnauthorizedPerson: "Unauthorized person, cannot able to react/delete the message",
      MessageNotFound: "Message not found",
      InvalidReaction: "Invalid reaction",
      ChatOrMessageNotFound: "Chat or message not found",   
    }
}      