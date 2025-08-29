import coursesData from "@/services/mockData/courses.json";

class CourseService {
  constructor() {
    this.courses = [...coursesData];
  }

  async getAll() {
    await this.delay();
    return [...this.courses];
  }

  async getById(id) {
    await this.delay();
    const course = this.courses.find(c => c.Id === parseInt(id));
    if (!course) {
      throw new Error("Course not found");
    }
    return { ...course };
  }

  async create(courseData) {
    await this.delay();
    const newCourse = {
      Id: this.getNextId(),
      ...courseData,
      enrollments: 0,
      status: "draft",
      modules: [],
      aiGenerated: false
    };
    this.courses.push(newCourse);
    return { ...newCourse };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.courses.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Course not found");
    }
    this.courses[index] = { ...this.courses[index], ...updateData };
    return { ...this.courses[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.courses.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Course not found");
    }
    this.courses.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.courses.map(c => c.Id)) + 1;
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}

export default new CourseService();