import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './rootReducers';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    // cria loja
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production', // ativa devTools se o env for diferente de produção
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

/* TODO: Algumas coisas podem estar diferente do mentor, mas funcionam do mesmo jeito
        ,afinal trabalho com React com uso de Bigdata(pesquise na intenet) 8h ou mais
         por dia e ainda cada dev tem seu jeito de fazer.
        Isto não quer dizer um tá errado e outro certo com tempo você vai ter seu estilo
        de codar também. O importante é entender como as coisas funcionam para definir o 
        melhor jeito de configurar, pois cada app pode ter suas particularidades. */
