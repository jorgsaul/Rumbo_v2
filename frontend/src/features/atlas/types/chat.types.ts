export interface MensajeAtlas {
  role: "user" | "bot";
  texto: string;
  timestamp: Date;
}
 
export interface RespuestaAtlas {
  mensaje: string;
}