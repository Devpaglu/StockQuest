import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function POST(req: Request) {
  const payload = await req.json();
  const headersList = headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: any;

  try {
    const svixId = (await headersList).get("svix-id")!;
    const svixTimestamp = (await headersList).get("svix-timestamp")!;
    const svixSignature = (await headersList).get("svix-signature")!;

    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const user = data;

    // Save to database
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.email_addresses[0]?.email_address,
        name: user.first_name + " " + user.last_name,
      },
    });
  }

  return NextResponse.json({ success: true });
}
