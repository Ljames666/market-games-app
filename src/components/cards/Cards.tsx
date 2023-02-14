import Card from '@mui/material/Card';
import { IGames, selectGame } from '../../store/gamesSlice';
import { useAppDispatch } from '../../store';

export default function Cards({ data }: { data: IGames }) {
    const _dispatch = useAppDispatch();
    const handleClick = (model: IGames) => _dispatch(selectGame(model));
    return (
        <Card
            key={data.id}
            sx={{
                minHeight: 120,
                width: 280,

                backgroundImage: `url(${data.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ':hover': {
                    cursor: 'pointer',

                    top: 0,
                    left: '0',
                    zIndex: 10000,
                    width: '400px',

                    transform: 'scale(1) ',
                    opacity: 1,
                    borderRadius: '0 8px 8px 0',
                },
            }}
            onClick={() => handleClick(data)}
        />
    );
}
