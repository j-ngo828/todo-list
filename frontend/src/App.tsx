import Header from '@/components/Header';
import TodoControl from '@/components/TodoControl';
import TodoItems from '@/components/TodoItems';
import todoService from '@/services/todoService';
import { TODO_TAB_FILTER } from '@/utils/constants';
import { ITodoItem } from '@/utils/interfaces';
import { useEffect, useState } from 'react';

function App() {
  const [todoFilter, setTodoFilter] = useState<string>(TODO_TAB_FILTER.SHOW_ALL.eventKey);
  const [todoItems, setTodoItems] = useState<ITodoItem[]>([]);

  useEffect(() => {
    const fetchTodoItems = async () => {
      const response = await todoService.getAllTodos();
      setTodoItems(response.data);
    };
    fetchTodoItems();
  }, []);

  const handleTodoIsCompleteChange = async (id: string) => {
    const todoItem = todoItems.find((todoItem) => todoItem.id === id);
    if (!todoItem) return;
    const payload = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted,
    };
    const response = await todoService.updateTodo(id, payload);
    setTodoItems(todoItems.map((todoItem) => (todoItem.id === id ? response.data : todoItem)));
  };
  return (
    <>
      <Header />
      <TodoControl handleTodoFilterChange={(filter) => setTodoFilter(filter)} />
      <TodoItems todoItems={todoItems} handleTodoIsCompleteChange={handleTodoIsCompleteChange} />
    </>
  );
}

export default App;
