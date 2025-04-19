import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { prisma } from '@/lib/prisma'

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
        portfolio:{
            create:{
                value:0,
                change:0
            }
        }
      },
    });
  }

  redirect("/dashboard");
};

export default checkdb;
