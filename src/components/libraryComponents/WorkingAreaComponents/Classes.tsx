import { filter } from 'lodash';
import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
// material
import {
  Slide,
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Button,
  Checkbox,
  TextField,
  Grid,
  Dialog
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Label } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';

// redux
import { RootState } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import Page from '../../Page';
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import MoveTableButton from '../Tables/MoveTableButton';
import {
  TableListHead,
  TableListToolbar,
  UserListToolbar
} from '../../user/list';
import { GetWorkingAreaList } from '../../../redux/slices/classes';
import { ClassesModel } from '../../../@types/classesModel';
// import ShowReservationButton from './ShowReservationButton';
// import DeleteTableButton from './DeleteTableButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'role', label: 'Barkod Numarası', alignRight: false },
  { id: 'isVerified', label: 'Bulunduğu Yer', alignRight: false },
  { id: '' },
  { id: '' },

  { id: '' }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: ClassesModel[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.workingAreaName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children?: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

// Propsları Bu şekilde veriyoruz
type TableListPropsType = {
  title: string;
};

export default function Classes({ title }: TableListPropsType) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { userList } = useSelector((state: RootState) => state.user);
  const { classesList, classes } = useSelector(
    (state: RootState) => state.classes
  );
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [
    rowOptionclick,
    setRowOptionclick
  ] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    dispatch(GetWorkingAreaList());
  }, [dispatch]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = classesList.map((n) => n.workingAreaName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    classesList,
    getComparator(order, orderBy),
    filterName
  );
  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRowOptionclick(event.currentTarget);
    const tableId = String(
      event.currentTarget.attributes.getNamedItem('itemid')?.value
    );
    // dispatch(getAlltable());
    // setVehicleId(vehicleId);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Çalışma Alanları | Derslikler">
      <Container>
        <h1>{title}</h1>
        {/* <br />
        <Grid container spacing={2} padding={2}>
          <Grid xs={12} sm={3} paddingRight={1}>
            <TextField type="datetime-local" fullWidth>
              <option key={0} label="" />
            </TextField>
          </Grid>
          <Grid xs={12} sm={3} paddingRight={1}>
            <TextField type="datetime-local" fullWidth>
              <option key={0} label="" />
            </TextField>
          </Grid>
          <Grid xs={12} sm={3}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Tarihe Göre Listele
            </Button>
          </Grid>
          <Grid xs={12} sm={3}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Derslik Ekle
            </Button>
            <Dialog
              // fullScreen
              fullWidth
              maxWidth="sm"
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <Grid container>
                <TextField style={{ padding: 20 }}>asdasd</TextField>
                <Button
                  style={{ marginTop: 20 }}
                  size="large"
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Kaydet
                </Button>
              </Grid>
            </Dialog>
          </Grid>
        </Grid> */}

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 300 }}>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={classesList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        currentCapacity,
                        isOpenMassAppointment,
                        location,
                        tableOfNumber,
                        workingAreaId,
                        workingAreaName,
                        workingAreaTypeId,
                        workingAreaTypeName
                      } = row;
                      const isItemSelected =
                        selected.indexOf(workingAreaName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={workingAreaId}
                          tabIndex={-1}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleClick(workingAreaName)}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={() => handleClick(title)}
                          >
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell align="left">{workingAreaName}</TableCell>
                          {/* <TableCell>
                            <DeleteTableButton />
                          </TableCell>
                          <TableCell>
                            <ShowReservationButton />
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={classesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage}
            labelRowsPerPage="Sayfa Başına Satır"
          />
        </Card>
      </Container>
    </Page>
  );
}
