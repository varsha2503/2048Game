import ReactDOM  from 'react-dom' ;
import './main.scss' ;
import './styles.scss' ;
import BoardView from './components/Board';

const App = () => {
    return <BoardView />
}

ReactDOM.render(<App />,document.getElementById("root")) ;