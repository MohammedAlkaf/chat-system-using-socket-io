import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SendMessage from './SendMessage';
import socketIoClient from "socket.io-client";

const Chat = () => {

    const [ messages, setMessages ] = useState([]);
    const [ socket, setSocket ] = useState(null);

    useEffect( () => {
        setSocket(socketIoClient("http://localhost:8000"));
    },[]);

    useEffect(()=> {

        if( socket === null){
            return null
        }

        socket?.on('connect', () => console.log(`conncted with id: ${socket.id}`));

        socket?.on("get-messages", (messages) => {
            // expect server to send us the latest messages
            console.log(messages);
            setMessages(messages);
        });

        // CLEAN UP THE EFFECT
        return () => socket?.disconnect();

    }, [socket]);

    if( socket === null){
        return null
    }
    
    return(
        <Wrapper>
            <Container>
                {
                    messages.map( (message) => {
                        return(
                            <Message key = { message._id }>
                                {message.text}
                            </Message>
                        )
                    })
                }
            </Container>
            <SendMessage messages = { messages } setMessages= { setMessages } socket = { socket }/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
position:relative;
left: calc(50% - 200px);
top: calc(50% - 350px);
width: 400px;
height: 700px;
border-radius: 5px;
background: white;
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Container = styled.div`
display:flex;
align-items: baseline;
flex-direction: column;
overflow:auto;
height: calc( 100% - 60px);
`;

const Message = styled.div`
box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
margin: 10px 10px ;
padding: 3px 7px;
border-radius:3px;
`;

export default Chat