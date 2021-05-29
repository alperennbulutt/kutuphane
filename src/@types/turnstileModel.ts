export type TurnstileModel = {
  turnstileTypeId: number;
  turnstileLocationId: number;
  visitorInformation: VisitorInformationModel[];
};
export type VisitorInformationModel = {
  name: string;
  surname: string;
  identificationNumber: string;
  passingDate: string;
  passingTypeId: number;
  passingTypeName: string;
};
