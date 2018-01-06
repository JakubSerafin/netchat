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
        private static string[] Authors = new[]
        {
            "Roman", "Krzychu", "Franciszek Frederyk"
        };

        private static string[] Messages = new[]
        {
            "Spadaj ciulu!", "Twoja matka to miła kobieta", "Jestem fanem Żanet Kalety"
        };



        [HttpGet("[action]")]
        public IEnumerable<ChatMessage> GetMessages()
        {
            var rng = new Random();
            return Enumerable.Range(1, 3).Select(index => new ChatMessage
            {
                Date = DateTime.Now.AddMinutes(index),
                Author = Authors[rng.Next(Authors.Length)],
                Message = Messages[rng.Next(Messages.Length)]
            });
        }
        
        public class ChatMessage
        {
            public  DateTime Date {get; set;}
            public String Author {get; set;}

            public String Message {get; set;}
        }
    }
}
