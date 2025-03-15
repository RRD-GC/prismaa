import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient ()

async function main() {

const userWithPost = await prisma.user.findMany({
    include: {
        post: true
    }
});

console.dir(userWithPost, {depth:null});

return;

    const user = await prisma.user.create({
        data: {
            email: "test@gmail.com",
            name: "Juan Dela Crut",
            age: 26,
            post: {
                create: [
                    {
                        title: "test1",
                        content:"test2asd"
                    },
                    {
                        title: "test2",
                        content:"test2asd"
                    }
                ]
            }
            
        }
    })

    console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })