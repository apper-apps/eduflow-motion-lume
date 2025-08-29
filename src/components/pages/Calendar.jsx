import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import CalendarModal from "@/components/organisms/CalendarModal";
import calendarService from "@/services/api/calendarService";
import assignmentService from "@/services/api/assignmentService";
import courseService from "@/services/api/courseService";

const Calendar = ({ userRole = "user" }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    courseId: "",
    status: ""
  });

  const loadCalendarData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const [eventsData, assignmentsData, coursesData] = await Promise.all([
        calendarService.getAll(),
        assignmentService.getByDateRange(startOfMonth, endOfMonth),
        courseService.getAll()
      ]);

      setEvents(eventsData);
      setAssignments(assignmentsData);
      setCourses(coursesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendarData();
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventCreate = async (eventData) => {
    try {
      const newEvent = await calendarService.create(eventData);
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
      toast.success("Event created successfully");
      loadCalendarData();
    } catch (err) {
      toast.error("Failed to create event");
    }
  };

  const handleEventEdit = async (id, eventData) => {
    try {
      const updatedEvent = await calendarService.update(id, eventData);
      setEvents(events.map(e => e.Id === id ? updatedEvent : e));
      setIsModalOpen(false);
      setSelectedEvent(null);
      toast.success("Event updated successfully");
    } catch (err) {
      toast.error("Failed to update event");
    }
  };

  const handleEventDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      await calendarService.delete(id);
      setEvents(events.filter(e => e.Id !== id));
      setSelectedEvent(null);
      setIsModalOpen(false);
      toast.success("Event deleted successfully");
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    const calendarEvents = events.filter(event => {
      const eventDate = new Date(event.startDate).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
    
    const assignmentEvents = assignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate).toISOString().split('T')[0];
      return dueDate === dateStr;
    }).map(assignment => ({
      ...assignment,
      type: 'assignment',
      title: assignment.title,
      startDate: assignment.dueDate
    }));
    
    return [...calendarEvents, ...assignmentEvents];
  };

  const renderCalendarHeader = () => (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={handlePrevMonth}
            variant="ghost"
            size="sm"
            icon="ChevronLeft"
          />
          <h2 className="text-xl font-semibold text-white min-w-[200px] text-center">
            {currentDate.toLocaleDateString("en-US", { 
              month: "long", 
              year: "numeric" 
            })}
          </h2>
          <Button
            onClick={handleNextMonth}
            variant="ghost"
            size="sm"
            icon="ChevronRight"
          />
        </div>
        <Button
          onClick={handleToday}
          variant="outline"
          size="sm"
        >
          Today
        </Button>
      </div>
      
      <div className="flex items-center space-x-3">
        <Select
          value={view}
          onChange={(e) => setView(e.target.value)}
          options={[
            { value: "month", label: "Month" },
            { value: "week", label: "Week" },
            { value: "day", label: "Day" }
          ]}
          className="w-24"
        />
        {userRole !== "user" && (
          <Button
            onClick={() => {
              setSelectedEvent(null);
              setIsModalOpen(true);
            }}
            variant="primary"
            size="sm"
            icon="Plus"
          >
            New Event
          </Button>
        )}
      </div>
    </div>
  );

  const renderMonthView = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startOfCalendar = new Date(startOfMonth);
    startOfCalendar.setDate(startOfCalendar.getDate() - startOfCalendar.getDay());
    
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Generate 6 weeks of days
    for (let i = 0; i < 42; i++) {
      const currentDay = new Date(startOfCalendar);
      currentDay.setDate(startOfCalendar.getDate() + i);
      
      const isCurrentMonth = currentDay.getMonth() === currentDate.getMonth();
      const isToday = currentDay.toDateString() === new Date().toDateString();
      const dayEvents = getEventsForDate(currentDay);
      
      days.push(
        <div
          key={i}
          className={`min-h-[100px] p-2 border border-white/10 ${
            isCurrentMonth ? "bg-surface/20" : "bg-surface/5"
          } ${isToday ? "bg-primary/20 border-primary/50" : ""}`}
        >
          <div className={`text-sm font-medium mb-2 ${
            isCurrentMonth ? "text-white" : "text-gray-500"
          } ${isToday ? "text-primary font-bold" : ""}`}>
            {currentDay.getDate()}
          </div>
          
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div
                key={event.Id || `${event.type}-${idx}`}
                className={`text-xs p-1 rounded cursor-pointer truncate ${
                  event.type === 'assignment' 
                    ? "bg-warning/20 text-warning border-l-2 border-warning" 
                    : event.type === 'meeting'
                    ? "bg-info/20 text-info border-l-2 border-info"
                    : "bg-primary/20 text-primary border-l-2 border-primary"
                }`}
                onClick={() => {
                  if (event.type !== 'assignment') {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                  }
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-400">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-0 border border-white/10 rounded-lg overflow-hidden">
        {dayNames.map(day => (
          <div key={day} className="p-3 bg-surface/40 text-center text-sm font-medium text-gray-300 border-b border-white/10">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const filterOptions = [
    { value: "", label: "All Types" },
    { value: "meeting", label: "Meetings" },
    { value: "deadline", label: "Deadlines" },
    { value: "event", label: "Events" },
    { value: "assignment", label: "Assignments" }
  ];

  const courseOptions = [
    { value: "", label: "All Courses" },
    ...courses.map(course => ({
      value: course.Id.toString(),
      label: course.title
    }))
  ];

  if (loading) {
    return <Loading variant="calendar" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadCalendarData} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Calendar</h1>
          <p className="text-gray-400">
            Manage your schedule, deadlines, and important events
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 max-w-md">
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search events..."
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            options={filterOptions}
            className="w-36"
          />
          <Select
            value={filters.courseId}
            onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
            options={courseOptions}
            className="w-40"
          />
        </div>
      </div>

      {/* Calendar */}
      <Card className="p-6">
        {renderCalendarHeader()}
        {view === "month" && renderMonthView()}
        {view === "week" && (
          <div className="text-center py-12 text-gray-400">
            Week view coming soon
          </div>
        )}
        {view === "day" && (
          <div className="text-center py-12 text-gray-400">
            Day view coming soon
          </div>
        )}
      </Card>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {assignments.slice(0, 5).map((assignment) => (
              <div key={assignment.Id} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                    <ApperIcon name="Clock" size={14} className="text-warning" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{assignment.title}</div>
                    <div className="text-xs text-gray-400">
                      Due {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge variant="warning" size="sm">
                  {Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))}d
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div key={event.Id} className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <ApperIcon 
                      name={event.type === 'meeting' ? 'Users' : event.type === 'deadline' ? 'AlertTriangle' : 'Calendar'} 
                      size={14} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{event.title}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={event.type === 'meeting' ? 'info' : event.type === 'deadline' ? 'warning' : 'primary'} 
                  size="sm"
                >
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <CalendarModal
          event={selectedEvent}
          courses={courses}
          userRole={userRole}
          onSave={selectedEvent ? (data) => handleEventEdit(selectedEvent.Id, data) : handleEventCreate}
          onDelete={selectedEvent ? () => handleEventDelete(selectedEvent.Id) : null}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;