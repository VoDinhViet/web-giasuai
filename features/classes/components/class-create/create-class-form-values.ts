import type { CreateClassInput } from "../../schemas/class.schema"

export const createClassNoneOptionValue = "none"

export const createClassDefaultValues: CreateClassInput = {
  name: "",
  instructorId: "",
  maxStudents: 30,
  meetingUrl: "",
  startDate: "",
  endDate: "",
  startTime: "19:00",
  endTime: "20:30",
  repeatDays: ["MONDAY", "WEDNESDAY"],
  status: "UPCOMING",
  format: "OFFLINE",
  joinPolicy: "REQUEST_APPROVAL",
  waitlistEnabled: true,
  reminderEnabled: true,
  autoCreateSessions: true,
  note: "",
}
