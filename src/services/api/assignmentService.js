import assignmentsData from "@/services/mockData/assignments.json";

class AssignmentService {
  constructor() {
    this.assignments = [...assignmentsData];
  }

  async getAll() {
    await this.delay();
    return [...this.assignments];
  }

  async getById(id) {
    await this.delay();
    const assignment = this.assignments.find(a => a.Id === parseInt(id));
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    return { ...assignment };
  }

  async create(assignmentData) {
    await this.delay();
    const newAssignment = {
      Id: this.getNextId(),
      ...assignmentData,
      submissions: [],
      type: assignmentData.type || "essay"
    };
    this.assignments.push(newAssignment);
    return { ...newAssignment };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.assignments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Assignment not found");
    }
    this.assignments[index] = { ...this.assignments[index], ...updateData };
    return { ...this.assignments[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.assignments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Assignment not found");
    }
    this.assignments.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.assignments.map(a => a.Id)) + 1;
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 250));
  }
}

export default new AssignmentService();