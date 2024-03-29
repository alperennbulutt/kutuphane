// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const ICONS = {
  map: getIcon('ic_map'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  page: getIcon('ic_page'),
  user: getIcon('ic_user'),
  copy: getIcon('ic_copy'),
  error: getIcon('ic_error'),
  charts: getIcon('ic_charts'),
  editor: getIcon('ic_editor'),
  upload: getIcon('ic_upload'),
  animate: getIcon('ic_animate'),
  calendar: getIcon('ic_calendar'),
  elements: getIcon('ic_elements'),
  carousel: getIcon('ic_carousel'),
  language: getIcon('ic_language'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  components: getIcon('ic_components'),
  authenticator: getIcon('ic_authenticator')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Sayfalar',
    items: [
      {
        title: 'Anlık Turnike Hareketleri',
        href: PATH_DASHBOARD.general.turnstile,
        icon: ICONS.dashboard,
        items: [
          {
            title: 'Alt Kat Turnikeleri',
            href: PATH_DASHBOARD.general.turnstile
          },
          {
            title: 'Giriş Kat Turnike Hareketleri',
            href: PATH_DASHBOARD.general.turnstileFirst
          },
          {
            title: 'QR Kod Oluştur',
            href: PATH_DASHBOARD.general.qrCode
          }
        ]
      },
      {
        title: 'Ziyaretçi İstatistikleri',
        href: PATH_DASHBOARD.general.analytics,
        icon: ICONS.analytics
      },
      {
        title: 'Çalışma Alanları',
        href: PATH_DASHBOARD.workingArea.root,
        icon: ICONS.map,
        items: [
          {
            title: 'Derslikler',
            href: PATH_DASHBOARD.workingArea.classes
            // icon: ICONS.analytics
          },
          {
            title: 'Sessiz Kütüphane',
            href: PATH_DASHBOARD.workingArea.quietLibrary
            // icon: ICONS.analytics
          },
          {
            title: 'Çalışma Odaları',
            href: PATH_DASHBOARD.workingArea.workingRooms
            // icon: ICONS.analytics
          }
        ]
      },
      {
        title: 'Sessiz Kütüphane',
        href: PATH_DASHBOARD.general.silentLibrary,
        icon: ICONS.page
      },
      {
        title: 'Randevular',
        href: PATH_DASHBOARD.general.apointment,
        icon: ICONS.ecommerce
      },
      {
        title: 'Çalışma Takvimi',
        href: PATH_DASHBOARD.general.workingSchedule,
        icon: ICONS.calendar
      },
      {
        title: 'Masalar',
        href: PATH_DASHBOARD.general.table,
        icon: ICONS.animate
      },
      {
        title: 'Duyurular',
        href: PATH_DASHBOARD.announcement.root,
        icon: ICONS.editor,
        items: [
          {
            title: 'Başkanın Mesajı',
            href: PATH_DASHBOARD.announcement.presidentAnnouncement
            // icon: ICONS.analytics
          },
          {
            title: 'Duyurular',
            href: PATH_DASHBOARD.announcement.normalAnnouncement
            // icon: ICONS.analytics
          }
        ]
      }
    ]
  }
];

export default sidebarConfig;
