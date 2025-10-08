// src/lib/institutions.ts

export interface Institution {
  id: string;
  name: string;
  cardText: string;
  logoUrl: string;
}

export const institutions: Institution[] = [

  {
    id: 'ifsemg',
    name: 'Instituto Federal do Sudeste de Minas Gerais (IFSEMG)',
    cardText: 'Instituto Federal do Sudeste de Minas Gerais',
    logoUrl: '/assets/logos/IFSEMG.png',
  },

  {
    id: 'ufscar',
    name: 'Universidade Federal de São Carlos (UFSCar)',
    cardText: 'Universidade Federal\nde São Carlos',
    logoUrl: '/assets/logos/ufSCar.jpeg',
  },
  {
    id: 'ufal',
    name: 'Universidade Federal de Alagoas (UFAL)',
    cardText: 'Universidade Federal\nde Alagoas',
    logoUrl: '/assets/logos/Ufal.png',
  },
  {
    id: 'uem',
    name: 'Universidade Estadual de Maringá (UEM)',
    cardText: 'Universidade Estadual\nde Maringá',
    logoUrl: '/assets/logos/UEM.jpeg',
  },
  {
    id: 'ufmt',
    name: 'Universidade Federal de Mato Grosso (UFMT)',
    cardText: 'Universidade Federal\nde Mato Grosso',
    logoUrl: '/assets/logos/UFMT.jpg',
  },
  {
    id: 'ifce',
    name: 'Instituto Federal do Ceará (IFCE)',
    cardText: 'Instituto Federal\ndo Ceará',
    logoUrl: '/assets/logos/IFCE.png',
  },
  {
    id: 'unijui',
    name: 'Universidade Regional do Noroeste do Estado do Rio Grande do Sul (UNIJUI)',
    cardText: 'Universidade Regional do Noroeste\ndo Estado do Rio Grande do Sul',
    logoUrl: '/assets/logos/UNIJUI.jpg',
  },
  {
    id: 'ufam-parintins',
    name: 'Universidade Federal do Amazonas - Campus de Parintins (UFAM)',
    cardText: 'Universidade Federal do Amazonas\nCampus de Parintins',
    logoUrl: '/assets/logos/ufam.png',
  },
  {
    id: 'unioeste',
    name: 'Universidade Estadual do Oeste do Paraná (UNIOESTE)',
    cardText: 'Universidade Estadual\ndo Oeste do Paraná',
    logoUrl: '/assets/logos/Unioeste.jpg',
  },
];