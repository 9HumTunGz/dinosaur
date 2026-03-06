import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinoService {
  private api = 'https://dinoapi.brunosouzadev.com/api/dinosaurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api).pipe(
      timeout(10000),
      retry(3)
    );
  }
}
