import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: 'history',
    initialState: {
        items: []
    },
    reducers: {
        addHistoryItem: (state, action) => {
            const {item} = action.payload;

            if(item) {
                state.items.push(item);
            }
        },
    }
});

export const { addHistoryItem, setHistoryItems, clearHistory } = historySlice.actions;
export default historySlice.reducer;