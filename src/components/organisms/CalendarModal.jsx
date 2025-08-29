import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const CalendarModal = ({ 
  event = null, 
  courses = [],
  userRole = "user",
  onSave, 
  onDelete, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    type: "event",
    courseId: "",
    location: "",
    isRecurring: false,
    recurringType: "weekly"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate || event.startDate);
      
      setFormData({
        title: event.title || "",
        description: event.description || "",
        startDate: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().slice(0, 5),
        endDate: endDate.toISOString().split('T')[0],
        endTime: endDate.toTimeString().slice(0, 5),
        type: event.type || "event",
        courseId: event.courseId?.toString() || "",
        location: event.location || "",
        isRecurring: event.isRecurring || false,
        recurringType: event.recurringType || "weekly"
      });
    } else {
      // Set default times
      const now = new Date();
      const startTime = now.toTimeString().slice(0, 5);
      const endTime = new Date(now.getTime() + 60*60*1000).toTimeString().slice(0, 5);
      
      setFormData(prev => ({
        ...prev,
        startDate: now.toISOString().split('T')[0],
        endDate: now.toISOString().split('T')[0],
        startTime,
        endTime
      }));
    }
  }, [event]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    
    if (formData.startDate === formData.endDate && formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "End time must be after start time";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate || formData.startDate}T${formData.endTime || formData.startTime}`);
      
      const eventData = {
        title: formData.title,
        description: formData.description,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        type: formData.type,
        courseId: formData.courseId ? parseInt(formData.courseId) : null,
        location: formData.location,
        isRecurring: formData.isRecurring,
        recurringType: formData.isRecurring ? formData.recurringType : null
      };
      
      await onSave(eventData);
    } catch (err) {
      toast.error("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    setLoading(true);
    try {
      await onDelete();
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: "event", label: "Event" },
    { value: "meeting", label: "Meeting" },
    { value: "deadline", label: "Deadline" },
    { value: "reminder", label: "Reminder" }
  ];

  const courseOptions = [
    { value: "", label: "No course" },
    ...courses.map(course => ({
      value: course.Id.toString(),
      label: course.title
    }))
  ];

  const recurringOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {event ? "Edit Event" : "Create Event"}
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              icon="X"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  error={errors.title}
                  placeholder="Enter event title..."
                  required
                />
              </div>

              <Select
                label="Event Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={typeOptions}
                required
              />

              <Select
                label="Course (Optional)"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                options={courseOptions}
              />

              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                error={errors.startDate}
                required
              />

              <Input
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                error={errors.startTime}
                required
              />

              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                error={errors.endDate}
              />

              <Input
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                error={errors.endTime}
              />

              <div className="md:col-span-2">
                <Input
                  label="Location (Optional)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  className="input-field w-full resize-none"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter event description..."
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary/20 focus:ring-2"
                  />
                  <label htmlFor="isRecurring" className="text-sm text-gray-300">
                    Recurring Event
                  </label>
                </div>
              </div>

              {formData.isRecurring && (
                <Select
                  label="Recurring Type"
                  value={formData.recurringType}
                  onChange={(e) => setFormData({ ...formData, recurringType: e.target.value })}
                  options={recurringOptions}
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                {event && userRole !== "user" && onDelete && (
                  <Button
                    type="button"
                    onClick={handleDelete}
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                  >
                    Delete Event
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="ghost"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={userRole === "user"}
                >
                  {event ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CalendarModal;