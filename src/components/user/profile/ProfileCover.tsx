// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
// material
// @types
import { Profile } from '../../../@types/user';
import { User } from '../../../@types/account';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

type ProfileCoverProps = {
  myProfile: Profile;
  authUser: User;
};

export default function ProfileCover({
  myProfile,
  authUser
}: ProfileCoverProps) {
  const { position, cover } = myProfile;
  const { displayName } = authUser;

  return (
    <RootStyle>
      <InfoStyle>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{displayName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{position}</Typography>
        </Box>
      </InfoStyle>
      <CoverImgStyle alt="profile cover" src={cover} />
    </RootStyle>
  );
}
