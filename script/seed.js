const {PrismaClient} = require('@prisma/client')

const db=new PrismaClient()

async function main() {

   try{
        await db.category.createMany({
            data:[
                {name:"Computer Science"},
                {name:"Mathematics"},
                {name:"Physics"},
                {name:"Chemistry"},
                {name:"Biology"},
                {name:"Economics"},
                {name:"Business"},
                {name:"Psychology"},
                {name:"History"},
            ]
        })
        console.log("Categories created successfully")

    }catch(e){
        console.log(e)
    }finally{
        db.$disconnect()
    }
}
main() 