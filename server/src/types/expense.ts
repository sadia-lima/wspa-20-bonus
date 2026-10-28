export interface Expense {
	id: string;
	description: string;
	amount: number;
	date: string;
}

export type NewExpense = Omit<Expense, "id">;
