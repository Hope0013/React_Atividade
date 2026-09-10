// Lista usada como ponto de partida da loja, caso não haja produtos salvos
// ainda no localStorage nem seja possível conectar à API
export const produtosIniciais = [
  {
    id: 1,
    nome: "Fone de Ouvido Bluetooth",
    preco: 189.9,
    categoria: "eletronicos",
    descricao: "Fone sem fio com cancelamento de ruído e 20h de bateria",
    imagem: "https://picsum.photos/seed/fone/400/300",
    destaque: true,
    emOferta: false,
    precoOriginal: null,
    estoque: 12,
    favorito: false
  },
  {
    id: 2,
    nome: "Camiseta Básica Algodão",
    preco: 49.9,
    categoria: "roupas",
    descricao: "Camiseta 100% algodão, confortável para o dia a dia",
    imagem: "https://picsum.photos/seed/camiseta/400/300",
    destaque: false,
    emOferta: true,
    precoOriginal: 69.9,
    estoque: 30,
    favorito: false
  },
  {
    id: 3,
    nome: "Relógio de Pulso Minimalista",
    preco: 259.0,
    categoria: "acessorios",
    descricao: "Relógio com pulseira de couro sintético e visor analógico",
    imagem: "https://picsum.photos/seed/relogio/400/300",
    destaque: true,
    emOferta: false,
    precoOriginal: null,
    estoque: 8,
    favorito: false
  },
  {
    id: 4,
    nome: "Luminária de Mesa LED",
    preco: 99.9,
    categoria: "casa",
    descricao: "Luminária regulável com três tons de luz, ideal para escritório",
    imagem: "https://picsum.photos/seed/luminaria/400/300",
    destaque: false,
    emOferta: false,
    precoOriginal: null,
    estoque: 0,
    favorito: false
  },
  {
    id: 5,
    nome: "Mochila Notebook Impermeável",
    preco: 179.9,
    categoria: "acessorios",
    descricao: "Mochila com compartimento acolchoado para notebook até 15 polegadas",
    imagem: "https://picsum.photos/seed/mochila/400/300",
    destaque: false,
    emOferta: true,
    precoOriginal: 219.9,
    estoque: 15,
    favorito: false
  }
];
