using System.Collections.Generic;
using netchat.Controllers;

public class FakeDal
{
    public List<ChatMessage> Messages {get; set;} = new List<ChatMessage>
        {
            new ChatMessage{Author="zbyszek", Message="test1"},
            new ChatMessage{Author="zbyszek", Message="test2"},
            new ChatMessage{Author="zbyszek", Message="test3"},
            new ChatMessage{Author="zbyszek", Message="test4"},
            new ChatMessage{Author="zbyszek", Message="test5"},
        };
}