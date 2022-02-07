export class Account {


  public name: string;
  public email: string;
  public gender?: string
  public birthday?: string
  public password: string;

  constructor(props: Account) {
    Object.assign(this, props);
  }
}