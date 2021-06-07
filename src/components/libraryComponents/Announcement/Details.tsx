import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import CloseIcon from '@material-ui/icons/Close';
import DraftsIcon from '@material-ui/icons/Details';

import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack';

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
  TableContainer,
  ListItemIcon,
  Popover
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
//
import * as Yup from 'yup';
import useLocales from '../../../hooks/useLocales';
import { EditAnnounementModel } from '../../../@types/announcementModel';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import {
  onToggleDetailModal,
  addAnnouncement,
  deleteAnnouncement,
  filterAnnouncement,
  getAllAnnouncement,
  updateAnnouncement
} from '../../../redux/slices/announcement';
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------
// redux
import { RootState } from '../../../redux/store';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children?: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

interface InitialState extends Omit<EditAnnounementModel, 'password' | 'role'> {
  afterSubmit?: string;
}

type FullScreenDialogsprops = {
  announcementEdit: EditAnnounementModel | null;
};

export default function FullScreenDialogs() {
  const dispatch = useDispatch();
  const { detailModalIsOpen, announcement } = useSelector(
    (state: RootState) => state.announcement
  );

  // Dropdown option
  const optionList = [1, 2];

  const { allLang, currentLang, translate, onChangeLang } = useLocales();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    dispatch(onToggleDetailModal(false));
  };

  // const handleBrand = (brandId: number) => {
  //   setCurrentBrand(brandId);
  // };

  // Burada Tip dönüşümü Yaptım
  const formik = useFormik<InitialState>({
    // validationSchema: NewAnnouncementSchema,
    // enableReinitialize: true,

    initialValues: {
      id: 0,
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
        await dispatch(updateAnnouncement(values));
        handleClose();
        enqueueSnackbar(translate('Düzenlendi'), {
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
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  // ----------------------------------------------------------------------
  return (
    <>
      <Dialog
        fullScreen
        open={detailModalIsOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              {`${announcement.title} `}
            </Typography>
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
                          label={translate('Başlık')}
                          {...getFieldProps('title')}
                          error={Boolean(touched.title && errors.title)}
                          helperText={touched.title && errors.title}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={translate('Açıklama')}
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
                          label={translate('Yayın Tarihi')}
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
                          type="datetime-local"
                          fullWidth
                          label={translate('Yayın Bitiş Tarihi')}
                          {...getFieldProps('takedownDate')}
                          error={Boolean(
                            touched.takedownDate && errors.takedownDate
                          )}
                          helperText={
                            touched.takedownDate && errors.takedownDate
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label={translate('Duyuru Tipi')}
                        {...getFieldProps('announcementTypeId')}
                        SelectProps={{ native: true }}
                        error={Boolean(
                          touched.announcementTypeId &&
                            errors.announcementTypeId
                        )}
                        helperText={
                          touched.announcementTypeId &&
                          errors.announcementTypeId
                        }
                      >
                        <option key={0} label="" />
                        {optionList.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={translate('ID')}
                        {...getFieldProps('id')}
                        error={Boolean(touched.id && errors.id)}
                        helperText={touched.id && errors.id}
                      />
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
