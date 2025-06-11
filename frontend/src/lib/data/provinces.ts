export interface Province {
  id: string;
  name: string;
  code: string;
}

export const provinces: Province[] = [
  { id: 'c', name: 'Ciudad Autónoma de Buenos Aires', code: 'CABA' },
  { id: 'b', name: 'Buenos Aires', code: 'BA' },
  { id: 'k', name: 'Catamarca', code: 'CT' },
  { id: 'h', name: 'Chaco', code: 'CC' },
  { id: 'u', name: 'Chubut', code: 'CH' },
  { id: 'x', name: 'Córdoba', code: 'CB' },
  { id: 'w', name: 'Corrientes', code: 'CR' },
  { id: 'e', name: 'Entre Ríos', code: 'ER' },
  { id: 'p', name: 'Formosa', code: 'FO' },
  { id: 'y', name: 'Jujuy', code: 'JY' },
  { id: 'l', name: 'La Pampa', code: 'LP' },
  { id: 'f', name: 'La Rioja', code: 'LR' },
  { id: 'm', name: 'Mendoza', code: 'MZ' },
  { id: 'n', name: 'Misiones', code: 'MN' },
  { id: 'q', name: 'Neuquén', code: 'NQ' },
  { id: 'r', name: 'Río Negro', code: 'RN' },
  { id: 'a', name: 'Salta', code: 'SA' },
  { id: 'j', name: 'San Juan', code: 'SJ' },
  { id: 'd', name: 'San Luis', code: 'SL' },
  { id: 'z', name: 'Santa Cruz', code: 'SC' },
  { id: 's', name: 'Santa Fe', code: 'SF' },
  { id: 'g', name: 'Santiago del Estero', code: 'SE' },
  { id: 'v', name: 'Tierra del Fuego', code: 'TF' },
  { id: 't', name: 'Tucumán', code: 'TM' },
];
