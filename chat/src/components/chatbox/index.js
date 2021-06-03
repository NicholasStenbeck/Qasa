import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import classes from './style.module.css';
import Message from './message';
import { SocketContext } from '../../context/socket';
import MessageInput from './messageInput';

const Chatbox = () => {
    const socket = useContext(SocketContext);
    const [name, setName] = useState();
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('userSet', username => {
            setName(username);
            setShowChat(true);
        });

        socket.on('message', message => {
            setMessages(prevMessages => [
                ...prevMessages,
                message,
            ])
        });
    }, [socket]);

    const handleSubmitName = e => {
        socket.emit('setUsername', e?.target?.name?.value);
        e.preventDefault();
    };

    const handleSubmitMessage = text => {
        socket.emit('message', {
            text,
            author: name,
        });
    }

    return (
        <div className={classes.Chatbox} >
            {
                showChat
                    ? [
                        ..._.map(messages, (message, index) => (
                            <Message {...message} key={`${classes.Chatbox}-message-${index}`} />
                        )),
                        <MessageInput onSubmit={handleSubmitMessage} key={`${classes.Chatbox}-message-input`} />
                    ]
                    : (
                    <form onSubmit={handleSubmitName}>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    )
            }
            
        </div>
    )
}

export default Chatbox;