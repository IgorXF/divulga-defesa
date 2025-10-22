// src/lib/mockDefesas.ts

type BancaMember = {
  id: number;
  nome: string;
  papel: string;
};

export interface DefesaAgendada {
  id: number;
  candidatoNome: string;
  candidatoFotoUrl: string;
  titulo: string;
  tipoDefesa: string;
  dataHora: Date;
  orientadorEmail: string;
  instituicaoNome: string;
  instituicaoCardText: string;
  instituicaoLogoUrl: string;
  banca: BancaMember[];
}

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const hoje = new Date();

export const mockDefesas: DefesaAgendada[] = [
  // --- Defesas existentes ---
  {
    id: 1,
    candidatoNome: "Ana Silva",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    titulo: "Impacto das Redes Sociais na Educação Infantil",
    tipoDefesa: "Qualificação",
    dataHora: addDays(hoje, 2), // Em 2 dias
    orientadorEmail: "orientador.ana@exemplo.com",
    instituicaoNome: "Universidade Federal de São Carlos (UFSCar)",
    instituicaoCardText: "Universidade Federal\nde São Carlos",
    instituicaoLogoUrl: "/assets/logos/ufSCar.jpeg",
    banca: [
      { id: 101, nome: "Prof. Dr. Orientador A", papel: "Orientador" },
      { id: 102, nome: "Prof. Dra. Membro B", papel: "Membro Interno" },
      { id: 103, nome: "Prof. Dr. Membro C", papel: "Membro Externo" },
    ],
  },
  {
    id: 2,
    candidatoNome: "Bruno Costa",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    titulo: "Análise Biomecânica da Corrida em Atletas Amadores",
    tipoDefesa: "Dissertação",
    dataHora: addDays(hoje, 5), // Em 5 dias
    orientadorEmail: "orientador.bruno@exemplo.com",
    instituicaoNome: "IF Sudeste MG - Campus Rio Pomba",
    instituicaoCardText: "Instituto Federal\nSudeste de Minas Gerais\nCampus Rio Pomba",
    instituicaoLogoUrl: "/assets/logos/ifsemg.png",
    banca: [
      { id: 201, nome: "Prof. Dr. Orientador X", papel: "Orientador" },
      { id: 202, nome: "Prof. Dra. Membro Y", papel: "Membro Externo" },
    ],
  },
  {
    id: 3,
    candidatoNome: "Carla Dias",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    titulo: "Gamificação como Ferramenta Pedagógica no Ensino Médio",
    tipoDefesa: "Dissertação",
    dataHora: addDays(hoje, 9), // Em 9 dias (fora do filtro de 7 dias)
    orientadorEmail: "orientador.carla@exemplo.com",
    instituicaoNome: "Universidade Estadual de Maringá (UEM)",
    instituicaoCardText: "Universidade Estadual\nde Maringá",
    instituicaoLogoUrl: "/assets/logos/UEM.jpeg",
    banca: [
       { id: 301, nome: "Prof. Dr. Orientador P", papel: "Orientador" },
       { id: 302, nome: "Prof. Dra. Membro Q", papel: "Membro Interno" },
    ],
  },
   {
    id: 4,
    candidatoNome: "Daniel Ferreira",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    titulo: "Desenvolvimento de um Recurso Educacional Aberto para Botânica",
    tipoDefesa: "Recurso Educacional",
    dataHora: addDays(hoje, 6), // Em 6 dias
    orientadorEmail: "orientador.daniel@exemplo.com",
    instituicaoNome: "Universidade Federal de Alagoas (UFAL)",
    instituicaoCardText: "Universidade Federal\nde Alagoas",
    instituicaoLogoUrl: "/assets/logos/Ufal.png",
     banca: [
       { id: 401, nome: "Prof. Dr. Orientador K", papel: "Orientador" },
       { id: 402, nome: "Prof. Dra. Membro L", papel: "Membro Interno" },
       { id: 403, nome: "Prof. Dra. Membro M", papel: "Membro Externo" },
     ],
  },

  // --- NOVAS DEFESAS MOCK ---
  {
    id: 5,
    candidatoNome: "Fernanda Lima",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    titulo: "Letramento Digital na Terceira Idade: Um Estudo de Caso",
    tipoDefesa: "Qualificação",
    dataHora: addDays(hoje, 1), // Amanhã
    orientadorEmail: "orientador.fernanda@exemplo.com",
    instituicaoNome: "Universidade Federal de Mato Grosso (UFMT)",
    instituicaoCardText: "Universidade Federal\nde Mato Grosso",
    instituicaoLogoUrl: "/assets/logos/UFMT.jpg",
    banca: [
      { id: 501, nome: "Prof. Dra. Orientadora F", papel: "Orientador" },
      { id: 502, nome: "Prof. Dr. Membro G", papel: "Membro Externo" },
    ],
  },
  {
    id: 6,
    candidatoNome: "Gustavo Pereira",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60",
    titulo: "Adaptações Curriculares para Alunos com Altas Habilidades",
    tipoDefesa: "Dissertação",
    dataHora: addDays(hoje, 4), // Em 4 dias
    orientadorEmail: "orientador.gustavo@exemplo.com",
    instituicaoNome: "Instituto Federal do Ceará (IFCE)",
    instituicaoCardText: "Instituto Federal\ndo Ceará",
    instituicaoLogoUrl: "/assets/logos/IFCE.png",
    banca: [
      { id: 601, nome: "Prof. Dr. Orientador H", papel: "Orientador" },
      { id: 602, nome: "Prof. Dra. Membro I", papel: "Membro Interno" },
      { id: 603, nome: "Prof. Dr. Membro J", papel: "Membro Externo" },
    ],
  },
  {
    id: 7,
    candidatoNome: "Helena Santos",
    candidatoFotoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRyYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60",
    titulo: "A Influência da Música no Desenvolvimento Cognitivo Infantil",
    tipoDefesa: "Tese", // Exemplo de Tese
    dataHora: addDays(hoje, 15), // Em 15 dias (fora do filtro)
    orientadorEmail: "orientador.helena@exemplo.com",
    instituicaoNome: "Universidade Federal do Amazonas - Campus de Parintins (UFAM)",
    instituicaoCardText: "Universidade Federal do Amazonas\nCampus de Parintins",
    instituicaoLogoUrl: "/assets/logos/ufam.png",
    banca: [
      { id: 701, nome: "Prof. Dra. Orientadora N", papel: "Orientador" },
      { id: 702, nome: "Prof. Dr. Membro O", papel: "Membro Interno" },
      { id: 703, nome: "Prof. Dra. Membro P", papel: "Membro Externo" },
      { id: 704, nome: "Prof. Dr. Membro Q", papel: "Membro Externo" },
    ],
  },
];