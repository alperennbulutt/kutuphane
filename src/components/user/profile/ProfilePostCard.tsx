import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Link,
  Card,
  Typography,
  CardHeader,
  IconButton,
  CardContent,
  CardProps
} from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { UserPost } from '../../../@types/user';
import { User } from '../../../@types/account';
//
import ProfilePostCardInput from './ProfilePostCardInput';
import ProfilePostCardAction from './ProfilePostCardAction';
import ProfilePostCardComments from './ProfilePostCardComments';

// ----------------------------------------------------------------------

interface ProfilePostCardProps extends CardProps {
  post: UserPost;
  authUser: User;
}

export default function ProfilePostCard({
  post,
  authUser,
  sx
}: ProfilePostCardProps) {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLiked, setLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.personLikes.length);
  const [message, setMessage] = useState('');
  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        disableTypography
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {authUser.displayName}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'text.secondary'
            }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        }
      />

      <CardContent>
        <Typography variant="body1">{post.message}</Typography>
        <Box
          sx={{
            mt: 3,
            position: 'relative',
            pt: 'calc(100% / 16 * 9)'
          }}
        >
          <Box
            component="img"
            alt="post media"
            src={post.media}
            sx={{
              top: 0,
              width: '100%',
              height: '100%',
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        </Box>

        <ProfilePostCardAction
          post={post}
          likes={likes}
          isLiked={isLiked}
          onClickLike={handleLike}
          onClickUnlike={handleUnlike}
          onClickComment={handleClickComment}
        />

        {hasComments && <ProfilePostCardComments post={post} />}

        <ProfilePostCardInput
          message={message}
          onSetMessage={setMessage}
          fileInputRef={fileInputRef}
          commentInputRef={commentInputRef}
          onClickAttach={handleClickAttach}
          onChangeMessage={handleChangeMessage}
        />
      </CardContent>
    </Card>
  );
}
