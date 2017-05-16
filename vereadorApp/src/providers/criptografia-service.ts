import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
declare function escape(s:string): string;
declare function unescape(s:string): string;
@Injectable()
export class CriptografiaService {

    constructor() {
    }

    enc(palavra) {
        palavra = JSON.stringify(palavra);
        palavra = palavra.replace( /\\/g, '*');
        palavra = unescape(encodeURIComponent(palavra));
        let chave = 47;
        let add_text = "user usuario idUser comum admin id senha password username nome root administrador adm permissao c a ADM comum";
        palavra += add_text;
        let s = palavra.length + 1;
        let nw = "";
        let n = chave;
        let nindex;
        for (let x = 1; x < s; x++) {
            let m = x * chave;
            if (m > s) {
                nindex = m % s;
            }
            else if (m < s) {
                nindex = m;
            }
            if (m % s == 0) {
                nindex = x;
            }
            nw = nw + palavra[nindex - 1];
        }
        //return this.enc2(nw);
        return nw;
    }

    private enc2(palavra) {
        let chave = 13;
        let add_text = "segundaPassada";

        palavra += add_text;
        let s = palavra.length + 1;
        let nw = "";
        let n = chave;
        let nindex;
        for (let x = 1; x < s; x++) {
            let m = x * chave;
            if (m > s) {
                nindex = m % s;
            }
            else if (m < s) {
                nindex = m;
            }
            if (m % s == 0) {
                nindex = x;
            }
            nw = nw + palavra[nindex - 1];
        }
        return nw;
    }

    dec(palavra): any {
        //palavra = palavra.json();
        //palavra = palavra.teste;
        palavra = palavra._body;
        let chave = 47;
        let add_text = "user usuario idUser comum admin id senha password username nome root administrador adm permissao c a ADM comum";

        palavra = palavra.replace( /\*/g, '\\');

        let s = palavra.length + 1;
        let nw = "";
        let n = chave;
        let nindex;
        for (let y = 1; y < s; y++) {
            let m = y * n;
            if (m % s == 1) {
                n = y;
                break;
            }
        }
        for (let x = 1; x < s; x++) {
            let m = x * n;
            if (m > s) {
                nindex = m % s;
            }
            else if (m < s) {
                nindex = m;
            }
            if (m % s == 0) {
                nindex = x;
            }
            nw = nw + palavra[nindex - 1];
        }
        let t = nw.length - add_text.length;
        //return this.dec2(nw.substring(0, t));
        palavra = decodeURIComponent(escape(palavra));        
        return JSON.parse((nw.substring(0, t)));
    }

    private dec2(palavra): any {

        let chave = 5;
        let add_text = "esse texto deveria complicar";
        let s = palavra.length + 1;
        let nw = "";
        let n = chave
        let nindex;
        for (let y = 1; y < s; y++) {
            let m = y * n;
            if (m % s == 1) {
                n = y;
                break;
            }
        }
        for (let x = 1; x < s; x++) {
            let m = x * n;
            if (m > s) {
                nindex = m % s;
            }
            else if (m < s) {
                nindex = m;
            }
            if (m % s == 0) {
                nindex = x;
            }
            nw = nw + palavra[nindex - 1];
        }
        let t = nw.length - add_text.length;
        return JSON.parse(nw.substring(0, t));
    }

}
