"use server"


export async function getReportById(id:string)
{
    try{
        const report = await prisma.report.findUnique({
            where:{
                id:id
            },
            select:{
                grade:true,
                note:true,
            }
        })
        return report

    }catch(e){
        console.log(e)
    }
}