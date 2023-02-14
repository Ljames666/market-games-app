import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import DrawerMenu from '../drawer-menu/DrawerMenu';
import { useSelector } from 'react-redux';
import { gamesSelectAll, setGameSearch } from '../../store/gamesSlice';
import { useAppDispatch } from '../../store/index';
import { useEffect } from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavHeader() {
    const dispatch = useAppDispatch();
    const menuId = 'primary-search-account-menu';
    const { game } = useSelector(gamesSelectAll);
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const [state, setState] = React.useState({
        left: false,
    });
    const [value, setValue] = React.useState('');

    const toggleDrawer =
        (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position='fixed'
                sx={{
                    background:
                        'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(0,0,2,0.5) 40%, rgba(255,255,255,0) 100%)',
                }}
                color='primary'
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={toggleDrawer('left', true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon color='primary' />
                    </IconButton>
                    {!!game && (
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                fontFamily: 'Julee, cursive',
                                fontWeight: 'bold',
                            }}
                        >
                            GROW GAMES
                        </Typography>
                    )}

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon color='primary' />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={value}
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    dispatch(setGameSearch(value));
                                    setValue('');
                                }
                            }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size='large'
                            aria-label='show 17 new notifications'
                            color='inherit'
                        >
                            <Badge badgeContent={17} color='error'>
                                <NotificationsIcon color='primary' />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size='large'
                            edge='end'
                            aria-label='account of current user'
                            aria-controls={menuId}
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <AccountCircle color='primary' />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='show more'
                            aria-controls={mobileMenuId}
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <MoreIcon color='primary' />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <DrawerMenu toggleDrawer={toggleDrawer} state={state} />
        </Box>
    );
}
