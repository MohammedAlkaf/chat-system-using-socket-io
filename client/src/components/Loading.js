import styled from "styled-components"
import { keyframes } from "styled-components";
const Loading = () => {
    return (
        <Wrapper>
            <Ring>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </Ring>
        </Wrapper>
    )
}

const Wrapper = styled.div`
width:100%;
height:100%;
display: flex;
justify-content: center;
align-items: center;
`;

const ellipsis1  = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
`;

const ellipsis2  = keyframes`
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
`;

const ellipsis3  = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
`;

const Ring = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;

    div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #A0D2DB;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    div:nth-child(1) {
        left: 8px;
        animation: ${ellipsis1} 0.6s infinite;    
    }

    div:nth-child(2) {
        left: 8px;
        animation: ${ellipsis2} 0.6s infinite;  
    }

    div:nth-child(3) {
        left: 32px;
        animation: ${ellipsis2} 0.6s infinite;
    }

    div:nth-child(4) {
        left: 56px;
        animation: ${ellipsis3} 0.6s infinite;
    }
`;


export default Loading
