import { useSelector, useDispatch } from 'react-redux';
import { gamesSelectAll, getAllGames, setGameState } from '../../store/gamesSlice';
import { AppDispatch, useAppDispatch } from '../../store/index';
import { useEffect } from 'react';
import { dataGames } from '../../service/data/DataGamesMock';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Cards from '../../components/cards/Cards';
function Home() {
    const dispatch= useAppDispatch();
    const games = useSelector(gamesSelectAll);

    useEffect(() => {
        
        dispatch(getAllGames());
    }, []);

    return (
        <Grid container spacing={2}>
            {games.length &&
                games.map((game) => (
                    <Grid item xs={12} md={3} gap={2}>
                        <Cards data={game} />
                    </Grid>
                ))}
        </Grid>
    );
}

export default Home;
