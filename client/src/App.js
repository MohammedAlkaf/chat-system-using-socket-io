import Chat from "./components/Chat";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./components/Sidebar";
import { useState, useContext} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { CurrentUserContext } from "./contexts/userContext";
const App = () => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const [ active, setActive ] =useState(undefined);
  const [ status, setStatus ] = useState('loading');

  return (
    <BrowserRouter>
        <GlobalStyles/>
        <Wrapper>
          <Container>
            <Switch>
                <Route exact path="/">
                  <Login/>
                </Route>
                { isLoggedIn &&
                  <>
                    <Sidebar active = { active } setActive = { setActive } setStatus = { setStatus }/>
                    <Route path="/rooms/:room_id">
                      <Chat active = { active } setActive = { setActive } setStatus = { setStatus } status = { status }/>
                    </Route>
                  </>
                }
                <Route path="">
                  page not found, 404
                </Route>
            </Switch>
          </Container>
        </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.main`
width:100vw;
height:100vh;
display: flex;
justify-content: center;
align-items: center;
background: #7F7FD5;
background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
`;

const Container = styled.div`
height: 95%;
max-height: 750px;
width: 1000px;
display: flex;
justify-content: center;
align-items: center;
`;
export default App;
