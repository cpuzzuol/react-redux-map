import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getReps = createAsyncThunk("data/getEmployees", (thunkAPI) => {
  return fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(json => json.data);
});

export const getSenators = createAsyncThunk("data/getSenators", () => {
  return fetch("https://api.propublica.org/congress/v1/116/senate/members.json", { headers: {'X-API-Key': '7cbqDGmfkXTOHhNxoIzHq7ZFhqRbqxjkUys4GsrP'}})
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(json => json.results);
});

export const mapdataSlice = createSlice({
  name: 'mapdata',
  initialState: {
    dings: 50,
    reps: [],
    offsets: {
      VT: [50, -8],
      NH: [34, 2],
      MA: [30, -1],
      RI: [28, 2],
      CT: [35, 10],
      NJ: [34, 1],
      DE: [33, 0],
      MD: [47, 10],
      DC: [49, 21]
    },
    partyColors: [
      { party: "R", color: '#c0392b' },
      { party: "D", color: '#2980b9' },
      { party: "I", color: '#8e44ad' },
      { party: "L", color: '#f1c40f' },
      { party: "G", color: '#27ae60' },
      { party: "C", color: '#f39c12' }
    ],
    senators: []
  },
  reducers: {
    incrementDingsByAmount: (state, action) => {
      state.dings += action.payload;
    },
  },
  extraReducers: {
    [getReps.fulfilled]: (state, action) => {
      state.reps = action.payload
    },
    [getSenators.fulfilled]: (state, action) => {
      state.senators = action.payload
    }
  }
});

export const { incrementDingsByAmount } = mapdataSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementDingsAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementDingsByAmount(amount));
  }, 1000);
};



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDings = state => state.dings.value;
export const selectNumReps = state => state.reps.length

export default mapdataSlice.reducer;
