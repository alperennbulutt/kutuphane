import { Icon } from '@iconify/react';
import arrowCircleDownFill from '@iconify/icons-eva/arrow-circle-down-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, IconButton } from '@material-ui/core';
// utils
import {
  getFileType,
  getFileName,
  getFileThumb
} from '../../utils/getFileFormat';
// @types
import { Mail } from '../../@types/mail';
//
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `solid 1px ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.neutral
}));

const ThumbStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  color: theme.palette.text.disabled,
  '& img': { width: '100%', height: '100%' }
}));

const DownloadStyle = styled('div')(({ theme }) => ({
  opacity: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 1 },
  '& svg': {
    transition: theme.transitions.create('color'),
    color: alpha(theme.palette.common.white, 0.64),
    '&:hover': { color: theme.palette.common.white }
  }
}));

// ----------------------------------------------------------------------

function FileItem({ fileUrl }: { fileUrl: string }) {
  return (
    <Box key={fileUrl} sx={{ mx: 0.75 }}>
      <ThumbStyle>
        {getFileThumb(fileUrl)}
        <DownloadStyle>
          <IconButton>
            <Icon icon={arrowCircleDownFill} />
          </IconButton>
        </DownloadStyle>
      </ThumbStyle>
      <Box
        sx={{
          mt: 0.5,
          maxWidth: 56,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography noWrap variant="caption">
          {getFileName(fileUrl)}
        </Typography>
        <Typography variant="caption">.{getFileType(fileUrl)}</Typography>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type MailDetailsAttachmentsProps = {
  mail: Mail;
};

export default function MailDetailsAttachments({
  mail
}: MailDetailsAttachmentsProps) {
  return (
    <RootStyle>
      <Scrollbar>
        <Box sx={{ display: 'flex' }}>
          {mail.files.map((file) => (
            <FileItem key={file} fileUrl={file} />
          ))}
        </Box>
      </Scrollbar>
    </RootStyle>
  );
}
