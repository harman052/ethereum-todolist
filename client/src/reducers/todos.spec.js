import todos from "./todos";

describe("todos reducer", () => {
  it("should handle initial state", () => {
    expect(todos(undefined, {})).toEqual([]);
  });

  it("should handle ADD_TODO", () => {
    expect(
      todos([], {
        type: "ADD_TODO",
        content: "Run the tests",
        id: 0
      })
    ).toEqual([
      {
        content: "Run the tests",
        completed: false,
        id: 0
      }
    ]);

    expect(
      todos(
        [
          {
            content: "Run the tests",
            completed: false,
            id: 0
          }
        ],
        {
          type: "ADD_TODO",
          content: "Use Redux",
          id: 1
        }
      )
    ).toEqual([
      {
        content: "Run the tests",
        completed: false,
        id: 0
      },
      {
        content: "Use Redux",
        completed: false,
        id: 1
      }
    ]);

    expect(
      todos(
        [
          {
            content: "Run the tests",
            completed: false,
            id: 0
          },
          {
            content: "Use Redux",
            completed: false,
            id: 1
          }
        ],
        {
          type: "ADD_TODO",
          content: "Fix the tests",
          id: 2
        }
      )
    ).toEqual([
      {
        content: "Run the tests",
        completed: false,
        id: 0
      },
      {
        content: "Use Redux",
        completed: false,
        id: 1
      },
      {
        content: "Fix the tests",
        completed: false,
        id: 2
      }
    ]);
  });

  it("should handle TOGGLE_TODO", () => {
    expect(
      todos(
        [
          {
            content: "Run the tests",
            completed: false,
            id: 1
          },
          {
            content: "Use Redux",
            completed: false,
            id: 0
          }
        ],
        {
          type: "TOGGLE_TODO",
          id: 1
        }
      )
    ).toEqual([
      {
        content: "Run the tests",
        completed: true,
        id: 1
      },
      {
        content: "Use Redux",
        completed: false,
        id: 0
      }
    ]);
  });
});
