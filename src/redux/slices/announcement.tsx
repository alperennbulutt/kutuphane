import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import {
  AnnouncementModel,
  AddAnnouncementModel
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
    getAllAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.announcementList = action.payload;
    },

    // GET PROFILE
    filterAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.announcementList = action.payload;
    },
    // GET PROFILE
    saveAnnouncementSuccess(state, action) {
      state.isLoading = false;
      state.announcementList = action.payload;
    },
    // GET PROFILE
    getAnnouncementleByIdSuccess(state, action) {
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

      dispatch(getAllAnnouncement());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAllAnnouncement() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        CONSTS.AnnouncementGetAnnouncementList,
        {}
      );
      dispatch(slice.actions.getAllAnnouncementSuccess(response.data.data));
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

      dispatch(getAllAnnouncement());
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
      dispatch(slice.actions.filterAnnouncementSuccess(response.data.data));
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
