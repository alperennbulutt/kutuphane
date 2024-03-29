import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import copyFill from '@iconify/icons-eva/copy-fill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import {
  useTheme,
  hexToRgb,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Card,
  Tooltip,
  Container,
  Typography,
  IconButton
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'info', 'success', 'warning', 'error'] as const;
const COLORS_VARIATIONS = [
  'lighter',
  'light',
  'main',
  'dark',
  'darker'
] as const;
const GREY_VARIATIONS = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
] as const;

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: theme.spacing(1.5, -1.5, 0)
}));

// ----------------------------------------------------------------------

type ColorCardProps = {
  hexColor: string;
  variation: string;
  onCopy: VoidFunction;
};

function ColorCard({ hexColor, variation, onCopy }: ColorCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        m: 1.5,
        width: {
          xs: '100%',
          sm: 'calc((100%/2) - 24px)',
          md: 'calc((100%/4) - 24px)',
          lg: 'calc((100%/5) - 24px)'
        }
      }}
    >
      <CopyToClipboard text={hexColor} onCopy={onCopy}>
        <Tooltip title="Copy">
          <IconButton
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              color: theme.palette.getContrastText(hexColor)
            }}
          >
            <Icon icon={copyFill} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>

      <Box sx={{ bgcolor: hexColor, paddingTop: '56%' }} />

      <Box sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          {variation}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, mb: 1 }}>
          <Typography
            variant="overline"
            sx={{ width: 56, color: 'text.secondary' }}
          >
            Hex
          </Typography>
          <Typography variant="body2">{hexColor}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="overline"
            sx={{ width: 56, color: 'text.secondary' }}
          >
            Rgb
          </Typography>
          <Typography variant="body2">
            {hexToRgb(hexColor).replace('rgb(', '').replace(')', '')}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default function FoundationColors() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [, setState] = useState('');

  const onCopy = (color: string) => {
    setState(color);
    if (color) {
      enqueueSnackbar(`Copied ${color}`, { variant: 'success' });
    }
  };

  return (
    <Page title="Foundations: Colors | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Colors"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Foundations', href: PATH_DASHBOARD.foundations.root },
            { name: 'Colors' }
          ]}
          moreLink={[
            'https://next.material-ui.com/customization/color',
            'https://colors.eva.design'
          ]}
        />

        {COLORS.map((color) => (
          <Box key={color} sx={{ mb: 5 }}>
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              {color}
            </Typography>

            <RowStyle>
              {COLORS_VARIATIONS.map((variation) => (
                <ColorCard
                  key={variation}
                  variation={variation}
                  hexColor={theme.palette[color][variation]}
                  onCopy={() => onCopy(theme.palette[color][variation])}
                />
              ))}
            </RowStyle>
          </Box>
        ))}

        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
          Grey
        </Typography>
        <RowStyle>
          {GREY_VARIATIONS.map((variation) => (
            <ColorCard
              key={variation}
              variation={variation}
              hexColor={theme.palette.grey[variation]}
              onCopy={() => onCopy(theme.palette.grey[variation])}
            />
          ))}
        </RowStyle>
      </Container>
    </Page>
  );
}
