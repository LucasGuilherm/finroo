import prisma from "@/lib/prisma";

type alterarTemaProps = {
  userId: number;
  themeColor: string;
};

export const alterarTema = async ({ themeColor, userId }: alterarTemaProps) => {
  const currentTheme = await prisma.settings.findFirst({
    select: {
      id: true,
    },
    where: {
      userId: userId,
    },
  });

  if (!currentTheme?.id) {
    await prisma.settings.create({
      data: {
        colorTheme: themeColor,
        userId: userId,
      },
    });

    return;
  }

  await prisma.settings.update({
    data: {
      colorTheme: themeColor,
    },
    where: {
      userId: userId,
      id: currentTheme?.id,
    },
  });
};
