"use client";

import { useEffect, useState } from "react";
import TodoItem from "./_components/todoitem";
import type { ITodo } from "@/types/iTodo";

type FilterType = "all" | "pending" | "completed";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [dueDateValue, setDueDateValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todo_datastorage");
    if (savedTodos) {
      try {
        const parsed: any[] = JSON.parse(savedTodos);
        // เติม id ให้กับรายการเก่าที่อาจจะยังไม่มี id
        const sanitizedTodos: ITodo[] = parsed.map((item, index) => ({
          id: item.id || (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `todo-id-${index}-${Date.now()}`),
          value: item.value || "",
          isCompleted: Boolean(item.isCompleted),
          dueDate: item.dueDate,
        }));
        setTodos(sanitizedTodos);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("todo_datastorage", JSON.stringify(todos));
    }
  }, [todos, isInitialized]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: ITodo = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `todo-${Date.now()}`,
      value: inputValue.trim(),
      isCompleted: false,
      dueDate: dueDateValue || undefined,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
    setDueDateValue("");
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newValue: string, newDueDate?: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, value: newValue, dueDate: newDueDate } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="todo-container">
        <h1 className="todo-header">Todo List By Thiradet</h1>

        {/* ฟอร์มเพิ่มรายการ */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="เพิ่มรายการใหม่ได้ที่นี่..."
            className="input-field flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <input
            type="date"
            className="input-field"
            value={dueDateValue}
            onChange={(e) => setDueDateValue(e.target.value)}
          />
          <button onClick={handleAddTodo} className="btn-primary">
            เพิ่มรายการ
          </button>
        </div>

        {/* แท็บจัดหมวดหมู่สถานะ */}
        <div className="filter-tab-container">
          {(["all", "pending", "completed"] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-tab ${filter === type ? "filter-tab-active" : ""}`}
            >
              {type === "all" && `ทั้งหมด (${todos.length})`}
              {type === "pending" && `ยังไม่ได้ทำ (${todos.filter((t) => !t.isCompleted).length})`}
              {type === "completed" && `ทำแล้ว (${todos.filter((t) => t.isCompleted).length})`}
            </button>
          ))}
        </div>

        {/* แสดงรายการ Todo */}
        <div className="flex flex-col gap-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id || `todo-item-${index}`}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 font-normal">
              ไม่มีรายการในหมวดหมู่นี้
            </div>
          )}
        </div>
      </div>
    </main>
  );
}