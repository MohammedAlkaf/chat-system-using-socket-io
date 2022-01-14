import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import SendMessage from './SendMessage';
import socketIoClient from "socket.io-client";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Loading from './Loading';
import { CurrentUserContext } from '../contexts/userContext';

const Chat = ({ active }) => {

    const { room_id } = useParams();

    const { currentUser } = useContext(CurrentUserContext);
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
            <Header> 
                <span>Logged in as {currentUser.displayName}</span>
                Room {room_id} 
            </Header>
            {
                chatStatus === 'loading'
                ?
                <Container>
                    <Loading/>
                </Container>
                :
                <MessagesContainer>
                    {messages.map(({ _id, text, avatarUrl, sender_id, displayName, createdAt }) => (
                        <div>
                            {
                                sender_id === currentUser._id 
                                ? 
                                <MessageContainerSent key={_id}>
                                    <MessageInfoSent>
                                        <MessageSent key={_id} >
                                            <Text>{text}</Text>
                                        </MessageSent>
                                        <Time>{moment(createdAt).calendar()}</Time>
                                    </MessageInfoSent>
                                </MessageContainerSent>
                                :
                                <MessageContainerReceived key={_id}>
                                    <UserImg src={'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png'} alt="" key={_id} />
                                    <MessageInfo>
                                        <Sender>{displayName}</Sender>
                                        <MessageReceived key={_id} >
                                            <Text>{text}</Text>
                                        </MessageReceived>
                                        <Time>{moment(createdAt).calendar()}</Time>
                                    </MessageInfo>
                                </MessageContainerReceived>
                            }
                        </div>
                    ))}
                </MessagesContainer>
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
flex-direction: column;
justify-content:center;
align-items: center;
color:white;
height:60px;
background-color: rgba(0,0,0,0.4);
border-radius:10px 10px 0px 0px;
margin:0;

span{
    margin:0px;
    padding:5px;
    font-size: 0.45em;
}
`;

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
height: calc( 100% - 105px);
`;

const MessagesContainer = styled.div`
    display: flex;
    height: calc( 100% - 105px);
    flex-direction: column;
    overflow: auto;
`;

const MessageContainer = styled.div`
display:flex;
/* border:1px solid red; */
padding:3px 10px;
`;

const MessageInfo = styled.div`
display: flex;
flex-direction:column;
align-items: baseline;
`;

const MessageInfoSent = styled(MessageInfo)`
	align-items: flex-end;
`;

const Sender = styled.div`
font-size:0.75em;
margin-left: 9px;
margin-bottom:3px;
color:#1B1B1E;
font-weight: 700;
`;
const MessageContainerSent = styled(MessageContainer)`
flex-direction: row-reverse;
`;

const Time = styled.div`
font-size:0.7em;
margin: 3px 20px;
color: #D8DBE2;
`;

const MessageContainerReceived = styled(MessageContainer)`
`;

const Message = styled.div`
    display: flex;
    border-radius: 30px;
    align-items: center;
    color:black;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    overflow-wrap: break-word;  
    word-wrap: break-word; 
    word-break: break-word;
    max-width:350px;
`;

const MessageSent = styled(Message)`
    margin-right:10px;
    background-color: #3C4552;
    color: white;
    border-top-right-radius: 0px;
    flex-direction: row-reverse;
    text-align: end;
    float: right;
`;

const MessageReceived = styled(Message)`
    margin-left:10px;
    background-color: #58A4B0;
    color:white;
    border-top-left-radius: 0px;
    float: left;
`;

const UserImg = styled.img`
    border-radius: 50%;
    height: 35px;
    border: 2px solid white;
`;

const Text = styled.p`
    padding: 5px;
    font-weight: 400;
    font-size: 0.95em;
    margin-left: 10px;
    margin-right: 10px;
    overflow-wrap: break-word;
`;

export default Chat