import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JoiValidationPipe } from 'src/shared/pipes/joi-validation';
import { findOnceSchema } from './tests/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  user() {
    return this.userService.list();
  }

  @Get('/one/:id')
  @UsePipes(new JoiValidationPipe(findOnceSchema))
  async findOne(@Param('id') id): Promise<User> {
    return this.userService.listById(id);
  }
}
