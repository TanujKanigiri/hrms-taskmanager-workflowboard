"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Users,
  Briefcase,
  ArrowLeft,
  Paperclip,
  Check,
} from "lucide-react";
import Link from "next/link";

const API = "http://localhost:8088/api";

type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface Project {
  id: number;
  name: string;
}

interface ProjectMember {
  employeeId: number;
  employeeName: string;
  role: string;
}

export default function CreateTaskPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assigneeId: "",
    priority: "MEDIUM" as Priority,
    dueDate: "",
    files: [] as File[],
  });

  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    if (!formData.projectId) {
      setProjectMembers([]);
      setFormData((p) => ({ ...p, assigneeId: "" }));
      return;
    }

    axios
      .get(`${API}/project-members/project/${formData.projectId}/details`)
      .then((res) => setProjectMembers(res.data))
      .catch(() => setProjectMembers([]));
  }, [formData.projectId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...Array.from(e.target.files!)],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const taskRes = await axios.post(`${API}/tasks`, {
        title: formData.title,
        description: formData.description,
        projectId: Number(formData.projectId),
        priority: formData.priority,
        dueDate: formData.dueDate || null,
      });

      const taskId = taskRes.data.id;

      if (formData.assigneeId) {
        await axios.post(`${API}/task-assignees`, {
          taskId,
          employeeId: Number(formData.assigneeId),
        });
      }

      for (const file of formData.files) {
        const fd = new FormData();
        fd.append("taskId", taskId.toString());
        fd.append("file", file);

        await axios.post(`${API}/task-attachments`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Task Created Successfully");
      window.location.href = "/dashboard/tasks/board";
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/dashboard/tasks/board"
              className="p-2 rounded-lg bg-slate-800"
            >
              <ArrowLeft size={18} />
            </Link>
            <span className="text-sm font-bold text-cyan-500 uppercase">
              New Assignment
            </span>
          </div>
          <h1 className="text-3xl font-black">Create Task</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TITLE */}
          <input
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Task Title"
            className="w-full bg-transparent border-b-2 border-slate-800 py-4 text-3xl font-bold"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* DESCRIPTION */}
            <div className="lg:col-span-2">
              <textarea
                rows={8}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add a detailed description..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4"
              />

              {/* FILE UPLOAD */}
              <label className="block mt-6 border-2 border-dashed border-slate-800 rounded-xl p-6 text-center cursor-pointer">
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
                <Paperclip className="mx-auto mb-2" />
                Upload attachments
              </label>

              {/* SHOW FILE NAMES (FIXED) */}
              {formData.files.length > 0 && (
                <div className="mt-3 space-y-2 text-sm text-slate-300">
                  {formData.files.map((f, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Paperclip size={14} />
                      {f.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* META */}
            <div className="space-y-6">
              {/* PROJECT */}
              <div>
                <label className="text-xs uppercase text-slate-500">
                  Project
                </label>
                <select
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData({ ...formData, projectId: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3"
                >
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ASSIGNEE (FIXED) */}
              <div>
                <label className="text-xs uppercase text-slate-500">
                  Assignee
                </label>
                <select
                  value={formData.assigneeId}
                  onChange={(e) =>
                    setFormData({ ...formData, assigneeId: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3"
                >
                  <option value="">Unassigned</option>
                  {projectMembers.map((m) => (
                    <option key={m.employeeId} value={m.employeeId}>
                      {m.employeeName} ({m.role})
                    </option>
                  ))}
                </select>
              </div>
              
              {/* DUE DATE */}
              <input
                type="date"
                value={formData.dueDate}
                min={new Date().toISOString().split("T")[0]} 
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3"
              />

              {/* PRIORITY */}
              <div className="grid grid-cols-2 gap-2">
                {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, priority: p as Priority })
                    }
                    className={`py-2 rounded-lg border ${
                      formData.priority === p
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                        : "border-slate-800 text-slate-400"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
            <Link href="/dashboard/tasks/board">Cancel</Link>
            <button
              disabled={isSubmitting}
              className="px-8 py-3 bg-cyan-600 rounded-xl flex items-center gap-2"
            >
              <Check size={18} /> Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
