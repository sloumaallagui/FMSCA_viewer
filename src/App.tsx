import React, { useEffect, useState } from 'react';
import './App.css';
import DatabaseService from './services/database-service.service';
import MainPage from './pages/main-page.page';
import LoadingPage from './pages/loading-page.page';
function App() {
  const [isDatabaseLoaded, setDatabaseLoaded] :any = useState(false);
  useEffect(() =>{
    DatabaseService.initDatabase().then((result: any) =>{
      if(result){
        setDatabaseLoaded(true)
      }
    })
  })
  return (
    <div className="App">
    { isDatabaseLoaded ? ( <MainPage /> ) : ( <LoadingPage /> ) }
    </div>
  );
}

export default App;
