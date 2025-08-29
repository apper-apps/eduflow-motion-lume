import aiJobsData from "@/services/mockData/aiJobs.json";

class AIJobService {
  constructor() {
    this.jobs = [...aiJobsData];
  }

  async getAll() {
    await this.delay();
    return [...this.jobs];
  }

  async getById(id) {
    await this.delay();
    const job = this.jobs.find(j => j.Id === parseInt(id));
    if (!job) {
      throw new Error("AI Job not found");
    }
    return { ...job };
  }

  async create(jobData) {
    await this.delay();
    const newJob = {
      Id: this.getNextId(),
      ...jobData,
      status: "pending",
      progress: 0,
      createdAt: new Date().toISOString(),
      result: null,
      error: null
    };
    this.jobs.push(newJob);
    return { ...newJob };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.jobs.findIndex(j => j.Id === parseInt(id));
    if (index === -1) {
      throw new Error("AI Job not found");
    }
    this.jobs[index] = { ...this.jobs[index], ...updateData };
    return { ...this.jobs[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.jobs.findIndex(j => j.Id === parseInt(id));
    if (index === -1) {
      throw new Error("AI Job not found");
    }
    this.jobs.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.jobs.map(j => j.Id)) + 1;
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 200));
  }
}

export default new AIJobService();