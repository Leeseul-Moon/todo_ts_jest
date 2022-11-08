## 프로젝트 목표

- TypeScript 로 간단한 ToDo List 구현.
- Jest 라이브러리를 활용한 Test 작성
- Github Action 으로 CI/CD 구축
  <br /><br />

## 구현 기능

- ToDo CRUD (수정은 안되고 완료 여부 update)
- 다크 모드
- 데이터를 로컬 스토리지에 저장
- ToDo CRUD Unit Test
  <br /><br />

## 기능별 코드

- ToDo CRUD : test 를 위해 로직을 컴포넌트와 분리하여 작성.

```typescript
export default class TodoPresenter {
  todos: TodoItem[];

  constructor(todos: TodoItem[]) {
    this.todos = todos;
  }

  setTodos(todos: TodoItem[]) {
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }

  add(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    this.todos = [...this.todos, todo];
    update(this.todos);
  }

  check(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    this.todos = this.todos.map((t: TodoItem) => (t.id === todo.id ? todo : t));
    update(this.todos);
  }

  remove(todo: TodoItem, update: Dispatch<SetStateAction<TodoItem[]>>) {
    this.todos = this.todos.filter((t: TodoItem) => t.id !== todo.id);
    update(this.todos);
  }
}
```

- 다크 모드 : 사용자가 설정한 시스템 옵션에 따라 [다크/라이트] 모드를 설정하여 보여 줍니다. 전역적으로 관리하기 위해 Context 를 사용했습니다.

```typescript
const initialState = {
  darkMode: false,
  toggleDarkMode: () => {},
};

const DarkModeContext = createContext(initialState);

interface Props {
  children: React.ReactElement;
}

export function DarkModeProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}
export const useDarkMode = () => useContext(DarkModeContext);
```

- 데이터를 로컬 스토리지에 저장 : todo 가 변경될 경우 로컬스토리지에 저장해주고 저장한 데이터를 분리한 로직의 setTodos 를 통해 로직도 최신 값을 가지도록 업데이트 합니다. 업데이트 하지 않으면, app.tsx 에서 주입한 초기 값을 기준으로 todo 가 추가되기 때문입니다.

```typescript
// TodoList.tsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
  presenter.setTodos(readTodosFromLocalStorage());
}, [todos, presenter]);

export function readTodosFromLocalStorage(): TodoItem[] {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

// app.tsx 에서 초기 값을 주입.
const presenter = new TodoPresenter(readTodosFromLocalStorage());
```

- ToDo CRUD Unit Test : 반복되는 부분은 따로 함수로 빼서 중복코드를 최소화 했습니다.

```typescript
describe('todoPresenter', () => {
  const todos: TodoItem[] = [
    { id: '1', text: '인강 보기', status: 'active' },
    { id: '2', text: '산책 하기', status: 'active' },
  ];

  let presenter: TodoPresenter;
  let update: () => void;

  beforeEach(() => {
    presenter = new TodoPresenter(todos);
    update = jest.fn();
  });

  it('todo 가져오기', () => {
    expect(presenter.getTodos()).toEqual(todos);
  });

  it('todo 삭제', () => {
    presenter.remove(todos[0], update);

    expect(presenter.getTodos().length).toBe(1);
    expect(presenter.getTodos()[0].id).toBe('2');
    checkUpdateIsCalled();
  });

  it('todo 추가', () => {
    presenter.add({ id: '3', text: '달리기', status: 'active' }, update);

    expect(presenter.getTodos().length).toBe(3);
    expect(presenter.getTodos()[2].id).toBe('3');
    checkUpdateIsCalled();
  });

  it('todo 완료', () => {
    presenter.check(todos[0], update);
    presenter.getTodos()[0].status = 'completed';

    expect(presenter.getTodos()[0].status).toBe('completed');
    checkUpdateIsCalled();
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getTodos());
  }
});
```
