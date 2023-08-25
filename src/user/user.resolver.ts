import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }
}
