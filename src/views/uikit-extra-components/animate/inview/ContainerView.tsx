import { motion } from 'framer-motion';
// material
import { Box, Paper } from '@material-ui/core';
// components
import { MotionContainer } from '../../../../components/animate';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

const TEXT = 'Minimals';

const IMG = [
  '/static/mock-images/feeds/feed_2.jpg',
  '/static/mock-images/feeds/feed_3.jpg',
  '/static/mock-images/feeds/feed_4.jpg',
  '/static/mock-images/feeds/feed_5.jpg',
  '/static/mock-images/feeds/feed_8.jpg'
];

type ContainerViewProps = {
  isText: boolean;
  isMulti: boolean;
  selectVariant: string;
};

export default function ContainerView({
  isText,
  isMulti,
  selectVariant,
  ...other
}: ContainerViewProps) {
  const items = isMulti ? IMG : IMG.slice(0, 1);

  return (
    <Paper
      sx={{
        p: 3,
        minHeight: 480,
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.neutral'
      }}
      {...other}
    >
      {isText ? (
        <MotionContainer
          open
          initial="initial"
          component={motion.h1}
          sx={{ typography: 'h1', display: 'flex', overflow: 'hidden' }}
        >
          {TEXT.split('').map((letter, index) => (
            <motion.span key={index} variants={getVariant(selectVariant)}>
              {letter}
            </motion.span>
          ))}
        </MotionContainer>
      ) : (
        <MotionContainer open initial="initial">
          {items.map((row, index) => (
            <Box
              key={index}
              component={motion.img}
              src={row}
              variants={getVariant(selectVariant)}
              sx={{
                my: 2,
                width: 480,
                borderRadius: 1,
                objectFit: 'cover',
                height: isMulti ? 72 : 320,
                boxShadow: (theme) => theme.customShadows.z8
              }}
            />
          ))}
        </MotionContainer>
      )}
    </Paper>
  );
}
