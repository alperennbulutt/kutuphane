import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { TotalNumberOfAppointmentsModel } from '../../@types/analyticsModel';
import { CONSTS } from './const';
import { MapDeckglOverlay } from '../../components/map';
// ----------------------------------------------------------------------

type TotalNumberOfAppointmentsState = {
  isLoading: boolean;
  error: boolean;
  detailModalIsOpen: boolean;
  totalNumberOfAppointmentsList: TotalNumberOfAppointmentsModel[];
  total: TotalNumberOfAppointmentsModel;
};
const totalNumberOfAppointmentsInit = {
  numberOfAppointments: 0,
  numberOfPastAppointments: 0,
  upComingNumberAppointment: 0
};

const initialState: TotalNumberOfAppointmentsState = {
  isLoading: false,
  error: false,
  detailModalIsOpen: false,
  totalNumberOfAppointmentsList: [],
  total: totalNumberOfAppointmentsInit
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
    getAllTotalNumberOfAppointmentsListSuccess(state, action) {
      state.isLoading = false;
      state.totalNumberOfAppointmentsList = action.payload;
    },

    // // GET PROFILE
    // filterAnnouncementSuccess(state, action) {
    //   state.isLoading = false;
    //   state.announcementList = action.payload;
    // },
    // GET PROFILE
    // saveAnnouncementSuccess(state, action) {
    //   state.isLoading = false;
    //   state.announcementList = action.payload;
    // },

    // GET PROFILE
    getTotalNumberOfAppointmentsListByIdSuccess(state, action) {
      state.isLoading = false;
      state.total = action.payload;
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

export function getAllTotalNumberOfAppointmentsList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        CONSTS.StatisticsGetTotalNumberOfAppointments,
        {}
      );
      dispatch(
        slice.actions.getAllTotalNumberOfAppointmentsListSuccess(
          response.data.data
        )
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTotalNumberOfAppointmentsListById(announcementId: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${CONSTS.AnnouncementGetAnnouncementById}${announcementId}`
      );
      dispatch(
        slice.actions.getTotalNumberOfAppointmentsListByIdSuccess(
          response.data.data
        )
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// export function addAnnouncement(model: any) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(
//         `${CONSTS.AnnouncementAddAnnouncement}`,
//         {
//           title: model.title,
//           description: model.description,
//           publicationDate: model.publicationDate,
//           announcementTypeId: Number(model.announcementTypeId),
//           takedownDate: model.takedownDate
//         }
//       );
//       localStorage.setItem('id', response.data.data.id);

//       dispatch(getAllTotalNumberOfAppointmentsList());
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function deleteTotalNumberOfAppointmentsList(model: any) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(
//         `${CONSTS.AnnouncementDeleteAnnouncement}`,
//         model
//       );
//       dispatch(getAllTotalNumberOfAppointmentsList());
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function updateAnnouncement(model: any) {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post(
//         `${CONSTS.AnnouncementEditAnnounement}`,
//         {
//           id: Number(model.id),
//           title: model.title,
//           description: model.description,
//           publicationDate: model.publicationDate,
//           announcementTypeId: Number(model.announcementTypeId),
//           takedownDate: model.takedownDate
//         }
//       );
//       localStorage.setItem('id', response.data.data.id);

//       dispatch(getAllAnnouncement());
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
//         CONSTS.AnnouncementGetAnnouncementList,
//         {
//           query: _query,
//           registered: _registered
//         }
//       );
//       dispatch(slice.actions.filterAnnouncementSuccess(response.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

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
