import {Injectable} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/Video";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Generalservice {
  // constructor(private http: HttpClient) { }
  // enviarIdVideoPlayingBaseDatos(id:number){
  //   return this.http.post<Video>('http://localhost:8080/api/video/get/', id)
  // }
}
