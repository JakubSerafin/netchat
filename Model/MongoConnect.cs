using System.Collections.Generic;
using MongoDB.Driver;
namespace netchat.Model
{
    public class MongoConnector{
        MongoClient _client;
        private IMongoDatabase _database;

        public void init()
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _database = _client.GetDatabase("NetchatDb");
        }

        public ICollection<ChatMessage> GetAllMessages()
        {
            return _database.GetCollection<ChatMessage>("ChatMessage").Find(_=>true).ToList();
        }

        public void SaveMessage(ChatMessage message)
        {
            _database.GetCollection<ChatMessage>("ChatMessage").InsertOne(message);
        }
    }
}