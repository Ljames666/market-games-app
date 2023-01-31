import { combineReducers } from '@reduxjs/toolkit';
import gamesList from './gamesSlice';

const reducer = {
    // TODO: é um obj com todos os reducer do app
    // TODO: fiz assim para não ficar add no combineReducers e ter perigo de fazer M
    gamesList,
};

const rootReducers = combineReducers({
    ...reducer, // intero a const de cima(tudo que estiver lá vem para cá)
});

export type AppState = ReturnType<typeof rootReducers>; // cria o type dos estados

export default rootReducers;
