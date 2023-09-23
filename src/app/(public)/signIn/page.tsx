"use client";

import Image from "next/image";
import Logo from "../../../../public/assets/Logo.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

type formType = {
  email: string;
  password: string;
};

const loginSchema: z.ZodType<formType> = z.object({
  email: z.string().min(1).email("Email invádido"),
  password: z.string().min(8).max(70),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: formType) => {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    console.log(signInData);
  };

  return (
    <>
      <Image src={Logo} alt="Logo" className="px-16 flex-[.5]" />

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full gap-4 flex flex-col flex-1 px-6"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-lg font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className="text-lg"
            {...register("email")}
          ></Input>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="senha" className="text-lg font-medium">
            Senha
          </Label>
          <Input
            id="senha"
            type="password"
            className={cn(`text-lg ${errors.password ? "border-red-500" : ""}`)}
            {...register("password")}
          ></Input>
        </div>

        <Button type="submit" className="mt-3">
          Entrar
        </Button>

        <Separator className="my-3" />

        <Link href={"/signUp"}>
          <Button variant={"secondary"} className="w-full">
            Criar Conta
          </Button>
        </Link>
      </form>
      <Link href={"/forgotPassword"} className="my-auto flex-[.2]">
        Esqueci minha senha
      </Link>
    </>
  );
};

export default SignIn;