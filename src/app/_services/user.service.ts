import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece';
import { environment } from 'src/environments/environment';

// const API_URL = 'http://localhost:8080/api/test/';
const API_URL2 = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  getUserBoard(): Observable<Piece[]> {
    return this.http.get<any>(API_URL2 + 'piece/all');
  }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
}
