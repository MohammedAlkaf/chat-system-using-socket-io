import { useState, useContext } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { CurrentUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';
import { FiAtSign, FiUser, FiLock, FiImage, FiCheckSquare} from "react-icons/fi";
import Loading from './Loading';

const Signup = () => {

    const history = useHistory();

    const { isLoggedIn, setCurrentUser, currentUser, setIsLoggedIn } = useContext(CurrentUserContext);
    const initialUserInfo = {
        email:'',
        password:'',
        confirmPassword:'',
        displayName:'',
        avatarUrl:''
    };
    const iconSize = 25;
    const iconColor = '#292D38';
    
    const [ userInfo, setUserInfo] = useState(initialUserInfo);
    const [ fetchStatus, setFetchStatus ] = useState('idle');

    const handleSignup = (ev) => {
        ev.preventDefault();
        setFetchStatus('loading');
        fetch('/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        })
        .then(res => res.json())
        .then(data => {
            if( data.status === 200) {
                console.log('Success: ', data.message);
                setCurrentUser(data.result);
                setIsLoggedIn(true);
                setFetchStatus('idle');
                history.push('/rooms/select');
            }
            else{
                console.log('Error: ', data.message);
                setFetchStatus('idle');
            }
        })
    }
    
    return (
        <Wrapper>
            <Title>
                Sign up with a New Account
                </Title>
            <Form onSubmit={(ev) => handleSignup(ev)}>
                <Container>
                    <Inputcontainer>
                        <FiAtSign size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Email'
                            onChange={ (ev) => setUserInfo({...userInfo, email:ev.target.value})}
                            type='email'
                        />
                    </Inputcontainer>                
                    <Inputcontainer>
                        <FiUser size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Display Name'
                            onChange={ (ev) => setUserInfo({...userInfo, displayName:ev.target.value})}
                            type='text'
                        />
                    </Inputcontainer>
                    <Inputcontainer>
                        <FiLock size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Password'
                            onChange={ (ev) => setUserInfo({...userInfo, password:ev.target.value})}
                            type='password'
                        />
                    </Inputcontainer>
                    <Inputcontainer>
                        <FiCheckSquare size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Confirm Password'
                            onChange={ (ev) => setUserInfo({...userInfo, confirmPassword:ev.target.value})}
                            type='password'
                        />
                    </Inputcontainer>
                    <Inputcontainer>
                        <FiImage size = {iconSize} color = {'#292D38'} />
                        <Input
                            placeholder='Avatar URL'
                            onChange={ (ev) => setUserInfo({...userInfo, avatarUrl:ev.target.value})}
                            type='text'
                        />
                    </Inputcontainer>
                </Container>
                <Button type = 'submit'>
                    {
                        fetchStatus === "loading"
                        ? <Loading/>
                        : "Sign up"
                    }
                </Button>
            </Form>
        </Wrapper>
    )
}

const slideInLeft =  keyframes`
    0% {
        transform: rotateY(70deg);
        transform-origin: right;
        opacity: 0;
    }
    100% {
        transform: rotateY(0);
        transform-origin: right;
        opacity: 1;
    }
`;

const Wrapper = styled.div`
width:100%;
height: 100%;
background: #373F51;
border-radius: 0px 0px 10px 10px;
animation: ${slideInLeft} 0.6s ease-in-out both;
`;


const Title = styled.h2`
margin: 0;
font-size: 1em;
height: 15%;
display: flex;
justify-content: center;
align-items: center;
`;

const Input = styled.input`
    font: inherit;
    outline: none;
    border:0;
    color:black;
    box-shadow: none;
    margin-left: 5px;
    background: #D8DBE2;
`;

const Inputcontainer = styled.div`
    display:flex;
    align-items: center;
    background: #D8DBE2;
    padding: 5px;
    margin-bottom: 4px;
`;

const Form = styled.form`
    position: relative;
    height: 85%;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display:flex;
    height: 80%;
    flex-direction: column;
    justify-content: center;
`;

const Button = styled.button`
width: 100%;
height: 20%;
background: #58A4B0;
color: white;
border: none;
font: inherit;
cursor: pointer;
outline: inherit;
border-radius: 0px 0px 10px 10px;
&:disabled {
    cursor: not-allowed;
    opacity: 0.8;
    color: darkgrey;
}
`;
export default Signup