// src/components/DefesaItemCard.tsx

"use client"; 

import React from 'react';
import Image from 'next/image';
import { Calendar, Mail, Download } from 'lucide-react';
import { DefesaAgendada } from '@/lib/mockDefesas'; 

// Props atualizadas: recebe a função onDownloadClick
interface DefesaItemCardProps {
  defesa: DefesaAgendada;
  formatarDataHora: (data: Date) => string; 
  onDownloadClick: (defesaData: DefesaAgendada) => void; // Função para ser chamada no clique
}

const DefesaItemCard: React.FC<DefesaItemCardProps> = ({ defesa, formatarDataHora, onDownloadClick }) => {

  // Função do botão agora só chama o callback do pai
  const handleDownloadClick = () => {
    onDownloadClick(defesa); 
  };

  return (
    // Removido 'relative' pois não há mais filho absoluto
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-start gap-6"> 
      {/* Foto */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-300">
        <Image 
          src={defesa.candidatoFotoUrl} 
          alt={`Foto de ${defesa.candidatoNome}`} 
          width={128} 
          height={128} 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Informações */}
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{defesa.candidatoNome}</h2>
        <p className="text-sm text-gray-500 mb-2">{defesa.instituicaoNome}</p>
        <p className="text-sm font-semibold text-red-800 mb-3">{defesa.tipoDefesa}</p>
        <p className="text-lg font-semibold text-gray-700 mb-4">{defesa.titulo}</p>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar size={18} className="mr-2 flex-shrink-0" />
          <span className="font-medium">{formatarDataHora(defesa.dataHora)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Mail size={18} className="mr-2 flex-shrink-0" />
          <span className="font-medium mr-1">Contato (Orientador):</span>
          <a 
            href={`mailto:${defesa.orientadorEmail}?subject=Solicitação de Acesso à Defesa de ${defesa.candidatoNome}&body=Prezado(a) Professor(a),\n\nGostaria de solicitar acesso para assistir à defesa de ${defesa.candidatoNome} sobre "${defesa.titulo}", agendada para ${formatarDataHora(defesa.dataHora)}.\n\nAtenciosamente,\n[Seu Nome]`}
            className="text-blue-600 hover:underline break-all"
          >
            {defesa.orientadorEmail}
          </a>
        </div>

        {/* Botão agora chama handleDownloadClick */}
        <button 
          onClick={handleDownloadClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          <Download size={16} />
          Baixar Convite
        </button>
      </div>

      {/* O CARD INVISÍVEL FOI REMOVIDO DAQUI */}
      
    </div>
  );
};

export default DefesaItemCard;