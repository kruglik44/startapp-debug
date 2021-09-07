import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "src/app/components/auth/auth.service";

@Injectable({providedIn: 'root'})

export class TransportListService{

    constructor(private http: HttpClient, private authService: AuthService){}

    getTransportList(){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<any>(`https://startapp-debug-default-rtdb.firebaseio.com/transport_list.json`, 
                {
                    params: new HttpParams().set('auth', user.token)
                }).pipe(
                    map(responseData => {
                        const array = [];
                        for (const key in responseData){
                            if(responseData.hasOwnProperty(key)){
                                array.push({...responseData[key], id: key});
                            }
                        }
                        return array;
                    })
                );;
        }))  
    }
}


