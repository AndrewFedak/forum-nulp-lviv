import React from "react";
import "./row.css"

const Row = (props) => {
    const {left, right} = props;
    return (
        <div className="tow-el-row" style={{backgroundColor: "#eaf2f5"}}>
            <div className="topics">
                {left}
            </div>

            <div className="login">
                {right}
            </div>
        </div>
    )
};

export default Row;