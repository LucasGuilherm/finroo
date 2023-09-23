import { createNewUser, findUserByEmail } from "@/lib/dbActions/user";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userValidationSchema = z.object({
  // username: z
  //   .string()
  //   .min(3, "Nome deve ter pelo menos 3 characteres")
  //   .max(70, "Nome deve ter no máximo 70 characteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 characteres")
    .max(70),
});

export const POST = async (resp: Request) => {
  try {
    const body = await resp.json();
    const { email, password } = userValidationSchema.parse(body);

    const userExistsEmail = await findUserByEmail(email);

    if (userExistsEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Email already in use",
        },
        { status: 409 }
      );
    }

    // const userExistsUser = await findUserByUsername(username);

    // if (userExistsUser) {
    //   return NextResponse.json(
    //     {
    //       user: null,
    //       message: "Username already in use",
    //     },
    //     { status: 409 }
    //   );
    // }

    const hashedPassword = await hash(password, 10);

    const newUser = await createNewUser({
      email: email,
      password: hashedPassword,
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, try again!" },
      { status: 500 }
    );
  }
};
