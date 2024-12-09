import { Controller, Get, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('persona/:uuid')
  async obtenerPortfolioPorCodigoPersona(@Param('uuid') uuid: string) {
    return await this.portfolioService.obtenerPortfolioPorCodigoPersona(uuid);
  }
}
