using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace netchat.Controllers
{
    public class ChatHub: Hub
    {
        List<ChatMessage> messages = new List<ChatMessage>();
        public async Task Propagate(ChatMessage message)
        {
            await Clients.All.InvokeAsync("Propagate",message);
        }

        public async Task Message(ChatMessage message)
        {
            this.messages.Add(message);
            await this.Propagate(message);
        }        
    }

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
            return Messages.Where(m=>m != null).ToList();
        }


        [HttpPost("[action]")]
        public void PostMessage([FromBody] ChatMessage message)
        {
            Messages.Add(message);
        }
        
    }

    
    public class ChatMessage
    {
        public  DateTime Date {get; set;}
        public String Author {get; set;}

        public String Message {get; set;}
    }
}
