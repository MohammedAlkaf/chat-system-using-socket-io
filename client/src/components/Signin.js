import { useState, useContext } from 'react';
import styled from 'styled-components';
import { CurrentUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';
import { FiAtSign, FiLock } from "react-icons/fi";

const Signin = () => {

    const history = useHistory();

    const { isLoggedIn, setCurrentUser, currentUser, setIsLoggedIn } = useContext(CurrentUserContext);

    const iconSize = 25;
    const iconColor = '#292D38';
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
                Log into Your Account
            </Title>
            <Form onSubmit={(ev) => handleLogin(ev)}>
                <Container>
                    <Inputcontainer>
                        <FiAtSign size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Email'
                            onChange={(ev) => setLoginForm({...loginForm, email: ev.target.value }) }
                        />
                    </Inputcontainer>

                    <Inputcontainer>
                        <FiLock size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Password'
                            onChange={(ev) => setLoginForm({...loginForm, passowrd: ev.target.value }) }
                        />
                    </Inputcontainer>
                    <SubContainer>
                        <a>
                            Forgot Password?
                        </a>
                        <CheckBox>
                            <input type="checkbox" name="remember" value= {'yes'}/>
                            <label htmlFor="remember"> Remember Me</label>
                        </CheckBox>
                    </SubContainer>             
                </Container>
                <Button type = 'submit'>
                    Sign in
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
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    display:flex;
    height: 80%;
    flex-direction: column;
    justify-content: center;
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

const SubContainer = styled.div`
    margin-top: 20px;
    display:flex;
    font-size: 0.73em;

    a{
        flex:1;
        text-align: center;
        
    }
`;

const CheckBox = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;


    label {
        margin-left: 5px;
    }
`;

const Form = styled.form`
    position: relative;
    height: 85%;
    display: flex;
    flex-direction: column;
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
export default Signin