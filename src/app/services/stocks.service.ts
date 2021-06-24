// Importar dependencias
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Declara un arreglo de acciones y variables del API
let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];

// Url del punto extremo del API
let service: string = "https://angular2-in-action-api.herokuapp.com";

// Define y exporta la interfaz TypeScript para un objeto acción
export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
}

// Anotación para la inyección de dependencia
@Injectable()

// Define la clase y la exporta
export class StockService {
  // Método constructor para inyectar el servicio HttpClient
  // en la propiedad de la clase http
  constructor(private http: HttpClient) { }

  // Obtiene la lista de acciones
  get() {
    return stocks.slice();
  }

  add(stock: string) {
    stocks.push(stock);
    return this.get();
  }

  remove(stock: string) {
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }

  load(symbols: Array<string>) {
    if (!symbols) {
      symbols = ["AAPL"];
    }
    //if (symbols) {
      return this.http.get<Array<StockInterface>>(service
        + '/stocks/snapshot?symbols='
        + symbols.join());
    //}
  }
}
