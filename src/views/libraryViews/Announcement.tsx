import { Grid, Container, Button } from '@material-ui/core';

import LeadAnnouncement from '../../components/libraryComponents/Announcement/PresidentAnnouncement';
import Announcement from '../../components/libraryComponents/Announcement/Announcement';
import HeaderDashboard from '../../components/HeaderDashboard';
import FullScreenDialogs from '../../components/libraryComponents/Announcement/FullScreenDialogs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

export default function Announcemnet() {
  return (
    <Container>
      <LeadAnnouncement title="Başkanın Mesajı" />
      <Announcement title="Duyuru" />
    </Container>
  );
}
