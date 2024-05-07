import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postSleepData(data : any){
    return this.http.post<any>('http://localhost:5155/Sleep/', data)
  }

  getSleepData(){
    return this.http.get<any>('http://localhost:5155/Sleep/')
  }

  updateSleepData(data : any, id: number){
    return this.http.put<any>('http://localhost:5155/Sleep/'+id,data)
  }

  deleteSleepData(id:number){
    return this.http.delete<any>('http://localhost:5155/Sleep/'+id)
  }
}
