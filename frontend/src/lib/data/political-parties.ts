export interface PoliticalParty {
  id: string;
  name: string;
  shortName?: string;
  sigla: string; // Sigla del partido (coincide con id)
  color: string;
  logo?: string;
  coalition?: string[];
}

export const politicalParties: PoliticalParty[] = [
  {
    id: 'jxc',
    sigla: 'jxc',
    name: 'Juntos por el Cambio',
    shortName: 'JxC',
    color: '#FFD700',
    logo: '/logos/jxc.png',
    coalition: ['PRO', 'UCR', 'CC-ARI']
  },
  {
    id: 'uxp',
    sigla: 'uxp',
    name: 'Unión por la Patria',
    shortName: 'UxP',
    color: '#ADD8E6',
    logo: '/logos/uxp.png',
    coalition: ['PJ', 'FR', 'FdT']
  },
  {
    id: 'lla',
    sigla: 'lla',
    name: 'La Libertad Avanza',
    shortName: 'LLA',
    color: '#7FFFD4',
    logo: '/logos/lla.png'
  },
  {
    id: 'fit',
    sigla: 'fit',
    name: 'Frente de Izquierda y de Trabajadores - Unidad',
    shortName: 'FIT-U',
    color: '#FF0000',
    logo: '/logos/fit.png',
    coalition: ['PO', 'PTS', 'IS']
  },
  {
    id: 'hacemos',
    sigla: 'hacemos',
    name: 'Hacemos por Nuestro País',
    shortName: 'HNP',
    color: '#800080',
    logo: '/logos/hnp.png'
  },
  {
    id: 'nulo',
    sigla: 'nulo',
    name: 'Voto en Blanco',
    color: '#CCCCCC'
  },
  {
    id: 'recurrido',
    sigla: 'recurrido',
    name: 'Voto Recurrido',
    color: '#FFA500'
  },
  {
    id: 'impugnado',
    sigla: 'impugnado',
    name: 'Voto Impugnado',
    color: '#000000'
  },
];
