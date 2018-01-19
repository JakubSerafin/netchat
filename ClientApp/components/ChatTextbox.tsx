import * as React from "react";
import { RouteComponentProps } from "react-router";
import { HubConnection } from "@aspnet/signalr-client";

interface ChatTextState{
    message: string
}

interface ChatTextPropertis{
    hub: HubConnection
}

export class ChatTextbox extends React.Component<ChatTextPropertis, ChatTextState> {
    constructor(props:ChatTextPropertis)
    {
        super();
        this.props= props;
        this.state = {message:""}
        
    }

    public render()
    {
        return <div className="form-horizontal">
            <div className="form-group form-group-sm">
            <div className="col-xs-8 col-sm-4 col-md-4">
                <input type="text" className="form-control " id="usr" value={this.state.message} onKeyDown={key=>{if(key.key == "Enter")this.SendMessage()}} onChange={(msg)=> this.setState({message:msg.target.value})} ></input>
            </div>
                <button type="button" className="btn" onClick={()=>this.SendMessage()}>Send</button>
            </div>
        </div>
    }

    public SendMessage()
    {
        var message = {date: new Date(), message:this.state.message, author:"stefan"}
        this.props.hub.send("message", message);
        this.setState({message:""});
    }
}