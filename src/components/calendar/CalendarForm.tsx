import * as Yup from 'yup';
import { merge } from 'lodash';
import { isBefore } from 'date-fns';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Box,
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  DialogContent,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton, MobileDateTimePicker } from '@material-ui/lab';
import { EventInput } from '@fullcalendar/common';
import {
  createEvent,
  updateEvent,
  deleteEvent
} from '../../redux/slices/calendar';
import ColorSinglePicker from '../ColorSinglePicker';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#94D82D', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E' // theme.palette.error.darker
];

const getInitialValues = (
  event: EventInput,
  range: { start: Date; end: Date } | null
) => {
  // eslint-disable-next-line no-underscore-dangle
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

type CalendarFormProps = {
  event: EventInput;
  range: {
    start: Date;
    end: Date;
  } | null;
  onCancel: VoidFunction;
};

export default function CalendarForm({
  event,
  range,
  onCancel
}: CalendarFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isCreating = !event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Başlık gereklidir.'),
    description: Yup.string().max(5000)
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          title: values.title,
          description: values.description,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end
        };
        if (event.id) {
          dispatch(updateEvent(event.id, newEvent));
          enqueueSnackbar('Update event success', { variant: 'success' });
        } else {
          dispatch(createEvent(newEvent));
          enqueueSnackbar('Create event success', { variant: 'success' });
        }
        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
          <TextField
            fullWidth
            label="Başlık"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Açıklama"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={
              <Switch checked={values.allDay} {...getFieldProps('allDay')} />
            }
            label="Tüm Gün"
            sx={{ mb: 3 }}
          />

          <MobileDateTimePicker
            label="Başlama tarihi"
            value={values.start}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('start', date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mb: 3 }} />
            )}
          />

          <MobileDateTimePicker
            label="Bitiş Tarihi"
            value={values.end}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('end', date)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={Boolean(isDateError)}
                helperText={
                  isDateError && 'End date must be later than start date'
                }
                sx={{ mb: 3 }}
              />
            )}
          />

          <ColorSinglePicker
            {...getFieldProps('textColor')}
            colors={COLOR_OPTIONS}
          />
        </DialogContent>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="Olayı Sil">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
          >
            İptal
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
            pendingIndicator="Loading..."
          >
            Ekle
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
