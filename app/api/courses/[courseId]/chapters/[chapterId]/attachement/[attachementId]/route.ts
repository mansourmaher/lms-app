import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { attachementId: string } }) {
    try {
        const attachement = await db.attachment.delete({
            where: {
                id: params.attachementId
            }
        })
        return new NextResponse("attachement deleted", { status: 200 })
    } catch (e) {
        
        return new NextResponse("eroor while deleting attachement")
    }
}