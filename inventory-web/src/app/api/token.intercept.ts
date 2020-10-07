import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class TokenIntercept implements HttpInterceptor {

    constructor(private cookieService: CookieService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookieService.get("access-token");

        const modifiedReq = req.clone({ 
            headers: req.headers.set('access-token', token),
        });

        return next.handle(modifiedReq);
    }
}