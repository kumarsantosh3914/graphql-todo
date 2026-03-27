import TodoRepository from "../repositories/todo.repository";
import TodoService from "../services/todo.service";

const todoService = new TodoService(new TodoRepository());

const resolvers = {
    Query: {
        getTodos: async () => {
            return await todoService.getAll();
        },
        getTodo: async (_: any, { id }: { id: string }) => {
            return await todoService.getById(id);
        },
    },
    Mutation: {
        addTodo: async (_: any, { title, tags }: { title: string; tags: string[] }) => {
            return await todoService.create(title, tags);
        },
        updateTodo: async (
            _: any,
            { id, input }: { id: string; input: { title?: string; completed?: boolean; tags?: string[] } }
        ) => {
            return await todoService.updateById(id, input);
        },
        toggleTodo: async (_: any, { id }: { id: string }) => {
            return await todoService.toggleById(id);
        },
        deleteTodo: async (_: any, { id }: { id: string }) => {
            return await todoService.deleteById(id);
        },
    }
}

export default resolvers;