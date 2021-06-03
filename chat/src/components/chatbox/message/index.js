import React from 'react';
import moment from 'moment';
import classes from './style.module.css';

const Message = ({ text, createdAt, author }) => (
    <div className={classes.Message} >
        <p className={classes.Timestamp} >
            {moment(createdAt).fromNow()}
        </p>
        <p className={classes.Author} >
            {author}
        </p>
        <p className={classes.Text} >
            {text}
        </p>
    </div>
)

export default Message;