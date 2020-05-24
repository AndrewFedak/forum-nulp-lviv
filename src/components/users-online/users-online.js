import React from "react";
import './users-online.css';
import correctName from "../correct-name";


export default class UsersOnline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            online: []
        };

    }

    componentDidMount() {
        setInterval(() => {
            fetch(`${process.env.HOST}/online`)
                .then((res) => res.json())
                .then((array) => this.setState({
                    online: array
                }));
        }, 20000);
    }

    render() {
        let {online} = this.state;
        let amount = correctName(this.state.online.length);

        return (
            <div className="online" style={{marginTop: "10px"}}>
                <div className="div-logo">
                    <p><span><img src={require("./img/group.png")} alt="group"/></span> {online.length} {amount} ОНЛАЙН
                    </p>
                </div>

                <div className="all-users-online">
                    {this.state.online.map((item, idx) => <p key={idx} style={{color: "blue"}}>{item}</p>)}
                </div>
            </div>
        )
    }
}
