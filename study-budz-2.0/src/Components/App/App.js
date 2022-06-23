import { useState, useEffect } from 'react';
import './App.css';
import studyBudz from '../../pictures/studyBudz logo.png';
import Form from '../Form/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import LessonCard from '../LessonCard';
import LessonContainer from '../LessonContainer';
import Navbar from '../NavBar/index.js';
import HowStudyBudzWork from '../HowStudyBudzWork';
import HowToWorkTogether from '../HowToWorkTogether';

function App() {
  //Main data that comes from the db + initial render
  const [initialData, setInitialData] = useState(null);

  //Hook that fetches data for the initail render
  useEffect(() => {
    const url = `https://studybudzapp.herokuapp.com/lessons`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const LessonData = await response.json();

        setInitialData(LessonData.payload);
        console.log(LessonData.payload);
        console.log(LessonData);
        console.log(initialData);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []); //The submit button state will have to go inside the dep. array

  return (
    <Router>
      <div>
        <Navbar />
        <div className="App">
          <h1>StudyBudz</h1>
          <Switch>
            <Route exact path="/">
              <div className="main">
                {initialData && <LessonContainer lessons={initialData} />}
                <Form />
              </div>
            </Route>
            <Route path="/how-study-budz-work">
              <HowStudyBudzWork />
            </Route>
            <Route path="/how-to-work-together">
              <HowToWorkTogether />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
