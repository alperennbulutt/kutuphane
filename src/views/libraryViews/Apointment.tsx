import { Button, Container, Grid, TextField } from '@material-ui/core';
import AppointmentList from '../../components/libraryComponents/Apointment/ApointmentList';

export default function Apointment() {
  return (
    <Container>
      <Grid container spacing={5} padding={2}>
        <Grid item md={4}>
          Ziyaretçi Tc no
        </Grid>
        <Grid item md={4}>
          <TextField>asdasdsad</TextField>
        </Grid>
        <Grid item md={4}>
          <Button>tc no ya göre ara</Button>
        </Grid>
      </Grid>
      <Grid container spacing={5} padding={2}>
        <Grid item md={4}>
          Tarih
        </Grid>
        <Grid item md={4}>
          <TextField type="datetime-local">asdasdsad</TextField>
        </Grid>
        <Grid item md={4}>
          <TextField type="datetime-local">asdasdsad</TextField>
        </Grid>
      </Grid>
      <Grid container spacing={5} padding={2}>
        <Grid item md={4}>
          Masa Barkod
        </Grid>
        <Grid item md={4}>
          <TextField>asdasdsad</TextField>
        </Grid>
        <Grid item md={4}>
          <Button>Barkod'a Göre ara</Button>
        </Grid>
      </Grid>
      <Grid>
        <AppointmentList title="Masa Bilgileri" />
      </Grid>
    </Container>
  );
}
