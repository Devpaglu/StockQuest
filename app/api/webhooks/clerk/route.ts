import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const payload = await req.json();
  const headersList = headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: any;

  try {
    const headerList = await headersList;
    const svixId = headerList.get("svix-id")!;
    const svixTimestamp = headerList.get("svix-timestamp")!;
    const svixSignature = headerList.get("svix-signature")!;

    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const { type, data: user } = evt;

  try{
    console.log("trying to store user to db")
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.email_addresses?.[0]?.email_address ?? "",
        name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        portfolio: {
          create: {
            value: 0,
            change: 0,
          },
        },
      },
    });
  }
  catch(err){
    console.log(err);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
