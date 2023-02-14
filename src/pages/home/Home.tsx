import { useSelector } from 'react-redux';
import {
    gamesSelectAll,
    getAllGames,
    IGames,
    setGameSearch,
    selectGame,
} from '../../store/gamesSlice';
import { useAppDispatch } from '../../store/index';
import { useEffect, useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import GamesCarousel from '../../components/caroussel/Carrousel';

import NavHeader from '../../components/nav-header/NavHeader';
import Banner from '../../components/banner/Banner';

function Home() {
    const homeRef = useRef();
    const _dispatch = useAppDispatch();
    const { data: games, game, dataSearch } = useSelector(gamesSelectAll);

    const [one, setOne] = useState<IGames[]>([]);
    const [two, setTwo] = useState<IGames[]>([]);
    const [three, setThree] = useState<IGames[]>([]);
    const [four, setFour] = useState<IGames[]>([]);

    useEffect(() => {
        _dispatch(getAllGames());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (games.length) {
            setOne(games.filter((game, i, arr) => i <= arr.length / 4));
            setTwo(games.filter((game, i, arr) => i > arr.length / 4 && i <= arr.length * (2 / 4)));
            setThree(
                games.filter(
                    (game, i, arr) => i > arr.length * (2 / 4) && i <= arr.length * (3 / 4)
                )
            );
            setFour(
                games.filter(
                    (game, i, arr) => i > arr.length * (3 / 4) && i <= arr.length * (4 / 4)
                )
            );
        }
    }, [games]);

    return (
        <Box
            ref={homeRef}
            sx={{
                height: '100%',
                overflowX: 'hidden',
            }}
            onScrollCapture={() => {}}
        >
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 999,
                    height: '60%',
                    width: '100%',

                    backgroundImage: 'url(https://wallpapercave.com/wp/wp2605458.jpg)',
                    backgroundSize: 'cover',
                    backgroundPositionY: '-80px',
                }}
            >
                {!!game ? (
                    <Banner />
                ) : (
                    <Box
                        display='flex'
                        alignItems='flex-end'
                        justifyContent='center'
                        sx={{
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    >
                        <Typography
                            variant='h1'
                            sx={{
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                                textShadow: '0px 0px 15px rgba(21, 132, 223, 0.85)',
                            }}
                            color='primary'
                        >
                            GROW GAMES
                        </Typography>
                    </Box>
                )}
            </Box>
            <NavHeader />
            {dataSearch.length ? (
                <>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography
                            variant='body2'
                            sx={{
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                                marginY: 5,
                            }}
                            color='primary'
                        >
                            Results:
                        </Typography>
                        <GamesCarousel idCar='dataSearch' data={dataSearch} />
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <Button
                            variant='contained'
                            onClick={() => {
                                _dispatch(setGameSearch(''));
                                _dispatch(selectGame(null));
                            }}
                        >
                            Filter Clean
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                                margin: 5,
                            }}
                            color='primary'
                        >
                            Top Rated:
                        </Typography>
                        <GamesCarousel idCar='one' data={one} />
                    </Box>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                                margin: 5,
                            }}
                            color='primary'
                        >
                            Most Played:
                        </Typography>
                        <GamesCarousel idCar='two' data={two} />
                    </Box>
                    <Box sx={{ marginBottom: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                                margin: 5,
                            }}
                            color='primary'
                        >
                            Featured Recently:
                        </Typography>
                        <GamesCarousel idCar='three' data={three} />
                    </Box>
                    <Box>
                        <Typography
                            variant='h6'
                            sx={{
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                                margin: 5,
                            }}
                            color='primary'
                        >
                            Newest:
                        </Typography>
                        <GamesCarousel idCar='four' data={four} />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Home;
