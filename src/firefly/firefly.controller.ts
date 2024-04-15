import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ApiService } from './firefly.service';

@Controller('firefly')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // @Get()
  // getExample(): Observable<AxiosResponse<any>> {
  //   return this.apiService.getExample();
  // }
}