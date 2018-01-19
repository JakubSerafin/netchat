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
        public ChatHub(FakeDal dal)
        {
            this.dal = dal;
        }
        private FakeDal dal;

        public async Task Propagate(ChatMessage message)
        {
            await Clients.All.InvokeAsync("Propagate",message);
        }

        public async Task Message(ChatMessage message)
        {
            this.dal.Messages.Add(message);
            await this.Propagate(message);
        }

        public ChatMessage[] GetMessages(int number)
        {
            Console.WriteLine("Dostalem messedza");
            var array = this.dal.Messages.TakeLast(number).ToArray();
            Console.WriteLine("To moja odpowiedź " + array );
            return array;
        }

                
    }

    [Route("api/[controller]")]
    public class ChatController : Controller
    {

        public ChatController(ChatHub hub)
        {
            this.Hub = hub;
        }

        private static List<ChatMessage> Messages = new List<ChatMessage>
        {
            new ChatMessage{Author="Roman", Message="Jestem fanem Żanet Kalety", Date=DateTime.Now},
            new ChatMessage{Author="Krzychu", Message="Twoja matka to miła kobieta", Date=DateTime.Now},
            new ChatMessage{Author="Roman", Message="Spadaj ciulu!", Date=DateTime.Now},
        };
        private readonly ChatHub Hub;

        [HttpGet("[action]")]
        public IEnumerable<ChatMessage> GetMessages()
        {
            return Messages.Where(m=>m != null).ToList();
        }


        [HttpPost("[action]")]
        public void PostMessage([FromBody] ChatMessage message)
        {
            Messages.Add(message);
            Hub.Propagate(message);
        }
        
    }

    
    public class ChatMessage
    {
        public  DateTime Date {get; set;}
        public String Author {get; set;}

        public String Message {get; set;}
    }
}
