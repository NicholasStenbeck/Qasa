import React, { useRef, useState } from 'react';
import classes from './style.module.css';

const MessageInput = ({ onSubmit }) => {
    const [text, setText] = useState('');
    const inputRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(text);
        inputRef.current?.focus()
    };

    return (
        <form onSubmit={handleSubmit} >
            <input autoFocus type="text" name="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter a message..." />
        </form>
    );
};

export default MessageInput;