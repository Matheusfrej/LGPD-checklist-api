class UserEntity {
  public id: number;
  public name: string;
  public office: string;
  public email: string;
  public password: string;

  constructor(
    id: number,
    name: string,
    office: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.office = office;
    this.email = email;
    this.password = password;
  }
}

export { UserEntity };
