import * as React from "react";
import { RouteComponentProps } from "react-router";

interface ChatTextState{
    message: string
}

export class ChatTextbox extends React.Component<{}, ChatTextState> {
    constructor()
    {
        super();
        this.state = {message:""}
    }

    public render()
    {
        return <div className="form-horizontal">
            <div className="form-group form-group-sm">
            <div className="col-xs-8 col-sm-4 col-md-4">
                <input type="text" className="form-control " id="usr" value={this.state.message} onChange={(msg)=> this.setState({message:msg.target.value})} ></input>
            </div>
                <button type="button" className="btn" onClick={()=>this.SendMessage()}>Send</button>
            </div>
        </div>
    }

    public SendMessage()
    {
        fetch('api/Chat/PostMessage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author:"Anonim",
                message:this.state.message,
                date: Date.now()
            })
        })
    }
}