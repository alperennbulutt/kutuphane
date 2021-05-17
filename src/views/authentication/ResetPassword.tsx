import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { PATH_AUTH } from '../../routes/paths';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { ResetPasswordForm } from '../../components/authentication/reset-password';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reset Password | Minimal UI">
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" gutterBottom>
                Parolanızı mı unuttunuz?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Lütfen hesabınızla ilişkili e-posta adresini girin ve şifrenizi
                sıfırlamak için size bir e-posta göndereceğiz.
              </Typography>

              <ResetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
              />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 1 }}
              >
                Geri
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                alt="sent email"
                src="/static/icons/ic_email_sent.svg"
                sx={{ mb: 5, mx: 'auto' }}
              />
              <Typography variant="h3" gutterBottom>
                İstek başarıyla gönderildi
              </Typography>
              <Typography>
                <strong>{email}</strong>
                <br />
                Mail adresine bir onay e-postası gönderdik Lütfen emailinizi
                kontrol ediniz.
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 5 }}
              >
                Geri
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
