import { Icon } from '@iconify/react';
import roundReply from '@iconify/icons-ic/round-reply';
import { useHistory, useParams } from 'react-router-dom';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Hidden,
  Tooltip,
  Typography,
  IconButton
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import createAvatar from '../../utils/createAvatar';
import { fDateTimeSuffix } from '../../utils/formatTime';
// @types
import { Mail } from '../../@types/mail';
//
import { MAvatar } from '../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 84,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between'
}));

// ----------------------------------------------------------------------

type MailDetailsToolbarProps = {
  mail: Mail;
};

export default function MailDetailsToolbar({
  mail,
  ...other
}: MailDetailsToolbarProps) {
  const history = useHistory();
  const { systemLabel, customLabel } = useParams<{
    systemLabel?: string;
    customLabel: string;
  }>();
  const baseUrl = PATH_DASHBOARD.mail.root;

  const handleBack = () => {
    if (systemLabel) {
      return history.push(`${baseUrl}/${systemLabel}`);
    }
    if (customLabel) {
      return history.push(`${baseUrl}/label/${customLabel}`);
    }
    return history.push(`${baseUrl}/inbox`);
  };

  return (
    <RootStyle {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Back">
          <IconButton onClick={handleBack}>
            <Icon icon={arrowIosBackFill} width={20} height={20} />
          </IconButton>
        </Tooltip>
        <MAvatar
          alt={mail.from.name}
          src={mail.from.avatar || ''}
          color={createAvatar(mail.from.name).color}
        >
          {createAvatar(mail.from.name).name}
        </MAvatar>

        <Box sx={{ ml: 2 }}>
          <Typography display="inline" variant="subtitle2">
            {mail.from.name}
          </Typography>
          <Link variant="caption" sx={{ color: 'text.secondary' }}>
            &nbsp; {`<${mail.from.email}>`}
          </Link>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            To:&nbsp;
            {mail.to.map((person) => (
              <Link color="inherit" key={person.email}>
                {person.email}
              </Link>
            ))}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Hidden smDown>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {fDateTimeSuffix(mail.createdAt)}
          </Typography>
          <Tooltip title="Reply">
            <IconButton>
              <Icon icon={roundReply} width={20} height={20} />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Tooltip title="More options">
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </Box>
    </RootStyle>
  );
}
