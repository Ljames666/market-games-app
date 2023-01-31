import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AppState } from './rootReducers';

export interface IGames {
    id: number;
    title: string;
    worth: string;
    thumbnail: string;
    image: string;
    description: string;
    instructions: string;
    open_giveaway_url: string;
    published_date: string;
    type: string;
    platforms: string;
    end_date: string;
    users: number;
    status: string;
    gamerpower_url: string;
    open_giveaway: string;
}

const gameAdapter = createEntityAdapter<IGames>({
    selectId: (game) => game.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = gameAdapter.getInitialState();

const gamesSlice = createSlice({
    name: 'gameList',
    initialState,
    reducers: {
        setGameState: gameAdapter.setAll,
    },
});

export const { selectAll: gamesSelectAll, selectById } = gameAdapter.getSelectors(
    (state: AppState) => state.gamesList
);

export const { setGameState } = gamesSlice.actions;

export default gamesSlice.reducer;
