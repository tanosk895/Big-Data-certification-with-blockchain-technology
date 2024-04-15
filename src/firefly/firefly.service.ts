import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, firstValueFrom, map } from 'rxjs';
import * as path from 'path';
// slidesgo.com
// f.giorgione4@studenti.unisa,.it
// francesco.giorgione01@gmail.com

@Injectable()
export class ApiService {

    private source: string;
    private portNode: number;
    private port: number;

    constructor(private readonly httpService: HttpService) {
        this.source = "http://localhost";
        this.port = 5000;
        this.portNode = 5109;
    }

        sendMessagePrivateBlob(data: any) {
            const d = `${path}./uploads/buffer`;
            console.log("SONO IN FIREFLY SERVICE")
            return this.httpService.post(`${this.source}:${this.portNode}/api/messages/privateblob`, data,{ headers: {
                'Content-Type': 'multipart/form-data'}
            });
        }
        async SendTransaction(data: any) {
            console.log("sono nel sendTansaction ff vedo se cambia qualcosa qua", data);
        await firstValueFrom(  
            this.httpService.post(`${this.source}:${this.port}/api/v1/namespaces/default/apis/HashStorage/invoke/storeData`,
            { "input": { "_hash" : data } },{ headers: { 'Content-Type': 'application/json'} }));
        return data;
        }
    async getData(){
        const res = await firstValueFrom(
            this.httpService.post(`${this.source}:${this.port}/api/v1/namespaces/default/apis/HashStorage/query/getDataList`,
            { "input": {} },{ headers: {  'Content-Type': 'application/json'} }));
         return res.data.output; 
    }
    async setStorageData(data: any) {
        const res = await firstValueFrom(
            this.httpService.post(`${this.source}:${this.port}/api/v1/namespaces/default/apis/HashStorage/invoke/storeDataFromArray`,
          data,{ headers: { 'Content-Type': 'application/json'} }));
     }
     async setStorageFile(file: any) {
        const res = await firstValueFrom(this.httpService.post(`${this.source}:${this.port}/data`, file));
        console.log("####____", file,'\n\n\n',res);
     }
}

