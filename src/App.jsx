import "./App.css";

import FavList from "./pages/FavList";
import { Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponents/Header";
import Home from "./pages/Home";
import { Provider } from 'react-redux';
import { store } from './app/store';
import NotFound from "./pages/NotFound";
import ShowDetails from "./pages/ShowDetails";
import SearchWrapper from "./components/SearchComponents/SearchWrapper";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="container my-3">
         
          <Routes>          
            <Route path="/tvshow" element={<Home category="tv" />} />
            <Route path="/" element={<Home category="movie" />} />   
            <Route path="/watchlist" element={<FavList />} /> 
            <Route path="/search/:category/:query" element={<SearchWrapper />} /> 
           <Route path="/:category/:id" element={<ShowDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
   
    </Provider>
  );
}

export default App;
