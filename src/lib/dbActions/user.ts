import prisma from "@/lib/prisma";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};

// export const findUserByUsername = async (username: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { username },
//     });

//     return user;
//   } catch (error) {
//     return null;
//   }
// };

export const createNewUser = async ({
  // username,
  email,
  password,
}: {
  // username: string;
  email: string;
  password: string;
}) => {
  const newUser = await prisma.user.create({
    data: {
      // username,
      email,
      password,
    },
  });

  return newUser;
};
