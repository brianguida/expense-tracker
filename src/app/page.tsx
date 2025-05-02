import Table from "./_components/table";
import AddExpenseBtn from "./_components/AddExpenseBtn";
import { api as trpc } from "../trpc/react";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <AddExpenseBtn />
        </div>
        <div className="flex justify-center">
          <Table />
        </div>
      </div>

    </main>
  );
}