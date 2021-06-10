import { filter } from 'lodash';
import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  TableContainer,
  TablePagination
} from '@material-ui/core';
import { useTheme, styled } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';

// redux
import { RootState } from '../../../redux/store';
// components
import Page from '../../Page';
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import { TableListHead, TableListToolbar } from '../../user/list';
import {
  GetAllQuietLibrary,
  onToggleDetailModal,
  getQuietLibraryById
} from '../../../redux/slices/quietLibrary';
import { QuietLibraryModel } from '../../../@types/quietLibraryModel';
import useLocales from '../../../hooks/useLocales';
import DeleteTableButton from '../SilentLibrary/DeleteTableButton';
import ShowReservationButton from '../SilentLibrary/ShowReservationButton';
// import Details from './Details';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'title', label: 'Başlık', alignRight: false },
//   { id: 'descreption', label: 'Açıklama', alignRight: false }
// ];

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
  array: QuietLibraryModel[],
  comparator: (a: any, b: any) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  console.log('buraya girdi');
  console.log(array);
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

// Propsları Bu şekilde veriyoruz
type GuestListPropsType = {
  title: string;
};

export default function QuietLibrary({ title }: GuestListPropsType) {
  const dispatch = useDispatch();
  const { quietLibraryList, quiet } = useSelector(
    (state: RootState) => state.quiet
  );
  const [open, setOpen] = useState(false);

  const { allLang, currentLang, translate, onChangeLang } = useLocales();

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
    dispatch(GetAllQuietLibrary());
  }, [dispatch]);

  const TABLE_HEAD = [
    {
      id: 'title',
      label: translate('Başlık'),
      alignRight: false
    },
    {
      id: 'descreption',
      label: translate('Açıklama'),
      alignRight: false
    },
    {
      id: 'publicationDate',
      label: translate('Yayınlanma Tarihi'),
      alignRight: false
    },
    {
      id: 'takedownDate',
      label: translate('Bitiş Tarihi'),
      alignRight: false
    },
    { id: '' }
    // { id: '' },
    // { id: '' }
  ];

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const Transition = forwardRef(
    (
      props: TransitionProps & {
        children?: React.ReactElement;
      },
      ref: React.Ref<unknown>
    ) => <Slide direction="up" ref={ref} {...props} />
  );

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = quietLibraryList.map((n) => n.workingAreaName);
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOptionClose = () => {
    setRowOptionclick(null);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };
  // popever list
  const ListWrapperStyle = styled('div')(({ theme }) => ({
    width: '100%',
    boxShadow: theme.customShadows.z8,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper
  }));

  const handleDetailModalOpen = () => {
    dispatch(onToggleDetailModal(true));
    setRowOptionclick(null);
  };

  // const handleRemoveAnnouncement = (anouncementId: string[]) => {
  //   dispatch(deleteAnnouncement(vehicleId));
  // };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - quietLibraryList.length)
      : 0;

  const filteredUsers = applySortFilter(
    quietLibraryList,
    getComparator(order, orderBy),
    filterName
  );
  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRowOptionclick(event.currentTarget);
    const id = Number(
      event.currentTarget.attributes.getNamedItem('itemid')?.value
    );
    dispatch(getQuietLibraryById(id));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const _filteredAnnouncement = applySortFilter(
    quietLibraryList,
    getComparator(order, orderBy),
    filterName
  );

  // const filteredAnnouncement = _filteredAnnouncement.filter(
  //   (x) => x.isDeleted === false
  // );

  // const isUserNotFound = filteredAnnouncement.length === 0;

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Çalışma Alanları | Sessiz Kütüphane">
      <Container>
        <h1>{title}</h1>
        <br />
        {/* <Grid container spacing={2} padding={2}>
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
          <TableListToolbar
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
                  rowCount={quietLibraryList.length}
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
                          key={workingAreaTypeId}
                          tabIndex={-1}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleClick(workingAreaName)}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              {/* <Box
                                component={Avatar}
                                alt={}
                                src={avatarUrl}
                                sx={{ mx: 2 }}
                              /> */}
                            </Box>
                          </TableCell>
                          <TableCell align="left">{location}</TableCell>
                          <TableCell align="left">{workingAreaName}</TableCell>
                          <TableCell>
                            <DeleteTableButton />
                          </TableCell>
                          <TableCell>
                            <ShowReservationButton />
                          </TableCell>
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
            count={quietLibraryList.length}
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
