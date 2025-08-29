import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import calendarService from "@/services/api/calendarService";
import assignmentService from "@/services/api/assignmentService";

const CalendarWidget = ({ userRole = "user" }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();

  useEffect(() => {
    const loadWidgetData = async () => {
      try {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const [eventsData, assignmentsData] = await Promise.all([
          calendarService.getAll(),
          assignmentService.getByDateRange(startOfWeek, endOfWeek)
        ]);

        setEvents(eventsData.filter(event => {
          const eventDate = new Date(event.startDate);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        }).slice(0, 5));
        
        setAssignments(assignmentsData.slice(0, 3));
      } catch (err) {
        console.error("Failed to load calendar widget data");
      } finally {
        setLoading(false);
      }
    };

    loadWidgetData();
  }, []);

  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  const upcomingItems = [
    ...assignments.map(assignment => ({
      ...assignment,
      type: 'assignment',
      date: assignment.dueDate,
      icon: 'Clock',
      color: 'warning'
    })),
    ...events.map(event => ({
      ...event,
      type: event.type || 'event',
      date: event.startDate,
      icon: event.type === 'meeting' ? 'Users' : 'Calendar',
      color: 'primary'
    }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="w-32 h-5 bg-white/10 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-3/4 h-4 bg-white/10 rounded mb-1"></div>
                  <div className="w-1/2 h-3 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">This Week</h3>
        <Button
          onClick={handleViewCalendar}
          variant="ghost"
          size="sm"
          icon="Calendar"
        >
          View Calendar
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingItems.length > 0 ? (
          upcomingItems.map((item, index) => (
            <div key={`${item.type}-${item.Id || index}`} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-${item.color}/20 rounded-lg flex items-center justify-center`}>
                  <ApperIcon name={item.icon} size={14} className={`text-${item.color}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white truncate max-w-[180px]">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              <Badge variant={item.color} size="sm">
                {item.type}
              </Badge>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Calendar" size={24} className="text-primary/60" />
            </div>
            <p className="text-gray-400 text-sm mb-4">No events this week</p>
            <Button
              onClick={handleViewCalendar}
              variant="primary"
              size="sm"
            >
              View Calendar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CalendarWidget;