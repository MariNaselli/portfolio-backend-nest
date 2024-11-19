import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("AppController")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/saludar")
  @ApiOperation({ summary: 'Método get para probar la api' })
  getHello(): string {
    return this.appService.getHello();
  }
}
