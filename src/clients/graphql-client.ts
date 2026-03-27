type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as GraphQLResponse<T>;
  if (!res.ok || json.errors?.length) {
    throw new Error(json.errors?.map((e) => e.message).join("; ") || `HTTP ${res.status}`);
  }
  if (!json.data) throw new Error("No data returned");
  return json.data;
}

async function main() {
  // 1) Create a todo
  const created = await gql<{
    addTodo: { id: string; title: string; completed: boolean; tags: string[] };
  }>(
    `
      mutation AddTodo($title: String!, $tags: [String!]!) {
        addTodo(title: $title, tags: $tags) {
          id
          title
          completed
          tags
        }
      }
    `,
    { title: "Learn GraphQL", tags: ["study", "api"] }
  );

  console.log("Created:", created.addTodo);

  const id = created.addTodo.id;

  // 2) Toggle completed
  const toggled = await gql<{
    toggleTodo: { id: string; completed: boolean };
  }>(
    `
      mutation Toggle($id: ID!) {
        toggleTodo(id: $id) {
          id
          completed
        }
      }
    `,
    { id }
  );

  console.log("Toggled:", toggled.toggleTodo);

  // 3) Update title/tags
  const updated = await gql<{
    updateTodo: { id: string; title: string; tags: string[]; completed: boolean };
  }>(
    `
      mutation Update($id: ID!, $input: UpdateTodoInput!) {
        updateTodo(id: $id, input: $input) {
          id
          title
          completed
          tags
        }
      }
    `,
    { id, input: { title: "Learn GraphQL deeply", tags: ["study", "graphql"] } }
  );

  console.log("Updated:", updated.updateTodo);

  // 4) Read single + list
  const single = await gql<{ getTodo: { id: string; title: string } | null }>(
    `
      query GetTodo($id: ID!) {
        getTodo(id: $id) {
          id
          title
        }
      }
    `,
    { id }
  );
  console.log("GetTodo:", single.getTodo);

  const list = await gql<{ getTodos: Array<{ id: string; title: string; completed: boolean }> }>(`
    query GetTodos {
      getTodos {
        id
        title
        completed
      }
    }
  `);
  console.log("GetTodos:", list.getTodos.slice(0, 5));

  // 5) Delete
  const deleted = await gql<{ deleteTodo: boolean }>(
    `
      mutation Delete($id: ID!) {
        deleteTodo(id: $id)
      }
    `,
    { id }
  );
  console.log("Deleted:", deleted.deleteTodo);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

