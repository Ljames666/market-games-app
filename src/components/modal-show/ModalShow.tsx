import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import {
    contatoSelectAll,
    setShowModal,
    ContatoState,
    updateContato,
    deleteContato,
    Contato,
} from '../../store/contatosSlice';
import { AppDispatch } from '../../store';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'rgba(255,255,255,0.7)',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
};

export default function ModalShow() {
    const dispatch: AppDispatch = useDispatch();

    const { showModal, listaContatos }: ContatoState = useSelector(contatoSelectAll);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const [contact, setContact] = useState({});

    const handleClose = () => dispatch(setShowModal({ open: false, type: undefined }));

    useEffect(() => {
        const contato = listaContatos.find((contact: Contato) => contact.id === showModal.id);
        if (contato) {
            setName(contato.name);
            setEmail(contato.email);
            setPhone(contato.phone);
            setAddress(contato.address);
        }
    }, [listaContatos, showModal.id]);

    const handleSubmit = (id: string, type: string) => {
        if (type === 'edit') {
            dispatch(updateContato({ id, name, email, phone, address }));
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            handleClose();
            return;
        }
        if (type === 'delete') {
            dispatch(deleteContato(id));
            handleClose();
            return;
        }
    };

    const nextInput = (e: any, name?: string) => {
        const { key } = e;
        if (key === 'Enter') {
            e.preventDefault();
            if (name) {
                const newInput = document.querySelector(`#${name}`);
                // @ts-ignore
                if (newInput) newInput.focus();
            } else {
                handleSubmit(showModal.id!, showModal.type!);
            }
        }
    };
    return (
        <Modal
            open={showModal.open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'>
            <Box sx={style}>
                {showModal.type === 'edit' && (
                    <>
                        <TextField
                            id='input-name'
                            label='Nome'
                            variant='outlined'
                            focused
                            sx={{ margin: '8px 0', width: '100%' }}
                            value={name}
                            InputProps={{
                                sx: { color: '#1976d2' },
                            }}
                            onKeyDown={(e) => nextInput(e, 'input-email')}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            id='input-email'
                            label='Email'
                            variant='outlined'
                            focused
                            sx={{ margin: '8px 0', width: '100%' }}
                            value={email}
                            InputProps={{
                                sx: { color: '#1976d2' },
                            }}
                            onKeyDown={(e) => nextInput(e, 'input-telefone')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id='input-telefone'
                            label='Telefone'
                            variant='outlined'
                            focused
                            sx={{ margin: '8px 0', width: '100%' }}
                            value={phone}
                            InputProps={{
                                sx: { color: '#1976d2' },
                            }}
                            onKeyDown={(e) => nextInput(e, 'input-endereco')}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            id='input-endereco'
                            label='Endereço'
                            variant='outlined'
                            focused
                            sx={{ margin: '8px 0', width: '100%' }}
                            value={address}
                            InputProps={{
                                sx: { color: '#1976d2' },
                            }}
                            onKeyDown={(e) => nextInput(e)}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </>
                )}
                {showModal.type === 'delete' && (
                    <>
                        <Typography variant='h4' sx={{ color: '#1976d2' }}>
                            Deseja excluir?
                        </Typography>
                        <Typography variant='body1' sx={{ color: '#1976d2' }}>
                            Não será possivel recuperar este recado ao confirmar a ação!
                        </Typography>
                    </>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <IconButton
                        color='success'
                        size='large'
                        onClick={() => handleSubmit(showModal.id!, showModal.type!)}>
                        <CheckIcon fontSize='large' />
                    </IconButton>
                    <IconButton color='error' size='large' onClick={handleClose}>
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    );
}
