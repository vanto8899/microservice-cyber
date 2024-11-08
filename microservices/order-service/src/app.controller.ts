import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("ORDER_PRODUCT_NAME") 
  order(@Payload() data) {
    return this.appService.order(data);
  }

  @MessagePattern("SAVE_CACHE")
  saveCache(){
    return this.appService.saveCache();
  }

  @MessagePattern("DELETE_CACHE")
  deleteCache(){
    return this.appService.deleteCache();

  }

  @MessagePattern("FIND_PRODUCT")
  searchProduct(@Payload() data) {
    return this.appService.searchProduct(data)
  }
}
