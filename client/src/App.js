import Chat from "./components/Chat";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {

  const [ active, setActive ] =useState(0);

  return (
    <>
      <GlobalStyles/>
      <Wrapper>
        <Sidebar active = { active } setActive = { setActive }/>
        <Chat active = { active } setActive = { setActive }/>
      </Wrapper>
    </>
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
background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);`;
export default App;
