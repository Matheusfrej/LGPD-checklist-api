export type CreateItemUseCaseRequest = {
  id: number;
  code: string;
  itemDesc: string;
  recommendations: string;
  isMandatory: boolean;
  lawsIds: number[];
  devicesIds: number[];
};
