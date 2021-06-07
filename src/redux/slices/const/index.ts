export const CONSTS = {
  // Account -------------------------------------------------------------------------
  Login: '/login',
  Register: '/Register',
  CreateRole: '/CreateRole',
  AccountLogout: '/api/Account/Logout',
  AccountSendMail: '/api/Account/SendMail',
  AccountResetPassword: '/api/Account/ResetPassword',
  // Announcement ---------------------------------------------------------------------------------------

  AnnouncementAddAnnouncement: '/api/Announcement/AddAnnouncement',
  AnnouncementDeleteAnnouncement:
    '/api/Announcement/DeleteAnnouncement/{announcementId}',
  AnnouncementGetAnnouncementList: '/api/Announcement/GetAnnouncementsList',
  AnnouncementEditAnnounement: '/api/Announcement/EditAnnounement',
  AnnouncementGetPresidentAnnouncementList:
    '/api/Announcement/GetPresidentAnnouncementList',
  AnnouncementGetAnnouncementById: '/api/Announcement/GetAnnouncementById/',
  // Appointment ---------------------------------------------------------------------------------------

  AppointmentCancelAppointment:
    '/api/Appointment/CancelAppointment/{appointmentId}/{cancellationReason}',

  AppointmentGetAppointmentInformation:
    '/api/Appointment/GetAppointmentInformation/{appointmentId}',

  AppointmentGetTableAppointmentList:
    '/api/Appointment/GetTableAppointmentList/{tableId}',

  AppointmentGetActiveAppointments: '/api/Appointment/GetActiveAppointments',

  AppointmentGetBarcodeNumberActiveAppointment:
    '/api/Appointment/GetBarcodeNumberActiveAppointment/{barcodeNumber}',

  AppointmentGetViolatedAppointment: '/api/Appointment/GetViolatedAppointment',

  AppointmentGetVisiorAppoinment:
    '/api/Appointment/GetVisiorAppointment/{identificationNumber}',
  AppointmentGetAppointmentByStartDateEndDate:
    '/api/Appointment/GetAppointmentByStartDateEndDate/{startDate}/{endDate}',
  AppointmentAddAppointment: '/api/Appointment/AddAppointment',
  AppointmentGetPastAppointments: '/api/Appointment/GetPastAppointments',
  AppointmentGetAppointmentRestrictionDateList:
    '/api/Appointment/GetAppointmentRestrictionDateList',
  AppointmentAddAppointmentRestrictionDate:
    '/api/Appointment/AddAppointmentRestrictionDate',
  AppointmentDeleteAppointmentRestrictionDate:
    '/api/Appointment/DeleteAppointmentRestrictionDate/{appointmentRestrictionDateId}',
  // RfidCard ---------------------------------------------------------------------------------------

  RfidCardActiveRfidCardList: '/api/RfidCard/ActiveRfidCardList',
  RfidCardQuestAndVisitorList: '/api/RfidCard/QuestAndVisitorList',
  RfidCardIdentificationNumberVisitor:
    '/api/RfidCard/IdentificationNumberVisitor/{identificationNumber}',
  RfidCardAddRfidCardUser: '/api/RfidCard/AddRfidCardUser/{cardNumber}',
  RfidCardDeleteRfidCard: '/api/RfidCard/DeleteRfidCard',
  // Statistics ---------------------------------------------------------------------------------------

  StatisticsGetTotalNumberOfAppointments:
    '/api/Statistics/GetTotalNumberOfAppointments',
  StatisticsGetTotalRfidQrCodeStatistics:
    '/api/Statistics/GetTotalRfidQrCodeStatistics',
  StatisticsGetTotalVisitorStatistics:
    '/api/Statistics/GetTotalVisitorStatistics',
  StatisticsGetDayNumberOfAppointments:
    '/api/Statistics/GetDayNumberOfAppointments',
  StatisticsGetDayVisitorStatistics: '/api/Statistics/GetDayVisitorStatistics',
  StatisticsGetMonthTotalNumberOfAppointments:
    '/api/Statistics/GetMonthTotalNumberOfAppointments/{month}',
  StatisticsGetMonthVisitorStatistics:
    '/api/Statistics/GetMonthVisitorStatistics/{month}',

  // SystemSettings --------------------------------------------------------------------------------------

  SystemSettingsLatestDateUpdate: '/api/SystemSettings/LatestDateUpdate/{day}',
  SystemSettingsGetLatestDate: '/api/SystemSettings/GetLatestDate',

  // Table ---------------------------------------------------------------------------------------------------

  TableGetTable: '/api/Table/GetTable/{barcodeNumber}',
  ChangeTableWorkingArea:
    '/api/Table/ChangeTableWorkingArea/{tableId}/{isInWarehouse}/{newWorkingAreaId}',
  TableGetAllTables: '/api/Table/GetAllTables',
  IsThereAppointmentTable: '/api/Table/IsThereAppointmentTable/{tableId}',
  TableDeleteIsInWarehouse: '/api/Table/DeleteIsInWarehouse/{tableId}',

  // Turnstile -----------------------------------------------------------------------------------------

  TurnstileTurnstileRegisters: '/api/Turnstile/GetTurnstileRegisters/2/2',

  // Util ----------------------------------------------------------------------------------------------

  UtilMisafirQRCode: '/api/Util/MisafirQRCode',

  // VacationDay ------------------------------------------------------------------------------------------

  VacationDayGetVacationDayList: '/api/VacationDay/GetVacationDayList',
  VacationDayAddVacationDay: '/api/VacationDay/AddVacationDay',

  // Visitor ------------------------------------------------------------------------------------------------

  VisitorVisitorTurnstileMovement:
    '/api/Visitor/VisitorTurnstileMovement/{identificationNumber}',

  // WorkingArea ------------------------------------------------------------------------------------------------

  WorkingAreaAddClassroom: '/api/WorkingArea/AddClassroom',
  WorkingAreaWorkingAreaStatus:
    '/api/WorkingArea/WorkingAreaStatus/{workingAreaId}/{isOpenMassAppointmentId}',
  WorkingAreaDeleteWorkingArea:
    '/api/WorkingArea/DeleteWorkingArea/{workingAreaId}',
  WorkingAreaWorkingAreaList: '/api/WorkingArea/WorkingAreaList',
  WorkingAreaWorkingAreaTables: '/api/WorkingArea/WorkingAreaTables',
  WorkingAreaAddWorkingAreaTable: '/api/WorkingArea/AddWorkingAreaTable',
  WorkingAreaDeleteTableFromWorkingArea:
    '/api/WorkingArea/DeleteTableFromWorkingArea/{workingAreaId}/{tableId}',
  WorkingAreaIsThereAppointmentWorkingArea:
    '/api/WorkingArea/IsThereAppointmentWorkingArea/{workingAreaId}',
  WorkingAreaGetWorkingAreaList: '/api/WorkingArea/GetWorkingAreaList'
};
