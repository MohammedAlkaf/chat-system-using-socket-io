import { useState, useContext } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';

const Signin = () => {

    const history = useHistory();

    const { isLoggedIn, setCurrentUser, currentUser, setIsLoggedIn } = useContext(CurrentUserContext);
    const [displayName, setDisplayName] = useState('');

    const initialUserInfo = {
        email:'',
        password:''
    };
    
    const [ loginForm, setLoginForm] = useState(initialUserInfo);

    const handleLogin = (ev) => {
        ev.preventDefault();
        setCurrentUser(loginForm);
        setIsLoggedIn(true);
        history.push('/rooms/select');
    }
    
    return (
        <Wrapper>
            <Title>
                Log Into Your Account
            </Title>
            <Form onSubmit={(ev) => handleLogin(ev)}>                
                <Input
                    placeholder='Email'
                    onChange={(ev) => setLoginForm({...loginForm, email: ev.target.value }) }
                />
                <Input
                    placeholder='Password'
                    onChange={(ev) => setLoginForm({...loginForm, passowrd: ev.target.value }) }
                />
                <Button type = 'submit'>
                    Sign In
                </Button>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width:100%;
height: 100%;
background: #373F51;
border-radius: 0px 0px 10px 10px;
`;

const Title = styled.h2`
margin: 0;
font-size: 1em;
height: 20%;
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
    margin-bottom: 5px;
    padding: 5px 10px;
    background: #D8DBE2;
`;

const inputcontainer = styled.div`
    display:flex;
    background: #D8DBE2;
`;

const Form = styled.form`
    position: relative;
    height: 80%;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
position: absolute;
width: 100%;
bottom: 0;
background: #58A4B0;
margin-top: 25px;
color: white;
border: none;
padding: 10px 30px;
font: inherit;
cursor: pointer;
outline: inherit;
&:disabled {
    cursor: not-allowed;
    opacity: 0.8;
    color: darkgrey;
}
`;
export default Signin