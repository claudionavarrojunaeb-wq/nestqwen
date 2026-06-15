// NestJS es un framework de Node.js para construir aplicaciones backend escalables.
// Esta basado en TypeScript, usa decoradores y sigue una arquitectura modular.
// Sus piezas principales son:
// - Modules: organizan la aplicacion.
// - Controllers: reciben peticiones HTTP.
// - Services: contienen la logica de negocio.
// - Providers: componentes inyectables por dependencias.
//
// Ejemplo basico de NestJS:

import { Controller, Get, Module, Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  getMessage() {
    return { message: 'Hola desde NestJS' };
  }
}

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('saludo')
  getSaludo() {
    return this.appService.getMessage();
  }
}

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Este ejemplo define:
// - Un servicio que devuelve un mensaje.
// - Un controlador con el endpoint GET /saludo.
// - Un modulo principal que registra controlador y servicio.
//
// Para ejecutarlo en un proyecto real de NestJS, AppModule se usa desde main.ts
// con NestFactory.create(AppModule).