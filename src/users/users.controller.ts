import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Query,
  Body,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  /**
   * Final Endpoint – /users/:id?  (handled via two explicit paths)
   * - /users -> return all users with default pagination
   * - /users/:id -> return one user (id is numeric)
   * Query:
   * - limit: integer, default 10
   * - page:  integer, default 1
   */

  @Get()
  @Get(':id') // second path, same handler
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Param('id') id?: string, // optional; provided only for /users/:id

  ) {
    const numericId = id !== undefined ? Number(id) : undefined;
    // TODO: validate numericId if you need strict numeric-only
    // if (id !== undefined && Number.isNaN(numericId)) throw new BadRequestException('id must be a number');

    if (numericId !== undefined) {
      // return a single user by id
      return { type: 'single', id: numericId };
    }

    // return paginated users
    return { type: 'list', limit, page };
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return { ok: true, data: createUserDto };
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return { ok: true, data: patchUserDto };
  }
}
