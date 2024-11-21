import { Controller, Get, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('persona/:codigoPersona')
  async obtenerPortfolioPorCodigoPersona(@Param('codigoPersona') codigoPersona: number) {
    return await this.portfolioService.obtenerPortfolioPorCodigoPersona(codigoPersona);
  }
}
