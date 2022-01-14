import { useState, useContext } from "react";
import styled from "styled-components";
import uniqid from 'uniqid';
import { CurrentUserContext } from '../contexts/userContext';
import { FiSend } from "react-icons/fi";

const SendMessage = ({ room_id,socket }) => {

    const [ newMessage, setNewMessage ] = useState("");
    const { currentUser } = useContext(CurrentUserContext);

    const handleSendMessage = (ev) => {
        ev.preventDefault();
        const date = new Date();
        socket.emit(
            'send-message',
            {
                displayName: currentUser.displayName,
                text: newMessage,
                avatarUrl: currentUser.avatarUrl,
                sender_id: currentUser._id,
                createdAt: date.toISOString()
            }
        );
        setNewMessage("");
    };

    const handleMessageChange = (ev) => {
        setNewMessage(ev.target.value);
    }

    return(
        <Wrapper>
            <Form onSubmit = {(ev) => handleSendMessage(ev)}>
                <MessageInput
                    value = { newMessage }
                    onChange = {(ev) => handleMessageChange(ev)}
                />
                <SendButton type= "submit">
                    <FiSend size = {20}/>
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
background-color: rgba(0,0,0,0.4);
border-radius:0px 0px 10px 10px;
`;

const MessageInput = styled.input`
flex:5;
height: 30px;
font-family: inherit;
font-size: inherit;
border:0;
outline: none;
color: black;
background-image:none;
background-color:white;
box-shadow: none;
overflow-wrap: break-word;  
word-wrap: break-word; 
word-break: break-word;
`;

const SendButton = styled.button`
flex:1;
font-weight:bold;
display: flex;
justify-content: center;
align-items: center;
border: 0;
padding: 0;
background: #A9BCD0;
cursor: pointer;
color:black;

`;

export default SendMessage