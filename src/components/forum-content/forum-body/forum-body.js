import Row from '../../row';
import React from "react";
import {ForumLogin, ForumTopics} from "../../forum-content";

const ForumBody = () => {
  return(
      <Row left={<ForumTopics />} right={<ForumLogin />}/>
  )
};

export default ForumBody;