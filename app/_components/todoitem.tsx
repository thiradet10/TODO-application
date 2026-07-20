"use client";

import { useState } from "react";
import type { ITodo } from "@/types/iTodo";

interface TodoItemProps {
  todo: ITodo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newValue: string, newDueDate?: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.value);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue.trim(), editDueDate || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.value);
    setEditDueDate(todo.dueDate || "");
    setIsEditing(false);
  };

  return (
    <div className={`todo-card ${todo.isCompleted ? "todo-card-completed" : ""}`}>
      {isEditing ? (
        /* โหมดแก้ไข */
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          <input
            type="text"
            className="input-field flex-1"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <input
            type="date"
            className="input-field"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button onClick={handleSave} className="btn-success">
              บันทึก
            </button>
            <button onClick={handleCancel} className="btn-secondary">
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        /* โหมดแสดงผล */
        <>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onToggle(todo.id)}
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
            />
            <div className="flex flex-col truncate">
              <span className={`todo-text ${todo.isCompleted ? "todo-text-completed" : ""}`}>
                {todo.value}
              </span>
              {todo.dueDate && (
                <span className="todo-date">
                  📅 กำหนดส่ง: {todo.dueDate}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-center">
            <button onClick={() => setIsEditing(true)} className="btn-action-edit">
              แก้ไข
            </button>
            <button onClick={() => onDelete(todo.id)} className="btn-action-delete">
              ลบ
            </button>
          </div>
        </>
      )}
    </div>
  );
}