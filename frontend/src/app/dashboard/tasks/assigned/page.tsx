"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  ArrowRight,
  Search,
  BarChart3,
  X,
  Flag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const API = "http://localhost:8088/api";


type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface AssignedTask {
  id: number;
  title: string;
  project: string;

  dueDate?: string;
  deadlineLabel: string;

  status: TaskStatus;
  priority: Priority;
  description: string;

  assignees: {
    employeeId: number;
    employeeName: string;
  }[];
}


const formatDate = (date?: string) => {
  if (!date) return "No Due Date";
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const statusLabel = (s: TaskStatus) => {
  switch (s) {
    case "DONE":
      return "Done";
    case "IN_PROGRESS":
      return "In Progress";
    case "IN_REVIEW":
      return "In Review";
    default:
      return "Pending";
  }
};


export default function AssignedTasksPage() {
  const [tasks, setTasks] = useState<AssignedTask[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<AssignedTask | null>(null);
  const [editMode, setEditMode] = useState(false);


  const loadTasks = async () => {
    const [tasksRes, projectsRes] = await Promise.all([
      axios.get(`${API}/tasks`),
      axios.get(`${API}/projects`),
    ]);

    const projectMap: any = {};
    projectsRes.data.forEach((p: any) => (projectMap[p.id] = p.name));

    const enriched: AssignedTask[] = await Promise.all(
      tasksRes.data.map(async (t: any) => {
        const assigneesRes = await axios
          .get(`${API}/task-assignees/${t.id}/details`)
          .catch(() => ({ data: [] }));

        return {
          id: t.id,
          title: t.title,
          project: projectMap[t.projectId],

          dueDate: t.dueDate,
          deadlineLabel: formatDate(t.dueDate),

          status: t.status,
          priority: t.priority,
          description: t.description || "",

          assignees: assigneesRes.data.map((a: any) => ({
            employeeId: a.employeeId,
            employeeName: a.employeeName,
          })),
        };
      })
    );

    setTasks(enriched);
  };

  useEffect(() => {
    loadTasks();
  }, []);


  const saveTask = async () => {
    if (!selectedTask) return;

    await axios.put(`${API}/tasks/${selectedTask.id}`, {
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      priority: selectedTask.priority,
      dueDate: selectedTask.dueDate,
    });

    alert("Task updated successfully");

    setEditMode(false);
    setSelectedTask(null);
    loadTasks();
  };


  const filteredTasks = tasks.filter((t) =>
    `${t.title} ${t.project}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


  return (
    <div className="p-8 text-white min-h-screen">
      <h1 className="text-3xl font-black mb-8">
        Tasks <span className="text-blue-400">Assigned By Me</span>
      </h1>

      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-slate-950/80"
              onClick={() => setSelectedTask(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-2xl bg-slate-900 rounded-3xl p-8"
            >
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-black">
                  {editMode ? (
                    <input
                      value={selectedTask.title}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          title: e.target.value,
                        })
                      }
                      className="bg-slate-800 px-3 py-2 rounded w-full"
                    />
                  ) : (
                    selectedTask.title
                  )}
                </h2>
                <X onClick={() => setSelectedTask(null)} />
              </div>

              <p className="text-slate-400 mb-4">
                Project: <b>{selectedTask.project}</b>
              </p>

              {/* DESCRIPTION */}
              <label className="text-xs text-slate-500 uppercase">
                Description
              </label>
              {editMode ? (
                <textarea
                  rows={4}
                  value={selectedTask.description}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 p-3 rounded mt-1"
                />
              ) : (
                <p className="bg-slate-800/40 p-4 rounded">
                  {selectedTask.description}
                </p>
              )}

              {/* DEADLINE */}
              <div className="mt-6">
                <label className="text-xs text-slate-500 uppercase">
                  Deadline
                </label>
                {editMode ? (
                  <input
                    type="date"
                    value={selectedTask.dueDate || ""}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        dueDate: e.target.value,
                        deadlineLabel: formatDate(e.target.value),
                      })
                    }
                    className="w-full bg-slate-800 p-2 rounded mt-1"
                  />
                ) : (
                  <p className="bg-slate-800/40 p-3 rounded mt-1">
                    {selectedTask.deadlineLabel}
                  </p>
                )}
              </div>

              {/* ASSIGNEES */}
              <div className="mt-6">
                <label className="text-xs text-slate-500 uppercase">
                  Assignees
                </label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedTask.assignees.map((a) => (
                    <div
                      key={a.employeeId}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-sm"
                    >
                      {a.employeeName}
                    </div>
                  ))}
                </div>
              </div>

              {/* STATUS + PRIORITY */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="text-xs text-slate-500 uppercase">
                    Status
                  </label>
                  <select
                    disabled={!editMode}
                    value={selectedTask.status}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        status: e.target.value as TaskStatus,
                      })
                    }
                    className="w-full bg-slate-800 p-2 rounded"
                  >
                    <option value="TODO">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-500 uppercase">
                    Priority
                  </label>
                  <select
                    disabled={!editMode}
                    value={selectedTask.priority}
                    onChange={(e) =>
                      setSelectedTask({
                        ...selectedTask,
                        priority: e.target.value as Priority,
                      })
                    }
                    className="w-full bg-slate-800 p-2 rounded"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => alert("Reminder sent!")}
                  className="bg-slate-800 px-4 py-2 rounded font-bold"
                >
                  Remind Assignee
                </button>

                {editMode ? (
                  <button
                    onClick={saveTask}
                    className="bg-blue-600 px-4 py-2 rounded font-bold"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600 px-4 py-2 rounded font-bold"
                  >
                    Edit Task
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <div className="bg-slate-900/50 rounded-3xl overflow-hidden">
        <div className="p-6 flex justify-between items-center">
          <h2 className="font-bold flex items-center gap-2">
            <BarChart3 /> Delegation Overview
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 pl-9 pr-4 py-2 rounded w-64"
              placeholder="Search tasks..."
            />
          </div>
        </div>

        {filteredTasks.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelectedTask(t)}
            className="p-5 border-t border-slate-800 hover:bg-slate-800/40 cursor-pointer flex justify-between"
          >
            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-xs text-slate-500">{t.project}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{statusLabel(t.status)}</span>
              <ArrowRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
