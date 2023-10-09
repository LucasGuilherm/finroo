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

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import IsLoading from "./components/isLoading";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/fetchWrap";

type formType = {
  email: string;
  password: string;
  passwordConfirmation?: string;
};

const postNewAccount = async (accountInfo: formType) => {
  const data = await fetchApi(`/user`, {
    method: "POST",
    body: JSON.stringify(accountInfo),
  });

  return await data;
};

const loginSchema: z.ZodType<formType> = z
  .object({
    email: z.string().min(1).email("Email invádido"),
    password: z.string().min(8).max(70),
    passwordConfirmation: z.string().min(8).max(70),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas devem ser iguais",
    path: ["passwordConfirmation"],
  });

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: formType) => postNewAccount(data),
    onSuccess: () => {
      router.replace("/signIn");
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleLogin = (data: formType) => {
    mutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <>
      <Image src={Logo} alt="Logo" className="px-16 flex-[.5]" />

      {mutation.isLoading ? (
        <IsLoading />
      ) : (
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
              className={cn(
                `text-lg ${errors.password ? "border-red-500" : ""}`
              )}
              {...register("password")}
            ></Input>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="senhaConf" className="text-lg font-medium">
              Confirmar senha
            </Label>
            <Input
              id="senhaConf"
              type="password"
              className={cn(
                `text-lg ${errors.password ? "border-red-500" : ""}`
              )}
              {...register("passwordConfirmation")}
            ></Input>
          </div>

          <Button type="submit" className="mt-3">
            Criar conta
          </Button>

          <Separator className="my-3" />

          <Link href={"/signIn"}>
            <Button variant={"secondary"} className="w-full">
              Entrar
            </Button>
          </Link>
        </form>
      )}
    </>
  );
};

export default SignUp;
