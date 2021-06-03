export type AnnouncementModel = {
  id: number;
  title: string;
  description: string;
  publicationDate: string;
  announcementTypeId: number;
  announcementTypeName: string;
  takedownDate: string;
};

export type AddAnnouncementModel = {
  title: string;
  description: string;
  publicationDate: Date;
  announcementTypeId: number;
  takedownDate: Date;
};

export type EditAnnounementModel = {
  id: number;
  title: string;
  description: string;
  publicationDate: string;
  announcementTypeId: number;
  takedownDate: string;
};
