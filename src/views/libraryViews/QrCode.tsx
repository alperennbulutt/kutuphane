import { Grid, TextField, Button, Card, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { QRCode } from 'react-qr-svg';

import { PATH_DASHBOARD } from '../../routes/paths';

export default function QrCode() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth label="Ad" />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField fullWidth label="Soyad" />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField fullWidth label="Tc Kimlik Numarası" />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField fullWidth label="Telefon Numarası" />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          style={{ float: 'right' }}
          variant="contained"
          component={RouterLink}
          to={PATH_DASHBOARD.blog.qrCode}
          startIcon={<Icon icon={plusFill} />}
        >
          Oluştur
        </Button>
      </Grid>
      <Grid
        container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20
        }}
      >
        <Card>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 300, maxWidth: 500 }}
            value="https://www.youtube.com/watch?v=1yAdvoZTT8U"
          />
        </Card>
      </Grid>
    </Grid>
  );
}
