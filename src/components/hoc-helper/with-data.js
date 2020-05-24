import React from "react";
import {NulpConsumer} from "../context";


const withData = (Wrapper) => {
    return (props) => {
        return (
            <NulpConsumer>
                {
                    (NulpService) => {
                        const nulpService = new NulpService();
                        return (
                            <Wrapper nulpService={nulpService} {...props}/>
                        )
                    }
                }
            </NulpConsumer>
        )
    }
};

export default withData;