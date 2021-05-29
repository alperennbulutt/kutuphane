import { Grid, Container, Button } from '@material-ui/core';

import TableList from '../../components/libraryComponents/Tables/TableList';

export default function Table() {
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TableList title="Masalar" />
        </Grid>
      </Grid>
    </Container>
  );
}
