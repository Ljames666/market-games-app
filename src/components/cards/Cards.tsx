import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { IGames } from '../../store/gamesSlice';

export default function Cards({ data }: { data: IGames }) {
    return (
        <Card key={data.id} sx={{ maxWidth: 345, backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <CardHeader
                title={data.title}
                subheader={data.worth !== 'N/A' ? data.worth : 'Free'}
                sx={{
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    '& .MuiCardHeader-title': {
                        fontSize: 18,
                        color: '#b71c1c',
                        fontWeight: 900,
                    },
                    '& .MuiCardHeader-subheader': {
                        color: 'springgreen',
                    },
                }}
            />
            <CardMedia
                component='img'
                height='194'
                image={data.image}
                alt={data.title}
                sx={{ padding: '2px' }}
            />

            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label='share'>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
