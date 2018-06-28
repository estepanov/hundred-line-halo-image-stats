import React from "react";
import styled from "styled-components";

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Description from "./components/description.jsx";
import Generator from "./generator.jsx";

const AppContainer = styled.div`
display: flex;
flex-direction: column;
flex-grow: 1;
flex-shrink: 0;
`;

const App = () => <AppContainer>
  <Header />
  <Description />
  <Generator />
  <Footer />
</AppContainer>

export default App;
