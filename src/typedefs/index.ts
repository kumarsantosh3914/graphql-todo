import { gql } from 'apollo-server';

const typeDefs = gql`

    type Todo {
        id: ID!,
        title: String!,
        completed: Boolean!,
        tags: [String]!
    }

    input UpdateTodoInput {
        title: String
        completed: Boolean
        tags: [String!]
    }

    type Query {
        getTodos: [Todo]!
        getTodo(id: ID!): Todo
    }

    type Mutation {
        addTodo(title: String!, tags: [String]!) : Todo
        updateTodo(id: ID!, input: UpdateTodoInput!): Todo
        toggleTodo(id: ID!): Todo
        deleteTodo(id: ID!): Boolean!
    }

`;


export default typeDefs;