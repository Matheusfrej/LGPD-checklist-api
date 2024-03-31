class SystemEntity {
  public id: number;
  public name: string;
  public description: string;
  public userId: number;

  constructor(id: number, name: string, description: string, userId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
  }
}

export { SystemEntity };
