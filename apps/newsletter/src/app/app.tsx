// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import Header from './Components/Header/Header';
import Title from './Components/Title/title';
import './app.scss';

export function App() {
  return (
    <div className="app">
      <Header></Header>
      <Title></Title>
    </div>
  );
}

export default App;
