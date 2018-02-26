import * as React from "react";
import { RouteComponentProps } from "react-router";

interface ChatTextState{
    message: string
    nick: string
    nickEntered: boolean;
}

export class ChatTextbox extends React.Component<{}, ChatTextState> {
    constructor()
    {
        super();
        //this.props= props;
        this.state = {message:"", nick:"", nickEntered:false}
        
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
        fetch('api/Chat/PostMessage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Author:"Anonim",
                Message:this.state.message,
                Date: new Date().toISOString()
            })
        })
    }
}