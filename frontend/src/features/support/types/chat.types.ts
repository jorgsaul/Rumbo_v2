export interface Opcion {
  id: string;
  label: string;
}

export interface MensajeFAQ {
  role: 'bot' | 'user';
  texto: string;
  opciones?: Opcion[];
}