import { Grid, Container } from '@material-ui/core';

import TabPanelGround from '../../../components/libraryComponents/Turnstile/TabPanelGround';

export default function Turnstile() {
  return (
    <Container>
      <Grid style={{ alignContent: 'center', alignItems: 'center' }}>
        <TabPanelGround />
      </Grid>
    </Container>
  );
}
