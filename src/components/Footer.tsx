import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterMethods } from '../types/Methods';
import { handleDelete } from '../functions';
import { SetStateAction } from 'react';

interface FooterProps {
  checkCount: (todos: Todo[]) => number;
  setFilter: (string: FilterMethods) => void;
  todos: Todo[];
  filterMethod: FilterMethods;
  renderTodos: React.Dispatch<SetStateAction<Todo[]>>;
  setDeleting: React.Dispatch<React.SetStateAction<number[]>>;
  newError: React.Dispatch<SetStateAction<string | null>>;
  handleFocus: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  checkCount,
  setFilter,
  todos,
  filterMethod,
  renderTodos,
  setDeleting,
  newError,
  handleFocus,
}) => {
  const clearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        handleDelete(todo, setDeleting, renderTodos, newError);
      }
    });
    handleFocus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${checkCount(todos)} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterMethod === FilterMethods.All,
          })}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            setFilter(FilterMethods.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterMethod === FilterMethods.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            setFilter(FilterMethods.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterMethod === FilterMethods.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            setFilter(FilterMethods.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        disabled={todos.every(el => el.completed === false)}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={e => {
          e.preventDefault();
          clearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
