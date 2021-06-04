import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import CloseIcon from '@material-ui/icons/Close';

import { Form, FormikProvider, useFormik } from 'formik';

import {
  List,
  Slide,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  Box,
  Grid,
  Menu,
  MenuItem,
  Card,
  Switch,
  TextField,
  CardContent,
  FormControlLabel,
  CardHeader,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer
} from '@material-ui/core';

import { TransitionProps } from '@material-ui/core/transitions';
//
// import { MButton } from '../../../components/@material-extend';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@material-ui/lab';
import countries from '../../user/account/countries';
import useLocales from '../../../hooks/useLocales';
import { AddAnnouncementModel } from '../../../@types/announcementModel';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import {
  addAnnouncement,
  getAllAnnouncement
} from '../../../redux/slices/announcement';
import Scrollbar from '../../Scrollbar';
import { MButton } from '../../@material-extend';
// import VehicleAddDocumentModalForm from './VehicleAddDocumentModalForm';
// import AnnouncementAddForm from './AnnouncementAddForm';

// ----------------------------------------------------------------------

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children?: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

interface InitialState
  extends Omit<AddAnnouncementModel, 'password' | 'id' | 'role'> {
  afterSubmit?: string;
}

export default function FullScreenDialogs() {
  const dispatch = useDispatch();
  const { allLang, currentLang, translate, onChangeLang } = useLocales();
  const [open, setOpen] = useState(false);
  const [isOpen, setOpen2] = useState<null | HTMLElement>(null);
  const { user, updateProfile } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getAllAnnouncement());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen2(event.currentTarget);
  };
  const handleClose2 = () => {
    setOpen2(null);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const NewAnnouncementSchema = Yup.object().shape({
  //   vehicleTypeCode: Yup.string().required(
  //     translate('vehicle.create.newvehicle.vehicle_type_code_is_required')
  //   ),
  //   vehiclePlate: Yup.string().required(
  //     translate('vehicle.create.newvehicle.vehicle_plate_is_required')
  //   ),
  //   passengerCapacity: Yup.string().required(
  //     translate('vehicle.create.newvehicle.passenger_capacity_is_required')
  //   ),
  //   vehicleStatusCode: Yup.string().required(
  //     translate('vehicle.create.newvehicle.vehicle_status_code_is_required')
  //   )
  // });

  const test = () => {
    alert(23);
  };

  const formik = useFormik<InitialState>({
    // validationSchema: NewAnnouncementSchema,
    initialValues: {
      title: '',
      description: '',
      publicationDate: new Date(),
      announcementTypeId: 0,
      takedownDate: new Date()
    },
    onSubmit: async (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        {
          /* if docPath is empty, then alert to choose file.
        const docPath = localStorage.getItem('documentPath');
        if (!docPath) {
          enqueueSnackbar(translate('document sec'), {
            variant: 'error'
          });
        } */
        }
        await dispatch(addAnnouncement(values));
        handleClose();
        enqueueSnackbar(translate('Eklendi'), {
          variant: 'success'
        });
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;
  // ----------------------------------------------------------------------
  function createData(
    documentTypeCode: string,
    documentType: string,
    periodOfValidity: number,
    lastRenewalDate: string
  ) {
    return {
      documentTypeCode,
      documentType,
      periodOfValidity,
      lastRenewalDate
    };
  }

  // const BASIC_TABLE = [
  //   createData('1', 'Frozen yoghurt', 159, '12.05.2021'),
  //   createData('2', 'Ice cream sandwich', 237, '13.05.2021'),
  //   createData('3', 'Eclair', 262, '15.05.2021'),
  //   createData('4', 'Cupcake', 305, '12.06.2021'),
  //   createData('5', 'Gingerbread', 356, '13.06.2021')
  // ];
  // ----------------------------------------------------------------------
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Icon icon={plusFill} />}
      >
        {translate('Duyuru Ekle')}
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              {translate('Duyuru Detayları')}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              {translate('global.save')}
            </Button> */}
          </Toolbar>
        </AppBar>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Başlık"
                          {...getFieldProps('title')}
                          error={Boolean(touched.title && errors.title)}
                          helperText={touched.title && errors.title}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Açıklama"
                          {...getFieldProps('description')}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          helperText={touched.description && errors.description}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="datetime-local"
                          fullWidth
                          // label="Yayınlanma Tarihi"
                          {...getFieldProps('publicationDate')}
                          error={Boolean(
                            touched.publicationDate && errors.publicationDate
                          )}
                          helperText={
                            touched.publicationDate && errors.publicationDate
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Anons Tipi"
                          {...getFieldProps('announcementTypeId')}
                          error={Boolean(
                            touched.announcementTypeId &&
                              errors.announcementTypeId
                          )}
                          helperText={
                            touched.announcementTypeId &&
                            errors.announcementTypeId
                          }
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          type="datetime-local"
                          fullWidth
                          // label="Bitiş Tarihi"
                          {...getFieldProps('takedownDate')}
                          error={Boolean(
                            touched.takedownDate && errors.takedownDate
                          )}
                          helperText={
                            touched.takedownDate && errors.takedownDate
                          }
                        />
                      </Grid>

                      {/* <Grid item xs={12} sm={4}>
                        <TextField
                          select
                          fullWidth
                          label="Country"
                          placeholder="Country"
                          {...getFieldProps('country')}
                          SelectProps={{ native: true }}
                          error={Boolean(touched.firmName && errors.firmName)}
                          helperText={touched.firmName && errors.firmName}
                        >
                          <option value="" />
                          {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid> */}

                      {/* <Grid item xs={12} md={6}>
                        <TextField
                          {...getFieldProps('addres_detail')}
                          fullWidth
                          multiline
                          minRows={4}
                          maxRows={4}
                          label="Address"
                        />
                      </Grid> */}
                    </Grid>
                    {/* burası belgeleri listeleceğimiz tablo
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Card>
                          <Grid display="flex">
                            <Grid sm={6}>
                              <CardHeader title="Belgeler" color="red" />
                            </Grid>
                            <Grid sm={6}>
                              <Box
                                sx={{
                                  mt: 3,
                                  display: 'flex',
                                  justifyContent: 'flex-end'
                                }}
                              >
                                <VehicleAddDocumentModalForm />
                                {/* burası documana tıkla drop açılsın ordan seç idi.
                                <Button
                                  variant="contained"
                                  onClick={handleOpen2}
                                  color="success"
                                  startIcon={<Icon icon={plusFill} />}
                                >
                                  {translate(
                                    'vehicle.create.newvehicle.adddocument'
                                  )}
                                </Button>
                                <Menu
                                  keepMounted
                                  id="simple-menu"
                                  anchorEl={isOpen}
                                  onClose={handleClose2}
                                  open={Boolean(isOpen)}
                                >
                                  <MenuItem onClick={handleClose2}>
                                    <VehicleAddDocumentModalForm />
                                  </MenuItem>
                                  <MenuItem onClick={handleClose2}>
                                    <VehicleAddInsuranceDocumentModalForm />
                                  </MenuItem>
                                </Menu>
                                *}
                              </Box>
                            </Grid>
                          </Grid>
                          <Scrollbar>
                            <TableContainer sx={{ minWidth: 800, mt: 3 }}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>{translate(
                                        'vehicle.add.document.documenttype'
                                      )}</TableCell>
                                    <TableCell>
                                      {translate(
                                        'vehicle.add.document.validityperiod'
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {translate(
                                        'vehicle.add.document.lastrenewaldate'
                                      )}
                                    </TableCell>
                                    <TableCell>&nbsp;</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {BASIC_TABLE.map((row) => (
                                    <TableRow key={row.documentTypeCode}>
                                      <TableCell component="th" scope="row">
                                        {row.documentType}
                                      </TableCell>
                                      <TableCell>
                                        {row.periodOfValidity}
                                      </TableCell>
                                      <TableCell>
                                        {row.lastRenewalDate}
                                      </TableCell>
                                      <TableCell align="right">&gt;</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Scrollbar>
                        </Card>
                      </Grid>
                    </Grid> */}

                    <Grid display="flex">
                      <Grid sm={12}>
                        <Box
                          sx={{
                            mt: 3,
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          {/* <AnnouncementAddForm /> */}
                        </Box>
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        pending={isSubmitting}
                      >
                        {translate('Kaydet')}
                      </LoadingButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Dialog>
    </>
  );
}
