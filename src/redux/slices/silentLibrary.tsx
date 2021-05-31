import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { TableModel } from '../../@types/tableModel';
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
type TableState = {
  isLoading: boolean;
  error: boolean;
  detailModalIsOpen: boolean;
  tableList: TableModel[];
  table: TableModel;
};
const TableInit = {
  tableId: 0,
  barcodeNumber: '',
  workingAreaId: 0,
  workingAreaName: '',
  isInWarehouse: true
};

const initialState: TableState = {
  isLoading: false,
  error: false,
  detailModalIsOpen: false,
  tableList: [],
  table: TableInit
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
      state.tableList = action.payload;
    },

    // GET PROFILE
    filterVehicleSuccess(state, action) {
      state.isLoading = false;
      state.tableList = action.payload;
    },
    // GET PROFILE
    saveVehicleSuccess(state, action) {
      state.isLoading = false;
      state.tableList = action.payload;
    },
    // GET PROFILE
    getVehicleByIdSuccess(state, action) {
      state.isLoading = false;
      state.table = action.payload;
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

export function getAllTable() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(CONSTS.TableGetAllTables, {});
      dispatch(slice.actions.getAllVehicleSuccess(response.data.data));
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
      dispatch(getAllTable());
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
