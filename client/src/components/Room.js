import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const Room = ({room, index, setActive, active }) => {

    const history = useHistory();

    const handleRoomClick = () => {
        setActive(index);
        history.push(`/rooms/${ index + 1 }`)
    }
    return(
        <Wrapper active = { active === index } onClick = { () => handleRoomClick()} >
            {room}
        </Wrapper>
    )
}

const Wrapper = styled.button`
font-family: inherit;
font-size:1.2em;
display:flex;
justify-content:center;
align-items:center;
background: none;
color:white;
flex:1;
border:0;
padding: 0;
transition: background 0.3s ease;
cursor:pointer;
&:hover {
    background: rgba(0,0,0,0.5);
}

${({ active }) => active && `background: rgba(0,0,0,0.5); border: 2px solid grey;`}

`;

export default Room