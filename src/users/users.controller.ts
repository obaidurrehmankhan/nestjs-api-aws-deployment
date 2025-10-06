import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Body,
  Headers,
  Ip,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  // Matches: /users/123   and   /users/123/foo
  @Get(':id{/:optional}')
  public getUsers(
    @Param('id') id: string,
    @Param('optional') optional?: string,
    @Query('limit') limit?: string,
  ) {
    console.log({ id, optional, limit });
    return 'You sent a get request to users endpoint';
  }

  @Post()
  public createUsers(
    @Body() request: any,
    @Headers() headers: Record<string, any>,
    @Ip() ip: string,
  ) {
    console.log({ request, headers, ip });
    return 'You sent a post request to users endpoint';
  }
}
