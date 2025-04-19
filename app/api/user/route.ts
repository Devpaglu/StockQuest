import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; // if using Clerk

import { prisma } from '@/lib/prisma'
export const GET = async (req: Request) => {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId
    },
    include: {
      portfolio: true,
      trades: true
    }
  });

  return NextResponse.json(user);
};
