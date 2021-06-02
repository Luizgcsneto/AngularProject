import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from './Mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  url =  'https://localhost:5001/api/mensagens';

  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  pegartodos(): Observable<Mensagem[]>
  {
    return this.http.get<Mensagem[]>(this.url);
  }

  pegarPeloId(Id: number): Observable<Mensagem>
  {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Mensagem>(apiUrl);
  }

  salvarMensagem(mensagem: Mensagem): Observable<any>
  {
    return this.http.post<Mensagem>(this.url, mensagem, this.httpOptions);
  }

  atualizarMensagem(mensagem: Mensagem): Observable<any> {
    return this.http.put<Mensagem>(this.url, mensagem, this.httpOptions);
  }

  excluirMensagem(Id: number): Observable<any>{
     const apiUrl = `${this.url}/${Id}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }
}
