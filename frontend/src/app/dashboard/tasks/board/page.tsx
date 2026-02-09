"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MoreHorizontal,
  Plus,
  MessageSquare,
  Paperclip,
  Clock,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface BoardTask {
  id: number;
  title: string;
  project: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  comments: number;
  attachments: number;
}

interface TaskDetails {
  id: number;
  title: string;
  description: string;
  project: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
}

interface TaskComment {
  id: number;
  userId: number;
  comment: string;
}
interface TaskAttachment {
  id: number;
  fileName: string;
  filePath: string;
}


const API = "http://localhost:8088/api";

const columns = [
  { id: "TODO", label: "To Do" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "IN_REVIEW", label: "In Review" },
  { id: "DONE", label: "Completed" },
] as const;


const getPriorityColor = (p: Priority) => {
  switch (p) {
    case "CRITICAL":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "HIGH":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "MEDIUM":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    case "LOW":
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};

const getStatusDot = (s: TaskStatus) => {
  switch (s) {
    case "TODO":
      return "bg-slate-400";
    case "IN_PROGRESS":
      return "bg-blue-500";
    case "IN_REVIEW":
      return "bg-amber-500";
    case "DONE":
      return "bg-emerald-500";
  }
};

const formatDueDate = (date?: string) => {
  if (!date) return "No Due Date";

  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


export default function TaskBoardPage() {
  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [attachmentsCount, setAttachmentsCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);


  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    const [tasksRes, projectsRes] = await Promise.all([
      axios.get(`${API}/tasks`),
      axios.get(`${API}/projects`),
    ]);

    const projectMap: any = {};
    projectsRes.data.forEach((p: any) => (projectMap[p.id] = p.name));

    const board: BoardTask[] = await Promise.all(
      tasksRes.data.map(async (t: any) => {
        const [c, a] = await Promise.all([
          axios.get(`${API}/task-comments/${t.id}`).catch(() => ({ data: [] })),
          axios
            .get(`${API}/task-attachments/${t.id}`)
            .catch(() => ({ data: [] })),
        ]);

        return {
          id: t.id,
          title: t.title,
          project: projectMap[t.projectId],
          priority: t.priority,
          status: t.status,
          dueDate: formatDueDate(t.dueDate),
          comments: c.data.length,
          attachments: a.data.length,
        };
      }),
    );

    setTasks(board);
  };


  useEffect(() => {
    if (!selectedTaskId) return;

    const loadDetails = async () => {
      const [t, ass, c, a, p] = await Promise.all([
        axios.get(`${API}/tasks/${selectedTaskId}`),
        axios.get(`${API}/task-assignees/${selectedTaskId}/details`),
        axios.get(`${API}/task-comments/${selectedTaskId}`),
        axios.get(`${API}/task-attachments/${selectedTaskId}`),
        axios.get(`${API}/projects`),
      ]);

      const projectMap: any = {};
      p.data.forEach((x: any) => (projectMap[x.id] = x.name));

      setTaskDetails({
        id: t.data.id,
        title: t.data.title,
        description: t.data.description || "No description provided.",
        project: projectMap[t.data.projectId],
        priority: t.data.priority,
        status: t.data.status,
        dueDate: formatDueDate(t.data.dueDate),
      });

      setAssignees(ass.data.map((x: any) => x.employeeName));

      setComments(c.data);
      setAttachments(a.data); 
      setAttachmentsCount(a.data.length);
    };

    loadDetails();
  }, [selectedTaskId]);

  const closeModal = () => {
    setSelectedTaskId(null);
    setTaskDetails(null);
    setSelectedFiles([]);
  };


  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col pt-2 text-white overflow-hidden">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-3xl font-black bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Workflow Board
        </h1>

        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 pl-10 pr-4 py-2 rounded-xl w-64"
            />
          </div>

          <Link
            href="/dashboard/tasks/create"
            className="px-4 py-2 bg-violet-600 rounded-xl font-bold"
          >
            + New Task
          </Link>
        </div>
      </div>

      {/* WORKFLOW BOARD */}
      <div className="flex-1 overflow-x-auto px-4 pb-4">
        <div className="flex gap-6 min-w-[1200px]">
          {columns.map((col) => {
            const colTasks = tasks.filter(
              (t) =>
                t.status === col.id &&
                (t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.project.toLowerCase().includes(searchTerm.toLowerCase())),
            );

            return (
              <div
                key={col.id}
                className="w-80 rounded-3xl bg-[#0F1623]/50 border border-slate-800"
              >
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusDot(col.id)}`}
                    />
                    <h3 className="font-bold">{col.label}</h3>
                    <span className="text-xs bg-slate-800 px-2 rounded">
                      {colTasks.length}
                    </span>
                  </div>
                  <Plus size={16} className="text-slate-400" />
                </div>

                <div className="p-3 space-y-3">
                  {colTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layoutId={task.id.toString()}
                      onClick={() => setSelectedTaskId(task.id)}
                      className="bg-[#1B2435] hover:bg-[#232D42] p-4 rounded-2xl border border-slate-800 cursor-pointer"
                    >
                      <div className="flex justify-between mb-2">
                        <span
                          className={`text-[10px] px-2 py-1 border rounded ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>
                        <MoreHorizontal size={16} />
                      </div>

                      <h4 className="font-bold text-sm">{task.title}</h4>
                      <p className="text-xs text-slate-500">{task.project}</p>

                      <div className="flex justify-between mt-3 text-xs text-slate-400">
                        <div className="flex gap-2">
                          <MessageSquare size={12} /> {task.comments}
                          <Paperclip size={12} /> {task.attachments}
                        </div>
                        <div className="flex gap-1">
                          <Clock size={12} /> {task.dueDate}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TASK MODAL */}
      <AnimatePresence>
        {taskDetails && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              className="bg-[#1B2435] rounded-3xl w-full max-w-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between mb-4">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-lg border ${getPriorityColor(taskDetails.priority)}`}
                >
                  {taskDetails.priority} PRIORITY
                </span>
                <X className="cursor-pointer" onClick={closeModal} />
              </div>

              <h2 className="text-2xl font-black">{taskDetails.title}</h2>
              <p className="text-slate-400 mt-2">
                • DueDate - {taskDetails.dueDate} • {taskDetails.project}
              </p>

              <div className="mt-6">
                <h3 className="text-xs uppercase text-slate-500 mb-2">
                  Description
                </h3>
                <p className="text-slate-300">{taskDetails.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs uppercase text-slate-500 mb-2">
                    Status
                  </h3>
                  <div className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-xl">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusDot(taskDetails.status)}`}
                    />
                    <span className="font-bold">
                      {columns.find((c) => c.id === taskDetails.status)?.label}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase text-slate-500 mb-2">
                    Assignees
                  </h3>
                  <div className="flex gap-2">
                    {assignees.map((a, i) => (
                      <div
                        key={i}
                        className="w-19 h-19 box-xl bg-slate-700 flex items-center justify-center font-bold"
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4">
                <h3 className="text-xs uppercase text-slate-500 mb-3">
                  {comments.length} Comments
                </h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-slate-900/50 p-3 rounded-xl">
                      <p className="text-sm">{c.comment}</p>
                      <span className="text-xs text-slate-500">
                        EMP{c.userId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4">
                <h3 className="text-xs uppercase text-slate-500 mb-3">
                  {attachments.length} Attachments
                </h3>

                {attachments.length === 0 && (
                  <p className="text-sm text-slate-500">No attachments</p>
                )}

                <div className="space-y-2">
                  {attachments.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <Paperclip size={14} />
                      <span>{a.fileName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
