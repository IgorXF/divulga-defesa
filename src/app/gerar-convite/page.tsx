// src/app/gerar-convite/page.tsx

"use client";

import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Download, Eye, UploadCloud, XCircle, PlusCircle } from 'lucide-react';

import ConviteCard from '@/components/ConviteCard';
import { institutions, Institution } from '@/lib/institutions';

// Definindo o tipo para um membro da banca
type BancaMember = {
  id: number;
  nome: string;
  papel: string;
};

const placeholderPhoto = "/assets/logos/placeholder-foto.jpg";

export default function GerarConvitePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(placeholderPhoto);
  
  const [formData, setFormData] = useState({
    instituicaoId: institutions[0].id,
    tipoDefesa: '',
    titulo: '',
    candidato: '',
    banca: [] as BancaMember[],
    data: '',
    hora: '',
    emailOrientador: '',
  });

  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(institutions[0]);

  useEffect(() => {
    const currentInstitution = institutions.find(inst => inst.id === formData.instituicaoId);
    if (currentInstitution) {
      setSelectedInstitution(currentInstitution);
    }
  }, [formData.instituicaoId]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemovePhoto = () => {
    setPhotoPreviewUrl(placeholderPhoto);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // --- Funções para Gerenciar a Banca ---
  const handleBancaChange = (id: number, field: 'nome' | 'papel', value: string) => {
    setFormData(prevState => ({
      ...prevState,
      banca: prevState.banca.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  const addBancaMember = () => {
    const newMember: BancaMember = {
      id: Date.now(),
      nome: '',
      papel: 'Membro Interno'
    };
    setFormData(prevState => ({
      ...prevState,
      banca: [...prevState.banca, newMember]
    }));
  };

  const removeBancaMember = (id: number) => {
    setFormData(prevState => ({
      ...prevState,
      banca: prevState.banca.filter(member => member.id !== id)
    }));
  };

  const handleGerarImagem = async () => {
    if (cardRef.current === null) {
      return;
    }

    try {
      // MUDANÇA AQUI: Removido o bloco 'fetchRequest' que causava o erro de build.
      const dataUrl = await toPng(cardRef.current, { 
        quality: 1.0, 
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
        // As outras opções para ajudar com o cache (como 'key' e 'unoptimized' no ConviteCard) já estão ativas.
      });

      const link = document.createElement('a');
      const fileName = formData.candidato ? formData.candidato.toLowerCase().replace(/\s+/g, '-') : 'convite';
      link.download = `convite-${fileName}.png`;
      link.href = dataUrl;
      link.click();

    } catch (err) {
      console.error('Oops, algo deu errado na geração da imagem!', err);
      alert('Não foi possível gerar a imagem. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">Gerador de Convites para Defesa</h1>
          <p className="text-lg text-gray-600 mt-2">Preencha os campos abaixo para criar seu convite personalizado.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna do Formulário (Esquerda) */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <form className="space-y-8">
              <fieldset className="space-y-4">
                <legend className="text-xl font-bold text-gray-700 border-b pb-2 mb-4 w-full">Dados Institucionais</legend>
                <div>
                  <label htmlFor="instituicaoId" className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                  <select name="instituicaoId" id="instituicaoId" value={formData.instituicaoId} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    {institutions.map(inst => (
                      <option key={inst.id} value={inst.id}>{inst.name}</option>
                    ))}
                  </select>
                </div>
              </fieldset>
              <fieldset className="space-y-4">
                <legend className="text-xl font-bold text-gray-700 border-b pb-2 mb-4 w-full">Dados da Defesa</legend>
                <div>
                  <label htmlFor="tipoDefesa" className="block text-sm font-medium text-gray-700">Tipo de Defesa</label>
                  <input type="text" name="tipoDefesa" placeholder="Ex: Dissertação e Recurso Educacional" value={formData.tipoDefesa} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título do Projeto</label>
                  <textarea name="titulo" placeholder="O título completo do trabalho" value={formData.titulo} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
              </fieldset>
              <fieldset className="space-y-4">
                 <legend className="text-xl font-bold text-gray-700 border-b pb-2 mb-4 w-full">Candidato(a) e Banca</legend>
                 <div>
                    <label htmlFor="candidato" className="block text-sm font-medium text-gray-700">Nome do Candidato(a)</label>
                    <input type="text" name="candidato" placeholder="Nome completo do(a) candidato(a)" value={formData.candidato} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Foto do Candidato(a)</label>
                    <div className="mt-1 flex items-center gap-4">
                      <label htmlFor="photoUpload" className="flex-grow flex justify-center items-center gap-2 px-4 py-2 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                        <UploadCloud size={20} className="text-gray-500" />
                        <span className="text-blue-600 font-semibold">Enviar imagem</span>
                      </label>
                      <input id="photoUpload" name="photoUpload" type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
                      {photoPreviewUrl !== placeholderPhoto && (
                        <button type="button" onClick={handleRemovePhoto} className="p-2 text-red-600 hover:text-red-800">
                          <XCircle size={24} />
                        </button>
                      )}
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Membros da Banca</label>
                    <div className="space-y-3">
                      {formData.banca.map((member) => (
                        <div key={member.id} className="flex items-center gap-2 p-2 border rounded-md">
                          <div className="flex-grow">
                            <input 
                              type="text" 
                              placeholder="Nome do Membro" 
                              value={member.nome}
                              onChange={(e) => handleBancaChange(member.id, 'nome', e.target.value)}
                              className="block w-full text-sm rounded-md border-gray-300 shadow-sm"
                            />
                          </div>
                          <div className="w-48">
                            <select 
                              value={member.papel}
                              onChange={(e) => handleBancaChange(member.id, 'papel', e.target.value)}
                              className="block w-full text-sm rounded-md border-gray-300 shadow-sm"
                            >
                              <option>Orientador</option>
                              <option>Coorientador</option>
                              <option>Membro Interno</option>
                              <option>Membro Externo</option>
                            </select>
                          </div>
                          <button type="button" onClick={() => removeBancaMember(member.id)} className="p-2 text-gray-500 hover:text-red-600">
                            <XCircle size={20} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={addBancaMember} className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2 border-2 border-dashed rounded-md text-sm text-blue-600 font-semibold hover:bg-blue-50">
                        <PlusCircle size={18} />
                        Adicionar Membro à Banca
                      </button>
                    </div>
                 </div>
              </fieldset>
              
              <fieldset className="space-y-4">
                 <legend className="text-xl font-bold text-gray-700 border-b pb-2 mb-4 w-full">Informações de Acesso</legend>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
                        <input type="text" name="data" placeholder="DD/MM/AAAA" value={formData.data} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
                        <input type="text" name="hora" placeholder="HH:MMh" value={formData.hora} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                 </div>
                 <div className="mt-2">
                    <label htmlFor="emailOrientador" className="block text-sm font-medium text-gray-700">E-mail do Orientador</label>
                    <input type="email" name="emailOrientador" placeholder="email.orientador@exemplo.com" value={formData.emailOrientador} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                 </div>
              </fieldset>
              
              <div className="pt-4">
                <button type="button" onClick={handleGerarImagem} className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md">
                  <Download size={20} />
                  Gerar e Baixar Imagem
                </button>
              </div>
            </form>
          </div>

          <div className="sticky top-8 self-start">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Eye size={28}/> Pré-visualização</h2>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <div style={{ transform: 'scale(0.55)', transformOrigin: 'top left' }} className=" -mb-[240px]">
                    <ConviteCard
                        {...formData}
                        instituicaoTexto={selectedInstitution.cardText}
                        instituicaoLogoUrl={selectedInstitution.logoUrl}
                        fotoCandidatoUrl={photoPreviewUrl}
                    />
                </div>
            </div>
          </div>
        </div>

        <div className="absolute -left-[9999px] top-0">
          <ConviteCard
            ref={cardRef}
            {...formData}
            instituicaoTexto={selectedInstitution.cardText}
            instituicaoLogoUrl={selectedInstitution.logoUrl}
            fotoCandidatoUrl={photoPreviewUrl}
          />
        </div>
      </main>
    </div>
  );
}