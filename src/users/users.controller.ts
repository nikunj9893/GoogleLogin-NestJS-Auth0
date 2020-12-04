import { Controller, Post, Body, Get, Put, Delete,Param,UseGuards,Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':name')
    get(@Param('name') name: string) {
        return this.service.getUser(name);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // gets() {
    //     return this.service.findAll();
    // }
    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Put()
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        return (req)
    }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
      return this.service.googleLogin(req)
    }
}