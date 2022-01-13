import styled from "styled-components";

const LoginBar = ({ active, setActive }) => {

    return(
        <Wrapper>
            <Item 
                active = {active === 'sign in'}
                onClick={() => setActive('sign in')}
                style = { { borderRadius: ' 10px 0px 0px 0px' }}
            >
                Sign In
            </Item>
            <Item 
                active = {active === 'sign up'}
                onClick={()=> setActive('sign up')}
                style = { { borderRadius: ' 0px 10px 0px 0px' }}
            >
                Sign Up
            </Item>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
width:100%;
height:40px;
`;

const Item = styled.button`
font-weight: 700;
font-size: 1.1em;
flex:1;
display: flex;
justify-content: center;
align-items: center;
border: 0;
background: #292D38;
color: white;
font-family: inherit;
cursor: pointer;
color:grey;
outline: inherit;

${({ active }) => active && `
    background: #373F51;
    color:white;
`}

`;

export default LoginBar