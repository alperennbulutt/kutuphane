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
  getAllTurnstile22,
  onToggleDetailModal
} from '../../../redux/slices/turnstile';
import { VisitorInformationModel } from '../../../@types/turnstileModel';
import useLocales from '../../../hooks/useLocales';

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
  array: VisitorInformationModel[],
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
        _user.identificationNumber
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// Propsları Bu şekilde veriyoruz
type GuestListPropsType = {
  title: string;
};

export default function TurnstileList22({ title }: GuestListPropsType) {
  const dispatch = useDispatch();
  const { turnstileList, turnstile } = useSelector(
    (state: RootState) => state.turnstile
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
    dispatch(getAllTurnstile22());
  }, [dispatch]);

  const TABLE_HEAD = [
    {
      id: 'name',
      label: translate('Ad/Soyad'),
      alignRight: false
    },
    {
      id: 'identificationNumber',
      label: translate('Tc Kimlik'),
      alignRight: false
    },
    {
      id: 'passingDate',
      label: translate('Geçiş Saati'),
      alignRight: false
    },

    { id: '' },
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
      const newSelecteds = turnstileList.map((n) => n.identificationNumber);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - turnstileList.length) : 0;

  const filteredUsers = applySortFilter(
    turnstileList,
    getComparator(order, orderBy),
    filterName
  );
  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRowOptionclick(event.currentTarget);
    const id = Number(
      event.currentTarget.attributes.getNamedItem('itemid')?.value
    );
    // dispatch(getAnnouncementById(id));
  };

  const _filteredAnnouncement = applySortFilter(
    turnstileList,
    getComparator(order, orderBy),
    filterName
  );

  // const filteredAnnouncement = _filteredAnnouncement.filter(
  //   (x) => x.isDeleted === false
  // );

  // const isUserNotFound = filteredAnnouncement.length === 0;

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User: List | Minimal-UI">
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
                  rowCount={turnstileList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        identificationNumber,
                        name,
                        passingDate,
                        passingTypeId,
                        passingTypeName,
                        surname
                      } = row;
                      const isItemSelected = selected.indexOf(title) !== -1;

                      return (
                        <TableRow
                          hover
                          key={identificationNumber}
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
                            {name}
                          </TableCell>
                          <TableCell align="left">
                            {identificationNumber}
                          </TableCell>
                          <TableCell align="left">
                            {passingDate
                              .toString()
                              .slice(0, passingDate.toString().indexOf('T'))}
                          </TableCell>
                          {/* <TableCell align="left">
                            {takedownDate
                              .toString()
                              .slice(0, takedownDate.toString().indexOf('T'))}
                          </TableCell> */}
                          {/* <TableCell align="left">{title}</TableCell>
                          <TableCell align="left">{title}</TableCell> */}

                          {/* <TableCell align="left">
                                {isRegistered ? 'Yes' : 'No'}
                              </TableCell> */}

                          <TableCell align="right">
                            <IconButton
                              itemID={identificationNumber.toString()}
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
            count={turnstileList.length}
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
