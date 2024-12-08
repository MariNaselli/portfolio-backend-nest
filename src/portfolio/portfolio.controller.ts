import { Controller, Get, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('persona/:uuid')
  async obtenerPortfolioPorCodigoPersona(@Param('uuid') uuid: string) {
    console.log('nombre_apellido_uuid recibido:', uuid); // Para depuración
    return await this.portfolioService.obtenerPortfolioPorCodigoPersona(uuid);
  }
}
