import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface ChatState {
    loading: boolean;
    messages: Array<ChatMessage>
}

export class Chat extends React.Component<RouteComponentProps<{}>, ChatState> {
    constructor() {
        super();
        this.state = {loading: true, messages: [] };

        fetch('api/Chat/GetMessages')
            .then(response => response.json() as Promise<ChatMessage[]>)
            .then(data => {
                this.setState({loading: false, messages: data });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Chat.renderChatPanel(this.state.messages);

        return <div>
            <h1>Osom Chat Widget</h1>
            { contents }
        </div>;
    }

    private static renderChatPanel(messages:ChatMessage[]) {
        return <div className="chatpanel">
        {messages.map((msg,index)=><div key={"msg_"+index}>{msg.author}: {msg.message}</div>)}
            {/* {messages.forEach(msg => 
                <div>msg</div>
            )} */}
        </div>;
          
    }
}

interface ChatMessage {
    date: Date;
    author: String;
    message: String;
}
