import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpClient, HttpInterceptor } from '@angular/common/http';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): any{
        
        var token = localStorage.getItem('access_token');
        
        if(token){
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });

            return next.handle(cloned);
        }else{
            return next.handle(req);
        }
    }
}