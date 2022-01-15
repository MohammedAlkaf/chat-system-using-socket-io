import styled from "styled-components";
import { useContext } from 'react';
import * as FiIcons from "react-icons/fi";
import { deleteLoginSession } from "../helpers/loginSessionHelpers";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/userContext";

const LogoutButton =() => {

    const history = useHistory();
    const { isLoggedIn, setCurrentUser, currentUser, setIsLoggedIn } = useContext(CurrentUserContext);

    const handleLogout = async () => {
        await deleteLoginSession();
        setIsLoggedIn(false);
        setCurrentUser(null);
        history.push('/');
    }

    return (
        <Logout onClick = {()=> handleLogout()}>
            <FiIcons.FiPower size = {35} color='white'/>
        </Logout>
    )
};

const Logout = styled.div`
    right:0;
    position: absolute;
    height: 60px;
    width:60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
`;

export default LogoutButton
