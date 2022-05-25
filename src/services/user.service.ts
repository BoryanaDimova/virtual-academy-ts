import { Service, Inject } from "typedi";
import { User } from "../entitities/user.type";
import { CreateUserInput } from "../inputsAndArgs/user.input";
import { ObjectIdScalar } from "../object-id.scalar";


// this service will be global - shared by every request
@Service({ global: true })
export class UserService {
  private autoIncrementValue: number;

  constructor(@Inject("Users") private readonly items: User[]) {
    this.autoIncrementValue = items.length;
  }

  async getAll() {
    return this.items;
  }

  async getOne(id: String) {
    return this.items.find(it => it.id === ObjectIdScalar.parseValue(id));
  }

  async add(data: CreateUserInput) {
    const user = this.createUser(data);
    this.items.push(user);
    return user;
  }

  private createUser(data: Partial<User>): User {
    const user = Object.assign(new User(), {
      ...data,
      id: this.getId(),
    });
    return user;
  }

  private getId(): string {
    return (++this.autoIncrementValue).toString();
  }
}