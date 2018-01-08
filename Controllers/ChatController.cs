using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace netchat.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {


        private static List<ChatMessage> Messages = new List<ChatMessage>
        {
            new ChatMessage{Author="Roman", Message="Jestem fanem Żanet Kalety", Date=DateTime.Now},
            new ChatMessage{Author="Krzychu", Message="Twoja matka to miła kobieta", Date=DateTime.Now},
            new ChatMessage{Author="Roman", Message="Spadaj ciulu!", Date=DateTime.Now},
        };



        [HttpGet("[action]")]
        public IEnumerable<ChatMessage> GetMessages()
        {
            return Messages;
        }


        [HttpPost("[action]")]
        public void PostMessage(ChatMessage message)
        {
            Messages.Add(message);
        }
        
        public class ChatMessage
        {
            public  DateTime Date {get; set;}
            public String Author {get; set;}

            public String Message {get; set;}
        }
    }
}
