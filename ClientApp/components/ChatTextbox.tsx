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
        return <div>
            <input type="text" className="form-control" id="usr" value={this.state.message} onChange={(msg)=> this.setState({message:msg.target.value})} ></input>
            <button type="button" className="btn">Send</button>
        </div>
    }
}