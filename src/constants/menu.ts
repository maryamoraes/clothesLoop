// Só a Loja tem rota; os outros ficam estáticos (rota: null)
export const MENU = [
  { nome: 'Loja', icone: '🏠', rota: '/cadastro' },
  { nome: 'Vendas', icone: '📈', rota: null },
  { nome: 'Financeiro', icone: '💲', rota: null },
  { nome: 'Estoque', icone: '📦', rota: null },
] as const;