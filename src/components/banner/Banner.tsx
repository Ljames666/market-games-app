import { Box, Button, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { gamesSelectAll, IGames } from '../../store/gamesSlice';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Banner() {
    const navigate = (url: string) => {
        return (window.location.href = url);
    };
    const { game } = useSelector(gamesSelectAll);
    const [theGame, setTheGame] = useState<IGames | null>(null);
    useEffect(() => {
        if (game) setTheGame(game);
    }, [game]);
    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
            sx={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${theGame?.image})`,
                backgroundSize: 'cover',
            }}
        >
            <Box
                sx={{
                    padding: 5,
                    paddingTop: 10,
                    width: '100%',
                    height: '100%',
                    background:
                        'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,2,0.5) 30%, rgba(255,255,255,0) 100%)',
                }}
            >
                <Typography
                    variant='h5'
                    sx={{ fontFamily: 'Julee, cursive', fontWeight: 'bold' }}
                    color={green[50]}
                >
                    {theGame?.title}
                </Typography>
                <Typography
                    variant='h6'
                    sx={{ fontFamily: 'Julee, cursive', fontWeight: 'bold' }}
                    color={green[500]}
                >
                    {theGame?.worth === 'N/A' ? 'Free' : theGame?.worth}
                </Typography>
                <Typography variant='overline' color={green[500]}>
                    <span>For</span> {theGame?.platforms}
                </Typography>
                <Typography variant='body2' sx={{ width: '20rem' }} color={green[50]}>
                    {theGame?.description}
                </Typography>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                    }}
                >
                    <Button
                        variant='outlined'
                        sx={{ marginRight: 2 }}
                        onClick={() => navigate(theGame?.open_giveaway!)}
                    >
                        Jogar
                    </Button>
                    <Button variant='contained' onClick={() => navigate(theGame?.gamerpower_url!)}>
                        Mais Informações
                    </Button>
                </Box>
            </Box>
            <Box></Box>
        </Box>
    );
}

export default Banner;
