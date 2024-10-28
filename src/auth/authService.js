const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({ ...userData, password: hashedPassword });
    return user;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  }
}

module.exports = AuthService;