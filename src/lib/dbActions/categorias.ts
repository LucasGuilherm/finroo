import prisma from "../prisma";

export const getCategorias = async () => {
  const categorias = await prisma.categorias.findMany();

  if (!categorias.length) {
    return insereCategoriasPadrao();
  }

  return categorias;
};

const insereCategoriasPadrao = async () => {
  const categorias = await prisma.categorias.createMany({
    data: [
      { id: 1, categoria: "Casa", icon: "Home" },
      { id: 2, categoria: "Educação", icon: "BookOpen" },
      { id: 3, categoria: "Lazer", icon: "Sofa" },
      { id: 4, categoria: "Outros", icon: "MoreHorizontal" },
      { id: 5, categoria: "Online", icon: "ShoppingBag" },
      { id: 6, categoria: "Restaureante", icon: "Soup" },
      { id: 7, categoria: "Saude", icon: "Heart" },
      { id: 8, categoria: "Servico", icon: "Wrench" },
      { id: 9, categoria: "Supermercado", icon: "ShoppingCart" },
      { id: 10, categoria: "Viagem", icon: "Plane" },
    ],
  });
};
