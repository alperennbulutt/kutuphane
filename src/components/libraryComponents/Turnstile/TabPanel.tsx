import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';

import SilentLibrary from '../../../views/libraryViews/SilentLibrary';
import QrCode from '../../../views/libraryViews/QrCode';
import TurnstileList11 from './TurnstileList11';
import TurnstileList12 from './TurnstileList12';
import TurnstileList21 from './TurnstileList21';
import TurnstileList22 from './TurnstileList22';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
    // width: 500
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Alt Kat Turnike Hareketleri" {...a11yProps(0)} />
          <Tab label="Giriş Kat Turnike Hareketleri" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={5}>
            <Grid item md={6}>
              <TurnstileList11 title="Giriş Turnikesi" />
            </Grid>
            <Grid item md={6}>
              <TurnstileList12 title="Çıkış Turnikesi" />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={5}>
            <Grid item md={6}>
              <TurnstileList21 title="Giriş Turnikesi" />
            </Grid>
            <Grid item md={6}>
              <TurnstileList22 title="Çıkış Turnikesi" />
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
