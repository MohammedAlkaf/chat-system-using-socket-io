import { useState, useContext } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const { isLoggedIn, setCurrentUser, currentUser, setIsLoggedIn } = useContext(CurrentUserContext);
    const [displayName, setDisplayName] = useState('');

    const handleLogin = () => {
        setCurrentUser(displayName);
        setIsLoggedIn(true);
        history.push('/rooms/select');
    }

    if (isLoggedIn) {
        return (
            <Wrapper>
                <Message>
                    You are already logged in as {currentUser}
                </Message>
                <Button
                    onClick={(ev) => handleLogin(ev)}>
                    Go to Rooms
                </Button>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <Input
                placeholder='Enter a display name'
                onChange={(ev) => setDisplayName(ev.target.value)}
            />
            <Button
                disabled = { displayName.length === 0 }
                onClick={(ev) => handleLogin(ev)}>
                Log In
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
position:relative;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 300px;
height: 300px;
border-radius: 10px;
background-color: rgba(0,0,0,0.4);
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Input = styled.input`
font: inherit;
outline: none;
border:none;
text-align: center;
background-color:lightgrey;
color:black;
box-shadow: none;
margin-bottom: 20px;
padding: 10px;
border-radius:10px;
;
`;
const Button = styled.button`
background: #726DA8;
color: black;
border: none;
padding: 10px 30px;
font: inherit;
cursor: pointer;
outline: inherit;
border-radius: 10px;
&:disabled {
    cursor: not-allowed;
    opacity: 0.8;
    color: darkgrey;
}
`;
const Message = styled.div`
border: 1px solid red;
padding: 10px;
text-align:center;
`;

export default Login