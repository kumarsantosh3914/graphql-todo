import Todo from "../models/todo";
import ITodo from "../types/ITodo";

class TodoRepository {
    async getAll(): Promise<ITodo[]> {
        return await Todo.find();
    }

    async getById(id: string): Promise<ITodo | null> {
        return await Todo.findById(id);
    }

    async create(title: string, tags: string[]): Promise<ITodo> {
        return await Todo.create({
            title,
            tags,
            completed: false
        });
    }

    async updateById(
        id: string,
        update: Partial<Pick<ITodo, "title" | "completed" | "tags">>
    ): Promise<ITodo | null> {
        return await Todo.findByIdAndUpdate(id, update, { new: true });
    }

    async deleteById(id: string): Promise<boolean> {
        const res = await Todo.findByIdAndDelete(id);
        return !!res;
    }
}

export default TodoRepository;