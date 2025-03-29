class CreateItemUseCaseRequest {
  public id: number;
  public code: string;
  public itemDesc: string;
  public recommendations: string;
  public isMandatory: boolean;
  public lawsIds: number[];
  public devicesIds: number[];

  constructor(
    id: number,
    code: string,
    itemDesc: string,
    recommendations: string,
    isMandatory: boolean,
    lawsIds: number[],
    devicesIds: number[],
  ) {
    this.id = id;
    this.code = code;
    this.itemDesc = itemDesc;
    this.recommendations = recommendations;
    this.isMandatory = isMandatory;
    this.lawsIds = lawsIds;
    this.devicesIds = devicesIds;
  }
}

export { CreateItemUseCaseRequest };
