import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = '/api/users'; // Adjust the API endpoint based on your backend

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getUserById(userId: number): Observable<any> {
        const url = `${this.apiUrl}/${userId}`;
        return this.http.get<any>(url);
    }

    updateUser(userId: number, userData: any): Observable<any> {
        const url = `${this.apiUrl}/${userId}`;
        return this.http.put<any>(url, userData);
    }

    deleteUser(userId: number): Observable<any> {
        const url = `${this.apiUrl}/${userId}`;
        return this.http.delete<any>(url);
    }
}
