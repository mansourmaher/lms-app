import { auth } from "@/auth";

import { redirect } from "next/navigation";
import SingleAcceuilPage from "./_components/single-acceuilPage";

export default async function Home() {
  const user = await auth();

  if (!user) {
    redirect("/sign-in");
  }

  return <SingleAcceuilPage />;
}
