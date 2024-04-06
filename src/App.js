import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// 메인 페이지 /
// 영화 전체 페이지 (서치) /movie
// 영화 디테일 페이지 /movie/:id
// 추천 영화
// 리뷰
function App() {
  return (
    <Routes>
        <Route path='/' element={<AppLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='movie'>
              <Route index element={<MoviePage/>}/>
              <Route path=':id' element={<MovieDetailPage/>}/>
            </Route>
        </Route>
        
        <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
