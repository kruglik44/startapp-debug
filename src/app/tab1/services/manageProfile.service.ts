import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "src/app/components/auth/auth.service";

@Injectable({providedIn: 'root'})

export class ManageProfileService{

    constructor(private http: HttpClient, private authService: AuthService){}

    getProfileData(userId){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<any>(`https://startapp-debug-default-rtdb.firebaseio.com/company/${userId}.json`, 
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
                );
        }))
    }

    getProfileType(userId){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<any>(`https://startapp-debug-default-rtdb.firebaseio.com/company/${userId}.json`, 
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
                );
        }))
    }

    getUsersArray(){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<any>(`https://startapp-debug-default-rtdb.firebaseio.com/company.json`, 
                {
                    params: new HttpParams().set('auth', user.token)
                });
        }))
    }

    postProfileData(data, userId){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.post<any>(`https://startapp-debug-default-rtdb.firebaseio.com/company/${userId}.json`, data,
                {
                    params: new HttpParams().set('auth', user.token)
                });
        }))
    }

    addNewCarToTransportList(data, userId, companyId){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.post<any>(`https://startapp-debug-default-rtdb.firebaseio.com/company/${userId}/${companyId}/autopark.json`, data,
                {
                    params: new HttpParams().set('auth', user.token)
                });
        }))
    }

    sendTruckNotify(data){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.post<any>(`https://startapp-debug-default-rtdb.firebaseio.com/transport_list.json`, data,
                {
                    params: new HttpParams().set('auth', user.token)
                });
        }))
    }

    sendCargoNotify(data){
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.post<any>(`https://startapp-debug-default-rtdb.firebaseio.com/cargo_list.json`, data,
                {
                    params: new HttpParams().set('auth', user.token)
                });
        }))
    }
}
