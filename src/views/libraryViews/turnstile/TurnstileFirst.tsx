import { Grid, Container } from '@material-ui/core';

import TabPanelFirst from '../../../components/libraryComponents/Turnstile/FirstFloorPanel';

export default function Turnstile() {
  return (
    <Container>
      <Grid style={{ alignContent: 'center', alignItems: 'center' }}>
        <TabPanelFirst />
      </Grid>
    </Container>
  );
}
