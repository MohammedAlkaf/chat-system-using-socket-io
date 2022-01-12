import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SendMessage from './SendMessage';
import socketIoClient from "socket.io-client";
import { useParams } from 'react-router-dom';
const Chat = ({ active, setActive }) => {

    const { room_id } = useParams();

    const [ messages, setMessages ] = useState([]);
    const [ socket, setSocket ] = useState(null);

    useEffect( () => {
        setSocket(socketIoClient("http://localhost:8000"));
    },[room_id]);

    useEffect(()=> {
        if( socket === null){
            return null
        }
        socket.on('connect', () => console.log(`conncted with id: ${socket.id}`));

        socket.on("get-messages", (messages) => {
            // expect server to send us the latest messages
            setMessages(messages);
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
    }, [socket, room_id]);

    if( socket === null){
        return <Wrapper>Loading</Wrapper>
    }

    if( active === undefined){
        return(
            <Wrapper>
                <Header> Room </Header>
                <Container>
                    Please Select a Room
                </Container>
            </Wrapper>
        )
    }
    
    return(
        <Wrapper>
            <Header> Room {room_id} </Header>
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
width: 400px;
height:100%;
border-radius: 10px;
background-color: rgba(0,0,0,0.4);
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Header = styled.h2`
display:flex;
justify-content:center;
align-items: center;
color:white;
height:50px;
background-color: rgba(0,0,0,0.4);
border-radius:10px 10px 0px 0px;
margin:0;
`;

const Container = styled.div`
display:flex;
align-items: baseline;
flex-direction: column;
overflow:auto;
height: calc( 100% - 105px);
`;

const Message = styled.div`
float: right;
max-width:300px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
margin-top: 5px;
margin-bottom: 5px;
margin-left: 10px;
border-radius: 25px;
background-color: #78e08f;
padding: 5px 15px;
position: relative;
overflow-wrap: break-word;  
word-wrap: break-word; 
word-break: break-word;
`;

export default Chat