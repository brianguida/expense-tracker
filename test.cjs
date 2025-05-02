const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    //create a test expense
    const newExpense = await prisma.expense.create({
        data: {
            title: 'Utilities',
            amount: 100,
            date: new Date(),
            category: 'Utilities',
            paymentMethod: 'Card',
        },
    });
    console.log(newExpense);

    const expenses = await prisma.expense.findMany();
    console.log(expenses);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });