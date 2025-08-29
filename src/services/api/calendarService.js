import calendarData from "@/services/mockData/calendar.json";

class CalendarService {
  constructor() {
    this.events = [...calendarData];
  }

  async getAll() {
    await this.delay();
    return [...this.events];
  }

  async getById(id) {
    await this.delay();
    const event = this.events.find(e => e.Id === parseInt(id));
    if (!event) {
      throw new Error("Event not found");
    }
    return { ...event };
  }

  async getByDateRange(startDate, endDate) {
    await this.delay();
    return this.events.filter(event => {
      const eventStart = new Date(event.startDate);
      return eventStart >= new Date(startDate) && eventStart <= new Date(endDate);
    });
  }

  async create(eventData) {
    await this.delay();
    const newEvent = {
      Id: this.getNextId(),
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.events.push(newEvent);
    return { ...newEvent };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.events.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Event not found");
    }
    this.events[index] = { 
      ...this.events[index], 
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return { ...this.events[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.events.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Event not found");
    }
    this.events.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.events.map(e => e.Id), 0) + 1;
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}

export default new CalendarService();