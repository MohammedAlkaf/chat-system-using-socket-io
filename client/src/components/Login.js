import { useState } from "react";
import styled from "styled-components";
import LoginBar from "./LoginBar";
import Signin from './Signin';
import Signup from './Signup';

const Login = () => {

    const [ active, setActive ] = useState('sign in');

    return (
        <Wrapper>
            <LoginBar setActive = { setActive } active = { active }/>
            <Container>
                {
                    active === 'sign in' &&
                        <Signin/>
                }
                            {
                    active === 'sign up' &&
                        <Signup/>
                }
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position:relative;
    display:flex;
    flex-direction: column;
    width: 350px;
    height: 350px;
    border-radius: 10px;
    color: white;
    background: #373F51;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

    @media (max-width: 350px) {
        width:95vw;
    }
`;

const Container = styled.div`
    width: 100%;
    height: calc( 100% - 40px);
    border-radius: 0px 0px 10px 10px;
`;

export default Login
