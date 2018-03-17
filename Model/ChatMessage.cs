using System;
using MongoDB.Bson;

namespace netchat.Model
{
public class ChatMessage
    {
        public  DateTime Date {get; set;}
        public String Author {get; set;}

        public String Message {get; set;}
    }

    public class MongoChatMessage:ChatMessage
    {
        public ObjectId _id {get; set;}
    }
}

