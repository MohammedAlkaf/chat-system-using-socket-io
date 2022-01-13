import { useState, useContext } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';

const Signup = () => {

    const history = useHistory();

    const { isLoggedIn, setCurrentUser, currentUser, setIsLoggedIn } = useContext(CurrentUserContext);

    const initialUserInfo = {
        email:'',
        password:''
    };
    
    const [ userInfo, setUserInfo] = useState(initialUserInfo);

    const handleLogin = () => {
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        history.push('/rooms/select');
    }
    
    return (
        <Wrapper>
            <Title>
                Sign Up with a New Account
                </Title>
            <Form>                
                <Input
                    placeholder='Email'
                />
                <Input
                    placeholder='Display Name'
                />
                <Input
                    placeholder='Password'
                />
                <Input
                    placeholder='Confirm Password'
                />
                <Input
                    placeholder='Avatar URL'
                />
                <Button type = 'submit'>
                    Sign Up
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
export default Signup