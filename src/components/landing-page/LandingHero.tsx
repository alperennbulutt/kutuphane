import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography } from '@material-ui/core';
// routes
import { PATH_DASHBOARD, PATH_HOME } from '../../routes/paths';
//
import {
  varFadeIn,
  varWrapEnter,
  varFadeInUp,
  varFadeInRight
} from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#F2F3F5',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroOverlayStyle = styled(motion.img)(({ theme }) => ({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '72vh'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle
          alt="overlay"
          src="/static/home/overlay.svg"
          variants={varFadeIn}
        />

        <HeroImgStyle
          alt="hero"
          src="/static/home/hero.png"
          variants={varFadeInUp}
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography
                style={{ padding: 20 }}
                variant="h1"
                sx={{ color: 'common.white' }}
              >
                Talas Kütüphanesi <br />
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Uygulama Ekranı
              </Button>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
