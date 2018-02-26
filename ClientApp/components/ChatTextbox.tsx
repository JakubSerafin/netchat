import * as React from "react";
import { RouteComponentProps } from "react-router";
import { HubConnection } from "@aspnet/signalr-client";

interface ChatTextState{
    message: string
    nick: string
    nickEntered: boolean;
}

interface ChatTextPropertis{
    hub: HubConnection
}

export class ChatTextbox extends React.Component<ChatTextPropertis, ChatTextState> {
    constructor(props:ChatTextPropertis)
    {
        super();
        this.state = {message:"", nick:"", nickEntered:false}
        this.props= props;
        
    }

    private getNicknamePanel()
    {
            if(!this.state.nickEntered)
            {
                return <input type="text" className="form-control " id="usr" value={this.state.nick} 
                    onChange={(msg)=> this.setState({nick:msg.target.value})}
                    onKeyDown={key=>{if(key.key== "Enter" && this.state.nick.length>1) this.setState({nickEntered:true})}}></input>                                
            }
            return <span className="user-name">{this.state.nick}: </span>
    }
    public render()
    {
        return <div className="form-horizontal">
            <div className="form-group form-group-sm form-inline">
            <label>
                {this.getNicknamePanel()}
                <input type="text" className="form-control " id="msg" value={this.state.message} onKeyDown={key=>{if(key.key == "Enter")this.SendMessage()}} onChange={(msg)=> this.setState({message:msg.target.value})} ></input>
            </label>   
                <button type="button" className="btn" onClick={()=>this.SendMessage()}>Send</button>
            </div>
        </div>
    }

    public SendMessage()
    {
        var message = {date: new Date(), message:this.state.message, author:this.state.nick}
        this.props.hub.send("message", message);
        this.setState({message:""});
    }
}