import { useSelector, useDispatch } from 'react-redux';
import { gamesSelectAll, setGameState } from '../../store/gamesSlice';
import { AppDispatch } from '../../store/index';
import { useEffect } from 'react';
import { dataGames } from '../../service/data/DataGamesMock';
function Home() {
    const dispatch: AppDispatch = useDispatch();
    const games = useSelector(gamesSelectAll);

    useEffect(() => {
        dispatch(setGameState(dataGames));
    }, []);

    return (
        <div>
            {games.length &&
                games.map((game) => (
                    <>
                        <h2>{game.title}</h2>
                        <img src={game.thumbnail} alt={game.title} />
                        <p>{game.description}</p>
                    </>
                ))}
        </div>
    );
}

export default Home;
