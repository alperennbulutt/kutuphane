// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../../components/Page';
import {
  AnalyticsTasks,
  AnalyticsNewUsers,
  AnalyticsBugReports,
  AnalyticsItemOrders,
  AnalyticsNewsUpdate,
  AnalyticsWeeklySales,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates
} from '../../components/general/analytics';

// ----------------------------------------------------------------------

export default function Analytics() {
  return (
    <Page title="Dashboard: Analytics | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ziyaretçi İstatistikleri</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWeeklySales />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsNewUsers />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsItemOrders />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsBugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}