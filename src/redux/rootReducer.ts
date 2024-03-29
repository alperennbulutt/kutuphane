import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import authJwtReducer from './slices/authJwt';
import settingsReducer from './slices/settings';
import calendarReducer from './slices/calendar';
import announcementReducer from './slices/announcement';
import quietReducer from './slices/quietLibrary';
import studiesReducer from './slices/studiesRoom';
import tableReducer from './slices/table';
import turnstileReducer from './slices/turnstile';
import analyticsReducer from './slices/analytics';
import presidentAnnouncementReducer from './slices/presidentAnnouncement';
import classesReducer from './slices/classes';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const authPersistConfig = {
  key: 'authJwt',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated']
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  table: tableReducer,
  announcement: announcementReducer,
  quiet: quietReducer,
  studies: studiesReducer,
  presidentAnnouncement: presidentAnnouncementReducer,
  classes: classesReducer,
  turnstile: turnstileReducer,
  analytics: analyticsReducer,
  settings: settingsReducer,
  calendar: calendarReducer,
  product: persistReducer(productPersistConfig, productReducer),
  authJwt: persistReducer(authPersistConfig, authJwtReducer)
});

export { rootPersistConfig, rootReducer };
