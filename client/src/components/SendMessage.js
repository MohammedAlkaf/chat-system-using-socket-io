import { useState } from "react";
import styled from "styled-components";

const SendMessage = ({ messages, setMessages, socket }) => {

    socket.on('connect', () => console.log(`conncted with id: ${socket.id}`));

    const [ newMessage, setNewMessage ] = useState({ _id: '', text: ''});

    const handleSendMessage = (ev) => {
        ev.preventDefault();
        socket.emit('send-message', newMessage);
        setNewMessage({ _id: '', text: ''});
    };

    const handleMessageChange = (ev) => {
        setNewMessage({ _id: Math.floor(Math.random() * 100000000000), text:ev.target.value });
    }
    return(
        <Wrapper>
            <Form onSubmit = {(ev) => handleSendMessage(ev)}>
                <MessageInput
                    value = { newMessage.text }
                    onChange = {(ev) => handleMessageChange(ev)}
                />
                <SendButton type= "submit">
                    SEND
                </SendButton>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
position: absolute;
display: flex;
justify-content: center;
bottom: 0;
width:100%;
/* border: 1px solid green; */
`;

const Form = styled.form`
display: flex;
/* border: 1px solid red; */
width: 100%;
padding: 10px;
background: grey;
`;

const MessageInput = styled.input`
flex:4;
height: 30px;
`;

const SendButton = styled.button`
flex:1;
`;

export default SendMessage