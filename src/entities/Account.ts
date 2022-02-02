import { v4 as uuidv4 } from 'uuid'

export class Account {

  public readonly id: string;

  public name: string;
  public email: string;
  public gender?: string
  public birthday?: string
  public password: string;

  constructor(props: Omit<Account, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidv4();
    }
  }
}