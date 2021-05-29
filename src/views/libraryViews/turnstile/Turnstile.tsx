import { Grid, Container, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

import { PATH_DASHBOARD } from '../../../routes/paths';

import TurnstileList from '../../TurnstileList';

export default function Turnstile() {
  return (
    <Container>
      <Grid>
        <Button
          style={{ float: 'right' }}
          variant="contained"
          component={RouterLink}
          to={PATH_DASHBOARD.blog.qrCode}
          startIcon={<Icon icon={plusFill} />}
        >
          QR KODU
        </Button>
      </Grid>

      <Grid container spacing={5}>
        <Grid item md={6}>
          <TurnstileList title="Giriş Turnikesi" />
        </Grid>
        <Grid item md={6}>
          <TurnstileList title="Çıkış Turnikesi" />
        </Grid>
      </Grid>
    </Container>
  );
}
