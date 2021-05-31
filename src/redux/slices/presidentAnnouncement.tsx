import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import {
  AddAnnouncementModel,
  PresidentAnnouncementModel
} from '../../@types/announcementModel';
import { CONSTS } from './const';
import { MapDeckglOverlay } from '../../components/map';
// ----------------------------------------------------------------------

// type VehicleState = {
//   isLoading: boolean;
//   error: boolean;
//   detailModalIsOpen: boolean;
//   vehicleList: VehicleManager[];
//   vehicle: VehicleManager;
//   vehicleDocuments: VehicleDocumentManager[];
// };
type PresidentAnnouncementState = {
  isLoading: boolean;
  error: boolean;
  detailModalIsOpen: boolean;
  presidentAnnouncementList: PresidentAnnouncementModel[];
  presidentAnnouncement: PresidentAnnouncementModel;
};

const presidentAnnouncementInit = {
  id: 0,
  title: '',
  description: '',
  publicationDate: '',
  announcementTypeId: 0,
  announcementTypeName: '',
  takedownDate: ''
};

const initialState: PresidentAnnouncementState = {
  isLoading: false,
  error: false,
  detailModalIsOpen: false,
  presidentAnnouncementList: [],
  presidentAnnouncement: presidentAnnouncementInit
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
    getAllPresidentAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.presidentAnnouncementList = action.payload;
    },

    // GET PROFILE
    filterPresidentAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.presidentAnnouncementList = action.payload;
    },
    // GET PROFILE
    savePresidentAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.presidentAnnouncementList = action.payload;
    },

    // GET PROFILE
    getPresidentAnnouncementByIdSuccess(state, action) {
      state.isLoading = false;
      state.presidentAnnouncement = action.payload;
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

export function addAnnouncement(model: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${CONSTS.AnnouncementAddAnnouncement}`,
        {
          title: model.title,
          description: model.description,
          publicationDate: model.publicationDate,
          announcementTypeId: Number(model.announcementTypeId),
          takedownDate: model.takedownDate
        }
      );
      localStorage.setItem('id', response.data.data.id);

      dispatch(getPresidentAnnouncement());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPresidentAnnouncement() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        CONSTS.AnnouncementGetPresidentAnnouncementList,
        {}
      );
      dispatch(
        slice.actions.getAllPresidentAnnouncementSuccess(response.data.data)
      );
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
      dispatch(getPresidentAnnouncement());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAnnouncementById(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${CONSTS.AnnouncementGetAnnouncementList}?id=${id}`
      );
      dispatch(
        slice.actions.getPresidentAnnouncementByIdSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateAnnouncement(model: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `${CONSTS.AnnouncementEditAnnounement}`,
        {
          id: model.id,
          title: model.title,
          description: model.description,
          publicationDate: Number(model.publicationDate),
          announcementTypeId: model.announcementTypeId,
          takedownDate: model.takedownDate
        }
      );

      dispatch(getPresidentAnnouncement());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function filterAnnouncement(_query: string, _registered: boolean) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        CONSTS.AnnouncementGetAnnouncementList,
        {
          query: _query,
          registered: _registered
        }
      );
      dispatch(
        slice.actions.filterPresidentAnnouncementSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// export function getAllVehicle() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(
//         CONSTS.ASSET_MANAGEMENT_VEHICLE_GET_ALL,
//         {}
//       );
//       dispatch(slice.actions.getAllVehicleSuccess(response.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function getVehicleById(vehicleId: string) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(
//         `${CONSTS.ASSET_MANAGEMENT_VEHICLE_GET}?vehicleId=${vehicleId}`
//       );
//       dispatch(slice.actions.getVehicleByIdSuccess(response.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function filterAnnouncement(_query: string, _registered: boolean) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(
//         CONSTS.ASSET_MANAGEMENT_VEHICLE_FILTER,
//         {
//           query: _query,
//           registered: _registered
//         }
//       );
//       dispatch(slice.actions.filterVehicleSuccess(response.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function saveAnnouncement(model: any) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(CONSTS.AnnouncementEditAnnounement, {
//         ...model
//       });
//       localStorage.setItem('vehicleId', response.data.data.id);
//       dispatch(getAllAnnouncement());
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function removeAnnouncement(model: any) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(
//         `${CONSTS.AnnouncementDeleteAnnouncement}`,
//         model
//       );
//       dispatch(getAllVehicle());
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

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

// export function getAllModels() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(
//         CONSTS.,
//         {}
//       );
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

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
