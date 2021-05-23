import logo from './logo.svg';
import './App.css';
import Window from './Components/Window';
import Buttons from './Components/Buttons';
import styled from 'styled-components';


function App() {
  return (
    <AppWrapper>
      <Window/>
      <Buttons/>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  background: rgb(0,192,215);
  background: linear-gradient(73deg, rgba(0,192,215,1) 26%, rgba(5,234,143,1) 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`