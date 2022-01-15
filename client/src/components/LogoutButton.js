import styled from "styled-components";
import * as FiIcons from "react-icons/fi";
import { deleteLoginSession } from "../helpers/loginSessionHelpers";
import { useHistory } from "react-router-dom";

const LogoutButton =() => {

    const history = useHistory();

    const handleLogout = async () => {
        await deleteLoginSession();
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
