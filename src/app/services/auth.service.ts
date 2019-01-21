import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError} from 'rxjs/operators';
import { MyUser} from '../models/myuser';

const httpOptions ={
  headers : new HttpHeaders ({'Content-type':'application/json'})
};

interface LoginOutput{
 id: string,
 ttl:number,
 created:string,
 userId: string
}


@Injectable()
export class AuthService {

  private myUserUrl= 'http://127.0.0.1:4001/api/MyUsers';

  constructor(private http: HttpClient) { }


  registerMyUser(myUser:MyUser):Observable<MyUser>{
    return this.http.post<MyUser>(this.myUserUrl, myUser,httpOptions).pipe(
      tap((myUser:MyUser)=>console.log('Created myUser with id ='+myUser.id)),
      catchError(this.handleError<MyUser>('registerMyUser'))
    );

  }

  login(myUser:MyUser):Observable<any>{
    return this.http.post<LoginOutput>(this.myUserUrl+"/login", myUser,httpOptions).pipe(
      map(loginOutput=>{
        //login succesful
        if(loginOutput.id && loginOutput.userId){
          localStorage.setItem('currentUser',loginOutput.userId);
          localStorage.setItem('accessToken',loginOutput.id);
        }
        return loginOutput;
      }),
      catchError(this.handleError<MyUser>('login MyUser'))
    );

  }

  logout():Observable<any>{
    let accessToken=localStorage.getItem('accessToken');
    return this.http.post(this.myUserUrl+"/logout", httpOptions).pipe(
      tap(()=>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        console.log("succesfully logged out user");
      }),
      catchError(this.handleError('logout MyUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
      //return the empty result so the application keeps running
      return of (result as T);
    }
  }

}
