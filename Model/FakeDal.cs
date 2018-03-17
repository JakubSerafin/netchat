using System.Collections.Generic;
using netchat.Controllers;
using netchat.Model;

public class FakeDal
{
    private MongoConnector _mongo;

    public FakeDal()
    {
        _mongo = new MongoConnector();
        _mongo.init();
    }

    public ICollection<ChatMessage> Messages {
        get
        {
            return _mongo.GetAllMessages();
        }
    }

    public void SaveMessage(ChatMessage message)
    {
        _mongo.SaveMessage(message);
    }
}

