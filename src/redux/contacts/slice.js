import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  list: [
    { id: 'id-1', name: 'Alex Long', tel: '430-00-98' },
    { id: 'id-2', name: 'Bill Short', tel: '523-09-52' },
    { id: 'id-3', name: 'Cath Black', tel: '567-90-91' },
    { id: 'id-4', name: 'Danna White', tel: '123-45-67' },
  ],
};

export const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {
    createContact: {
      reducer: (state, { payload }) => ({ list: [...state.list, payload] }),
      prepare: contact => ({ payload: { id: nanoid(), ...contact } }),
    },

    removeContact: (state, { payload }) => ({
      list: state.list.filter(({ id }) => id !== payload),
    }),
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsPersistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { createContact, removeContact } = contactsSlice.actions;
