import logo from './logo.svg';
import './App.css';
import brand from './img/bee.png'
import progress_bar from './img/progress_bar.png'
import ToDo from './components/ToDo'

function App() {
  return (
    // <div>
    //   <img src={brand} alt="Brand" className="Brand-logo" />;
    //   <h1>Hello World</h1>
    // </div>
    <div className="flexbox-container">
      <div className="flexbox-item">
        <img src={brand} alt="Brand" />
        <ToDo/>
      </div>
      <div className="flexbox-item">
        <img src={progress_bar} alt="Brand" />
      </div>
      <div className="flexbox-item"></div>
    </div>
  );
}

export default App;
