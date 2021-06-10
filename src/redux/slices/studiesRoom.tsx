import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { StudiesRoomModel } from '../../@types/studiesRoomModel';
import { CONSTS } from './const';
// ----------------------------------------------------------------------

type StudiesRoomState = {
  isLoading: boolean;
  error: boolean;
  detailModalIsOpen: boolean;
  studiesRoomList: StudiesRoomModel[];
  studies: StudiesRoomModel;
};
const StudiesRoomInit = {
  workingAreaId: 0,
  workingAreaName: '',
  workingAreaTypeId: 0,
  currentCapacity: 0,
  tableOfNumber: 0,
  location: '',
  workingAreaTypeName: '',
  isOpenMassAppointment: false
};

const initialState: StudiesRoomState = {
  isLoading: false,
  error: false,
  detailModalIsOpen: false,
  studiesRoomList: [],
  studies: StudiesRoomInit
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PROFILE
    getAllStudiesRoomSuccess(state, action) {
      state.isLoading = false;
      state.studiesRoomList = action.payload;
    },

    // GET PROFILE
    filterStudiesRoomSuccess(state, action) {
      state.isLoading = false;
      state.studiesRoomList = action.payload;
    },
    // GET PROFILE
    saveStudiesRoomSuccess(state, action) {
      state.isLoading = false;
      state.studiesRoomList = action.payload;
    },
    // GET PROFILE
    getStudiesRoomByIdSuccess(state, action) {
      state.isLoading = false;
      state.studiesRoomList = action.payload;
    },
    onToggleDetailModal(state, action) {
      state.detailModalIsOpen = action.payload;
    }
    // GET PROFILE
    // getDocumentsByVehicleIdSuccess(state, action) {
    //   state.isLoading = false;
    //   state.vehicle = action.payload;
    // }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleDetailModal } = slice.actions;

// ----------------------------------------------------------------------

export function GetAllStudiesRoom() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(CONSTS.WorkingAreaGetStudiesRoom, {});
      dispatch(slice.actions.getAllStudiesRoomSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteStudiesRoom(model: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${CONSTS.TableDeleteIsInWarehouse}`,
        model
      );
      dispatch(GetAllStudiesRoom());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStudiesRoomById(announcementId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${CONSTS.AnnouncementGetAnnouncementById}${announcementId}`
      );
      dispatch(slice.actions.getStudiesRoomByIdSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

{
  /*
export function getDocumentsByVehicleId(idForVehicle: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${CONSTS.ASSET_MANAGEMENT_VEHICLE_GET_DOCUMENS}?vehicleId=${idForVehicle}`
      );
      dispatch(
        slice.actions.getDocumentsByVehicleIdSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
*/
}

{
  /* 
export function saveVehicleDocument(idForVehicle: string, model: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${CONSTS.ASSET_MANAGEMENT_VEHICLE_ADD_DOCUMENT}`,
        {
          vehicleId: idForVehicle,
          documentDetails: model
        }
      );
      localStorage.removeItem('vehicleId');
      localStorage.removeItem('documentPath');
      dispatch(getAllVehicle());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
*/
}
{
  /* 
export function saveDocumentManagement(fileName: string, data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${CONSTS.MANAGEMENT_UPLOAD_FILE}`, {
        FileName: fileName,
        FormFile: data
      });
      localStorage.setItem('documentPath', response.data);
      // dispatch(getAllVehicle());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
*/
}

// ----------------------------------------------------------------------
