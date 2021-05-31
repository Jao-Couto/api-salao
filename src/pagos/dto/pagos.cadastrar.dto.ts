import { Settings } from "node:http2";

export interface PagosCadastrarDto{
    cliente: number;
    data: string;
    dataPago: string;
    hora: string;
    descricao: string;
    valor: number;
  }