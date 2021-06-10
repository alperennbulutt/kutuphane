import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { QuietLibraryModel } from '../../@types/quietLibraryModel';
import { CONSTS } from './const';
// ----------------------------------------------------------------------

// type VehicleState = {
//   isLoading: boolean;
//   error: boolean;
//   detailModalIsOpen: boolean;
//   vehicleList: VehicleManager[];
//   vehicle: VehicleManager;
//   vehicleDocuments: VehicleDocumentManager[];
// };
type QuietLibraryState = {
  isLoading: boolean;
  error: boolean;
  detailModalIsOpen: boolean;
  quietLibraryList: QuietLibraryModel[];
  quiet: QuietLibraryModel;
};
const QuietLibraryInit = {
  workingAreaId: 0,
  workingAreaName: '',
  workingAreaTypeId: 0,
  currentCapacity: 0,
  tableOfNumber: 0,
  location: '',
  workingAreaTypeName: '',
  isOpenMassAppointment: false
};

const initialState: QuietLibraryState = {
  isLoading: false,
  error: false,
  detailModalIsOpen: false,
  quietLibraryList: [],
  quiet: QuietLibraryInit
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
    getAllQuietLibrarySuccess(state, action) {
      state.isLoading = false;
      state.quietLibraryList = action.payload;
    },

    // GET PROFILE
    filterQuietLibrarySuccess(state, action) {
      state.isLoading = false;
      state.quietLibraryList = action.payload;
    },
    // GET PROFILE
    saveQuietLibrarySuccess(state, action) {
      state.isLoading = false;
      state.quietLibraryList = action.payload;
    },
    // GET PROFILE
    getQuietLibraryByIdSuccess(state, action) {
      state.isLoading = false;
      state.quietLibraryList = action.payload;
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

export function GetAllQuietLibrary() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(CONSTS.WorkingAreaGetQuitLibrary, {});
      dispatch(slice.actions.getAllQuietLibrarySuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteTable(model: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${CONSTS.TableDeleteIsInWarehouse}`,
        model
      );
      dispatch(GetAllQuietLibrary());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAnnouncementById(announcementId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${CONSTS.AnnouncementGetAnnouncementById}${announcementId}`
      );
      dispatch(slice.actions.getQuietLibraryByIdSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getQuietLibraryById(announcementId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${CONSTS.AnnouncementGetAnnouncementById}${announcementId}`
      );
      dispatch(slice.actions.getQuietLibraryByIdSuccess(response.data.data));
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
