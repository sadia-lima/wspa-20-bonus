import type { Category, NewCategory } from "../types/category";
import { CategoryListItem } from "./CategoryListItem";

type CategoryListProps = {
	categories: Category[];
	// Passed straight through to each row; CategoryList itself holds no
	// state and makes no decisions about editing.
	onUpdate: (id: string, category: NewCategory) => void;
	onDelete: (id: string) => void;
};

export function CategoryList({
	categories,
	onUpdate,
	onDelete,
}: CategoryListProps) {
	return (
		<ul>
			{categories.map((category) => (
				<CategoryListItem
					key={category.id}
					category={category}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
}
