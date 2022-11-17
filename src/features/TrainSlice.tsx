import { createSlice } from "@reduxjs/toolkit";
import { ITrainData } from "../model/Model";

export interface IInitialState {
  trains: ITrainData[]
  isEditForm: boolean
  editTrain: ITrainData | null
}

const trainSliceItinialState: IInitialState = {
  trains: [
    {
      name: "name",
      seria: "seria",
      sectionsCount: 20,
      coord: [55, 55],
      id: 1,
    },
    {
      name: "name-2",
      seria: "seria-2",
      sectionsCount: 15,
      coord: [56, 56],
      id: 2,
    },
    {
      name: "name-3",
      seria: "seria-3",
      sectionsCount: 15,
      coord: [57, 57],
      id: 3,
    },
  ],
  isEditForm: false,
  editTrain: null
};

export const trainSlice = createSlice({
  name: "trains",
  initialState: trainSliceItinialState,
  reducers: {
    addTrain: (state: IInitialState, action) => {
      state.trains.push(action.payload);
    },
    removeTrain: (state: IInitialState, action) => {
      state.trains = state.trains.filter((item) => item.id !== action.payload)
    },
    updateTrain: (state: IInitialState, action) => {
        state.trains = state.trains.map(train => train.id === action.payload.id ? action.payload : train)
    },
    changeFormEditStatus: (state: IInitialState, action) => {
        state.editTrain = action.payload.editTrain
        state.isEditForm = action.payload.status
    }
  },
});

export const { addTrain, removeTrain, updateTrain, changeFormEditStatus } = trainSlice.actions;

export default trainSlice.reducer;
