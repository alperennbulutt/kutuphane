import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  Popover,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import DraftsIcon from '@material-ui/icons/Details';
import { useTheme, styled } from '@material-ui/core/styles';

// redux
import { RootState } from '../../../redux/store';
// components
import Page from '../../Page';
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import { UserListHead, UserListToolbar } from '../../user/list';
import {
  GetAllStudiesRoom,
  onToggleDetailModal,
  getStudiesRoomById
} from '../../../redux/slices/studiesRoom';
import { StudiesRoomModel } from '../../../@types/studiesRoomModel';
import useLocales from '../../../hooks/useLocales';
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
  array: StudiesRoomModel[],
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

export default function StudiesRooms({ title }: GuestListPropsType) {
  const dispatch = useDispatch();
  const { studiesRoomList, studies } = useSelector(
    (state: RootState) => state.studies
  );
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
    dispatch(GetAllStudiesRoom());
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

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const newSelecteds = studiesRoomList.map((n) => n.workingAreaName);
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
      ? Math.max(0, (1 + page) * rowsPerPage - studiesRoomList.length)
      : 0;

  const filteredUsers = applySortFilter(
    studiesRoomList,
    getComparator(order, orderBy),
    filterName
  );
  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRowOptionclick(event.currentTarget);
    const id = Number(
      event.currentTarget.attributes.getNamedItem('itemid')?.value
    );
    dispatch(getStudiesRoomById(id));
  };

  const _filteredAnnouncement = applySortFilter(
    studiesRoomList,
    getComparator(order, orderBy),
    filterName
  );

  // const filteredAnnouncement = _filteredAnnouncement.filter(
  //   (x) => x.isDeleted === false
  // );

  // const isUserNotFound = filteredAnnouncement.length === 0;

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Çalışma Alanları | Çalışma Odaları">
      <Container>
        <h1 style={{ padding: 20 }}>{title}</h1>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            // onDelete={handleRemoveVehicle}
            // selected={selected}
            // translate={translate}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 300 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={studiesRoomList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
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
                      const isItemSelected = selected.indexOf(title) !== -1;

                      return (
                        <TableRow
                          hover
                          key={workingAreaId}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          // onClick={() => handleClick(title)}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={() => handleClick(title)}
                          >
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {title}
                          </TableCell>
                          <TableCell align="left">{workingAreaName}</TableCell>
                          {/* <TableCell align="left">
                            {publicationDate
                              .toString()
                              .slice(
                                0,
                                publicationDate.toString().indexOf('T')
                              )}
                          </TableCell>
                          <TableCell align="left">
                            {takedownDate
                              .toString()
                              .slice(0, takedownDate.toString().indexOf('T'))}
                          </TableCell> */}
                          <TableCell align="left">{location}</TableCell>
                          <TableCell align="left">
                            {workingAreaTypeName}
                          </TableCell>

                          {/* <TableCell align="left">
                                {isRegistered ? 'Yes' : 'No'}
                              </TableCell> */}

                          <TableCell align="right">
                            <IconButton
                              itemID={workingAreaId.toString()}
                              onClick={handleOptionClick}
                            >
                              <Icon
                                width={20}
                                height={20}
                                icon={moreVerticalFill}
                              />
                            </IconButton>
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <Box
                                component={Avatar}
                                alt={title}
                                sx={{ mx: 2 }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {title}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton>
                              <Icon
                                width={20}
                                height={20}
                                icon={moreVerticalFill}
                              />
                            </IconButton>
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
          {/* <Popover
            open={Boolean(rowOptionclick)}
            anchorEl={rowOptionclick}
            onClose={handleOptionClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Box sx={{ p: 0, maxWidth: 280 }}>
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button onClick={handleDetailModalOpen}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={translate('Düzenle')} />
                  </ListItem>
                </List>
              </ListWrapperStyle>
            </Box>
          </Popover> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={studiesRoomList.length}
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
