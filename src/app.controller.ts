import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/backendApi/menu')
  async getMenu(
    @Res() res: Response,
  ) {
    try {
      const data = await this.appService.getMenu();

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
