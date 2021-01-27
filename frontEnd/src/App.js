import logo from './logo.svg';
import './App.css';
import brand from './img/bee.png'

function RenderWeather() {

}

function App() {
  return (
    // <div>
    //   <img src={brand} alt="Brand" className="Brand-logo" />;
    //   <h1>Hello World</h1>
    // </div>
    <div className="flexbox-container">
      <div class="flexbox-item">
        <img src={brand} alt="Brand" />
        <p>Hi, this is meHi, this is me</p>
      </div>
      <div class="flexbox-item"></div>
      <div class="flexbox-item"></div>
    </div>
  );
}

export default App;
