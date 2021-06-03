import { Paper, PaperProps, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
}

export default function SearchNotFound({
  searchQuery = '',
  ...other
}: SearchNotFoundProps) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Bulunamadı
      </Typography>
      <Typography variant="body2" align="center">
        Sonuç Bulunamadı &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Yazım hatalarını kontrol
        etmeyi veya tam kelimeleri kullanmayı deneyin.
      </Typography>
    </Paper>
  );
}
