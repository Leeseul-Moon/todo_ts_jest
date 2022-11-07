import TodoPresenter from '../components/todoList/todo_presenter';
import { TodoItem } from '../models/todo';

export {};

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

  //   it('todo 완료', () => {
  //     presenter.add(todos[0], update);

  //     expect(presenter.getTodos()[0].status).toBe('completed');
  //     checkUpdateIsCalled();
  //   });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getTodos());
  }
});
