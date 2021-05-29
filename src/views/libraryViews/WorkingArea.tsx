import { Grid, Container, Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';

import Classes from '../../components/libraryComponents/WorkingAreaComponents/Classes';
import QuietLibrary from '../../components/libraryComponents/WorkingAreaComponents/QuietLibrary';
import WorkingRooms from '../../components/libraryComponents/WorkingAreaComponents/WorkingRooms';
import { MSwitch } from '../../components/@material-extend';

export default function WorkingArea() {
  return (
    <Container>
      <Grid>
        Toplu Rezervasyona Aç
        <MSwitch />
      </Grid>
      <Button
        style={{ float: 'right' }}
        variant="contained"
        component={RouterLink}
        to={PATH_DASHBOARD.blog.qrCode}
        startIcon={<Icon icon={plusFill} />}
      >
        Derslik Ekle
      </Button>

      <Grid>
        <Classes title="Derslikler" />
        <br />
        <QuietLibrary title="Sessiz Kütüphane" />
        <br />

        <WorkingRooms title="Çalışma Odaları" />
      </Grid>
    </Container>
  );
}
