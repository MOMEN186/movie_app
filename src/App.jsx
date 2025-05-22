import "./App.css";
import MovieDetails from "./pages/MovieDetails";
import FavList from "./pages/FavList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Provider } from 'react-redux'
import { store }    from './app/store'
function App() {
  return (
    <Provider store={store}>
    <div>
        <Header />
        <div className="container my-5 d-flex">
          <Routes>          
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tvshow/:id?" element={<Home path="/tvshow" />} />
            <Route path="/watchlist" element={<FavList />} /> 
            <Route path="/:id?" element={<Home path=""  />} />      
          </Routes>
        </div>
      </div>
      </Provider>
  );
}

export default App;
