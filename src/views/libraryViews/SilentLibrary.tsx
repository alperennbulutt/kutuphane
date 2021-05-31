import { Grid, Container, Button } from '@material-ui/core';
import SilentList from '../../components/libraryComponents/SilentLibrary/SilentLibrary';

export default function SilentLibrary() {
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <SilentList title="Sessiz Kütüphane" />
        </Grid>
      </Grid>
    </Container>
  );
}
