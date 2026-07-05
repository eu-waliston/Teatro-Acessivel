// Configuração central dos recursos de acessibilidade exibidos como indicadores
// visuais (item 5.5) e usados nas páginas de espetáculo e no formulário de
// solicitação (item 5.3). Mantida em um único lugar para evitar duplicidade.

export const CATEGORIAS = {
  fisica: { rotulo: 'Acessibilidade física', cor: 'var(--accent-info)' },
  comunicacional: { rotulo: 'Acessibilidade comunicacional', cor: 'var(--accent-libras)' },
  informacional: { rotulo: 'Acessibilidade informacional', cor: 'var(--accent-spotlight)' },
  especializados: { rotulo: 'Recursos especializados', cor: 'var(--accent-especial)' }
};

// Recursos disponibilizados pelo espetáculo (informativo)
export const RECURSOS_ESPETACULO = [
  { chave: 'interpreteLibras', rotulo: 'Intérprete de Libras', categoria: 'comunicacional', sigla: 'LIBRAS' },
  { chave: 'audiodescricao', rotulo: 'Audiodescrição', categoria: 'comunicacional', sigla: 'AD' },
  { chave: 'legendagem', rotulo: 'Legendagem', categoria: 'comunicacional', sigla: 'CC' },
  { chave: 'assentosReservados', rotulo: 'Assentos reservados', categoria: 'fisica', sigla: '♿' },
  { chave: 'espacoAcessivel', rotulo: 'Espaço acessível', categoria: 'fisica', sigla: '↔' },
  { chave: 'materiaisTateis', rotulo: 'Materiais táteis', categoria: 'informacional', sigla: '✋' },
  { chave: 'caoGuia', rotulo: 'Permitido cão-guia', categoria: 'especializados', sigla: '🐾' }
];

// Recursos que podem ser solicitados previamente pelo público (item 5.3)
export const RECURSOS_SOLICITACAO = [
  { chave: 'interpreteLibras', rotulo: 'Intérprete de Libras' },
  { chave: 'audiodescricao', rotulo: 'Audiodescrição' },
  { chave: 'espacoCadeiraDeRodas', rotulo: 'Espaço para cadeira de rodas' },
  { chave: 'apoioMobilidade', rotulo: 'Apoio para mobilidade' },
  { chave: 'acompanhamentoEquipe', rotulo: 'Acompanhamento da equipe do teatro' },
  { chave: 'espacoCaoGuia', rotulo: 'Espaço reservado para cão-guia' }
];
