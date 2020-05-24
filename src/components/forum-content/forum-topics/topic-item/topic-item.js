import React from "react";
import '../forum-topics.css'


const TopicItem = (item) => (toggleContent, history) => {
    const {titleTheme, shortDescription, createdAt, userName, visible, _id} = item;
    return (
        <div className="list-item" key={_id}>
            <div className="content">
                <span>
                    <img src={require("../img/chat.png")} style={{marginRight: "5px"}} className="chat-img" alt="chat"/>
                </span>
                <div className="name_and_description" style={{maxWidth: "800px", paddingRight: 40}}>
                    <h1 onClick={() => {
                        history.push(String(_id));
                    }}>{titleTheme}</h1>
                    <div onClick={() => toggleContent(_id)} className="under_topic" >
                        <p>КОРОТКИЙ ОПИС<span><img src={require("../img/down-arrow.svg")}
                                                   className="down_arrow"
                                                   alt="down_arrow"/>
                            </span>
                        </p>
                    </div>
                    <p style={{margin: "10px 0"}}>{visible && shortDescription}</p>
                </div>
            </div>

            <div className="content-info text-right">
                <h1>{userName}</h1>
                <p>{createdAt}</p>
            </div>
        </div>
    )
};

export default TopicItem;