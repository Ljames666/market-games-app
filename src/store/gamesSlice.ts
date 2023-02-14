import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from './rootReducers';
import axios from 'axios';

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

const api = axios.create({
    baseURL: 'https://gamerpower.p.rapidapi.com/api',
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3c09e34fcdmsh9ed47291f3b7b52p1ddeebjsnbd43fe2302d7',
        'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com',
    },
});

export const getAllGames = createAsyncThunk('allGames/get', async (_, { dispatch }) => {
    const { status, data } = await api.get('/giveaways');

    if (status !== 200) {
        console.error(data);
    }

    dispatch(setGameState(data));
});
type StateGames = {
    data: IGames[];
    dataSearch: IGames[];
    game: IGames | null;
};

// const gameAdapter = createEntityAdapter<IGames>({
//     selectId: (game) => game.id,
//     sortComparer: (a, b) => a.title.localeCompare(b.title),
// });

// const initialState = gameAdapter.getInitialState();
const initialState: StateGames = {
    data: [],
    dataSearch: [],
    game: null,
};

const gamesSlice = createSlice({
    name: 'gameList',
    initialState,
    reducers: {
        // setGameState: gameAdapter.setAll,
        setGameState: (state, action) => {
            state.data = action.payload;
        },
        setGameSearch: (
            state,
            action: {
                payload: string;
            }
        ) => {
            if (action.payload) {
                const search = state.data.filter((s) => s.title.includes(action.payload));
                state.dataSearch = search;
            } else {
                state.dataSearch = [];
            }
        },

        selectGame: (state, action) => {
            state.game = action.payload;
        },
    },
});

// export const { selectAll: gamesSelectAll, selectById } = gameAdapter.getSelectors(
//     (state: AppState) => state.gamesList
// );
export const gamesSelectAll = (state: AppState) => state.gamesList;

export const { setGameState, selectGame, setGameSearch } = gamesSlice.actions;

export default gamesSlice.reducer;
