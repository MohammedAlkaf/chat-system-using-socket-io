import styled from 'styled-components';
import uniqid from 'uniqid'
import Room from './Room';

const Sidebar = ({ active, setActive, setIsmenuShown }) => {

    const rooms = [
        'Room 1',
        'Room 2',
        'Room 3',
        'Room 4',
        'Room 5',
        'Room 6',
        'Room 7',
        'Room 8',
        'Room 9',
        'Room 10'
    ]
    return(
        <Wrapper>
            {
                rooms.map( 
                    (room, index)=> 
                        <Room 
                            key = { uniqid() } 
                            room = { room }
                            index = { index }
                            active = { active }
                            setActive = { setActive }
                            setIsmenuShown = { setIsmenuShown }
                        />
                )
            }
        </Wrapper>
    );
} 


const Wrapper = styled.div`
font-size:1.2em;
position:relative;
display: flex;
flex-direction: column;
margin-right: 30px;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.8);
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
export default Sidebar