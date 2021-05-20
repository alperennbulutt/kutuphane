import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { AnnouncementModel } from '../../@types/announcementModel';
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
type AnnouncementState = {
  isLoading: boolean;
  error: boolean;
  detailModalIsOpen: boolean;
  announcementList: AnnouncementModel[];
  announcement: AnnouncementModel;
};
const announcementInit = {
  id: '',
  title: '',
  description: '',
  publicationDate: '',
  announcementTypeId: 0,
  announcementTypeName: '',
  takedownDate: ''
};
const vehicleDocumentsInit = {
  id: '',
  tenantId: 0,
  createDate: '',
  createUserName: '',
  updateDate: '',
  updateUserName: '',
  documentName: '',
  documentTypeCode: '',
  validityPeriodTypeCode: '',
  validityPeriod: 0,
  lastRenewalDate: '',
  documentImagePath: '',
  isDeleted: false
};
const initialState: AnnouncementState = {
  isLoading: false,
  error: false,
  detailModalIsOpen: false,
  announcementList: [],
  announcement: announcementInit
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
    getAllVehicleSuccess(state, action) {
      state.isLoading = false;
      state.announcementList = action.payload;
    },

    // GET PROFILE
    filterVehicleSuccess(state, action) {
      state.isLoading = false;
      state.announcementList = action.payload;
    },
    // GET PROFILE
    saveVehicleSuccess(state, action) {
      state.isLoading = false;
      state.announcementList = action.payload;
    },
    // GET PROFILE
    getVehicleByIdSuccess(state, action) {
      state.isLoading = false;
      state.announcement = action.payload;
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
// Actions
export const { onToggleDetailModal } = slice.actions;

// ----------------------------------------------------------------------

export function getAllAnnouncement() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        CONSTS.AnnouncementGetAnnouncementList,
        {}
      );
      dispatch(slice.actions.getAllVehicleSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteAnnouncement(model: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${CONSTS.AnnouncementDeleteAnnouncement}`,
        model
      );
      dispatch(getAllAnnouncement());
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
