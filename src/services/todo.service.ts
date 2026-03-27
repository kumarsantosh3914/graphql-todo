import TodoRepository from "../repositories/todo.repository";

type UpdateTodoInput = {
    title?: string;
    completed?: boolean;
    tags?: string[];
};

class TodoService {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository;
    }

    async getAll() {
        return await this.todoRepository.getAll();
    }

    async getById(id: string) {
        return await this.todoRepository.getById(id);
    }

    async create(title: string, tags: string[]) {
        return await this.todoRepository.create(title, tags);
    }

    async updateById(id: string, input: UpdateTodoInput) {
        return await this.todoRepository.updateById(id, input);
    }

    async toggleById(id: string) {
        const todo = await this.todoRepository.getById(id);
        if (!todo) return null;
        return await this.todoRepository.updateById(id, { completed: !todo.completed });
    }

    async deleteById(id: string) {
        return await this.todoRepository.deleteById(id);
    }
}

export default TodoService;