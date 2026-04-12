import { useState } from "react";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import Card from "../../../shared/components/ui/Card";
import { useAddTask } from "../hooks/useAddTask";
import { usePatients } from "../../patient/hooks/usePatients";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("medication");
  const [dueTime, setDueTime] = useState("");
  const [formError, setFormError] = useState("");
  const [patientId, setPatientId] = useState("")
  const { add, loading, error } = useAddTask();

  const {patients} = usePatients()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setFormError("Task title is required.");
      return;
    }

    if (!dueTime) {
      setFormError("Due time is required.");
      return;
    }

    if (!patientId) {
        setFormError ("Please select a a patient");
        return;
    }

    setFormError("");

    await add({
      patientId: (""),
      title,
      type: type as "medication" | "vital-check" | "assessment",
      dueTime,
      completed: false,
    });

    setTitle("");
    setType("medication");
    setPatientId("")
    setDueTime("");
  }

  return (
    <Card title="Add Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Task title
          </label>
          <Input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Task type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          >
            <option value="medication">Medication</option>
            <option value="vital-check">Vital Check</option>
            <option value="assessment">Assessment</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Due time
          </label>
          <Input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
        </div>

        {formError && (
          <p className="text-sm text-red-600">{formError}</p>
        )}

        {error && (
          <p className="text-sm text-red-600">Failed to create task.</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            Save Task
          </Button>
        </div>
      </form>
    </Card>
  );
}