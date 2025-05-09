export type CreateItemUseCaseRequest = {
  code: string;
  itemDesc: string;
  recommendations: string;
  isMandatory: boolean;
  lawsIds: number[];
  devicesIds: number[];
};
