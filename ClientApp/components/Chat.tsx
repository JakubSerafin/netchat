import { ChatTextbox } from './ChatTextbox';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, TransportType } from '@aspnet/signalr-client';

interface ChatState {
    loading: boolean;
    messages: Array<ChatMessage>
    hubConnection: HubConnection
}

export class Chat extends React.Component<RouteComponentProps<{}>, ChatState> {
    constructor() {
        super();
        let hubConnection =  new HubConnection("/sgr/chat",{ transport: TransportType.LongPolling })
        
        this.state = {loading: true, messages: [], hubConnection: hubConnection };

        this.state.hubConnection
              .start()
              .then(() => {
                    console.log('Connection started!')
                    this.state.hubConnection.invoke("GetMessages",4).then((val:ChatMessage[])=>{
                        this.setState({loading: false, messages: val})
                    });
                })
              .catch(err => console.log('Error while establishing connection :('));
      
            this.state.hubConnection.on('Propagate', (chatMessage) => {
              console.log(chatMessage);
              var messages = this.state.messages;
              messages.push(chatMessage)
              this.setState({loading: false, messages: messages });
            });

           
       
    }

    public componentDidMount()
    {

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Chat.renderChatPanel(this.state.messages);

        return <div>
            <h1>Osom Chat Widget</h1>
            { contents }
            <ChatTextbox hub={this.state.hubConnection}/>
        </div>;
    }

    private static renderChatPanel(messages:ChatMessage[]) {
        return <div className="chatpanel">
        {messages.map((msg,index)=><div key={"msg_"+index}>{msg.author}: {msg.message}</div>)}
        </div>;
          
    }
}

interface ChatMessage {
    date: Date;
    author: String;
    message: String;
}
