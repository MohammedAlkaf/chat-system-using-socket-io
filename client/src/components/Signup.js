import { useState, useContext } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { CurrentUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';
import { FiAtSign, FiUser, FiLock, FiImage, FiCheckSquare, FiEye, FiEyeOff, FiAlertCircle} from "react-icons/fi";
import Loading from './Loading';
import uploadImage from '../helpers/uploadImage';
import { addLoginSession } from '../helpers/loginSessionHelpers';

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
    const [ isPasswordShown, setIsPasswordShown ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState({ status: 'idle', message:'no error'});
    const [ userImage, setUserImage ] = useState("");

    const handleInputChange = (name,value) => {
        setUserInfo({...userInfo, [name]:value});
        setErrorMessage({ status: 'idle', message:'no error'});
    };

    const handleSignup = async (ev) => {
        ev.preventDefault();
        await uploadImage(userImage, handleInputChange);
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
                addLoginSession(data.result);
                setCurrentUser(data.result);
                setIsLoggedIn(true);
                setFetchStatus('idle');
                history.push('/rooms/select');
            }
            else{
                console.log('Error: ', data.message);
                setErrorMessage({ status: 'error', message:data.message})
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
                            onChange={ (ev) => handleInputChange('email',ev.target.value)}
                            type='email'
                            autoComplete='email'
                        />
                    </Inputcontainer>                
                    <Inputcontainer>
                        <FiUser size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Display Name'
                            onChange={ (ev) => handleInputChange('displayName',ev.target.value)}
                            type='text'
                            autoComplete='name'
                        />
                    </Inputcontainer>
                    <Inputcontainer>
                        <FiLock size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Password'
                            onChange={ (ev) => handleInputChange('password',ev.target.value)}
                            type={ isPasswordShown ? 'text' : 'password' }
                            autoComplete= 'new-password'
                        />
                        <EyeIcon
                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                        >
                            {
                                isPasswordShown
                                ? <FiEye size = {iconSize} color = {iconColor} />
                                : <FiEyeOff size = {iconSize} color = {iconColor} />
                            }
                        </EyeIcon>
                    </Inputcontainer>
                    <Inputcontainer>
                        <FiCheckSquare size = {iconSize} color = {iconColor} />
                        <Input
                            placeholder='Confirm Password'
                            onChange={ (ev) => handleInputChange('confirmPassword',ev.target.value)}
                            type={ isPasswordShown ? 'text' : 'password' }
                            autoComplete= 'new-password'
                        />
                        <EyeIcon
                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                        >
                        </EyeIcon>
                    </Inputcontainer>
                    <Inputcontainer>
                        <FiImage size = {iconSize} color = {'#292D38'} />
                        <InputImg
                            onChange={ (ev) => setUserImage(ev.target.files[0])}
                            accept='image/*'
                            type='file'
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
            {
                errorMessage.status === 'error' &&
                <Error>
                    <FiAlertCircle size = {30}/>
                    <span>{errorMessage.message}</span>
                </Error>
            }
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
    width: 80%;
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

const EyeIcon = styled.div`
float: right;
display:flex;
align-items: center;
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

const Error = styled.div`
font-size: 0.8em;
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
background: #B80000;
border-radius: 10px;
padding: 10px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;

span{
    margin-left: 10px;
}
`;

const InputImg = styled.input`
    margin-left: 10px ;
    font:inherit;
    color: grey;
    font-size:1em;
    &::-webkit-file-upload-button {
        visibility: hidden;
        width:0px;
    }
    &::before{
        content: 'Upload an Image';
        color: white;
        background: #373F51;
        cursor: pointer;
        border-radius: 5px;
        padding:5px 10px;
        font-family:inherit;
    }
`;
export default Signup