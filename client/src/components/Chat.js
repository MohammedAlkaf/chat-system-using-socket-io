import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SendMessage from './SendMessage';
import socketIoClient from "socket.io-client";
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const Chat = ({ active }) => {

    const { room_id } = useParams();

    const [ messages, setMessages ] = useState([]);
    const [ socket, setSocket ] = useState(null);
    const [ chatStatus, setChatStatus ] = useState('loading')
    useEffect( () => {
        if(active !== undefined){
            setSocket(
                socketIoClient("http://localhost:8000",
                { query: `room=room_${room_id}` })
            );
        }
    },[room_id]);

    useEffect(()=> {
        if( socket === null){
            return null
        }
        setChatStatus('loading');

        socket.on('connect', () => console.log('New client with id: ', socket.id));

        socket.on("get-messages", (messages) => {
            // expect server to send us the latest messages
            setMessages(messages);
            setChatStatus('idle');
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
    }, [socket, room_id]);

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
            {
                chatStatus === 'loading'
                ?
                <Container>
                    <Loading/>
                </Container>
                :
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
            }
            <SendMessage room_id = { room_id } socket = { socket }/>
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