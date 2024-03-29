// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Switch, InputBase, Typography } from '@material-ui/core';
//
import { MapSettingKeys, MapSettings } from '../../../@types/maps';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 99,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.72)
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

const EVENTS = [
  { label: 'Dragging', value: 'isDragging' },
  { label: 'Transition', value: 'inTransition' },
  { label: 'Panning', value: 'isPanning' },
  { label: 'Rotating', value: 'isRotating' },
  { label: 'Zooming', value: 'isZooming' }
];

const camelPattern = /(^|[A-Z])[a-z]*/g;

function formatSettingName(name: string) {
  return name.match(camelPattern)?.join(' ');
}

type ControlPanelProps = {
  settings: MapSettings;
  interactionState: any;
  onChange: (name: MapSettingKeys, value: boolean | number) => void;
};

export default function ControlPanel({
  settings,
  interactionState,
  onChange
}: ControlPanelProps) {
  const renderSetting = (name: MapSettingKeys, value: boolean | number) => {
    switch (typeof value) {
      case 'boolean':
        return (
          <RowStyle key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <Switch
              size="small"
              checked={value}
              onChange={(event) => onChange(name, event.target.checked)}
            />
          </RowStyle>
        );
      case 'number':
        return (
          <RowStyle key={name}>
            <Typography variant="body2">{formatSettingName(name)}</Typography>
            <InputBase
              value={value}
              onChange={(event) => onChange(name, Number(event.target.value))}
              inputProps={{ type: 'number' }}
              sx={{
                '& input': {
                  py: 0.25,
                  width: 40,
                  fontSize: 14,
                  borderRadius: 0.5,
                  textAlign: 'center',
                  bgcolor: 'grey.50012',
                  color: 'common.white'
                }
              }}
            />
          </RowStyle>
        );
      default:
        return null;
    }
  };

  return (
    <RootStyle>
      {Object.keys(settings).map((name) =>
        renderSetting(name as MapSettingKeys, settings[name as MapSettingKeys])
      )}

      {EVENTS.map((event) => (
        <RowStyle key={event.label}>
          <Typography variant="body2">{event.label}</Typography>
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: 1,
              bgcolor: interactionState[event.value]
                ? 'primary.main'
                : 'error.main'
            }}
          />
        </RowStyle>
      ))}
    </RootStyle>
  );
}
