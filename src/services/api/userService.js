import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async getAll() {
    await this.delay();
    return [...this.users];
  }

  async getById(id) {
    await this.delay();
    const user = this.users.find(u => u.Id === parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  }

  async create(userData) {
    await this.delay();
    const newUser = {
      Id: this.getNextId(),
      ...userData,
      lastActive: new Date().toISOString(),
      preferences: {}
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users[index] = { ...this.users[index], ...updateData };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users.splice(index, 1);
    return true;
  }

  getNextId() {
    return Math.max(...this.users.map(u => u.Id)) + 1;
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }
}

export default new UserService();