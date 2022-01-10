import Chat from "./components/Chat";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
const App = () => {

  return (
    <>
      <GlobalStyles/>
      <Wrapper>
        <Chat/>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
width:100vw;
height:100vh;
background: lightgrey;
`;

export default App;
