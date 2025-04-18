import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkdb = async () => {
  const user = await currentUser();

  if (!user || !user.id) redirect("/login");

  const existingUser = await prisma.user.findUnique({
    where: { email: user.emailAddresses[0]?.emailAddress },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        name: user.firstName || "No Name",
        email: user.emailAddresses[0]?.emailAddress || "No Email",
      },
    });
  }

  redirect("/dashboard");
};

export default checkdb;
