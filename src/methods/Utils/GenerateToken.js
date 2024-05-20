import jwt from "jsonwebtoken";
import { Tokens } from "../../models/Tokens.js";

const generateToken = async (user) => {
  try {
    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { algorithm: "HS256" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { algorithm: "HS256", expiresIn: "1d" });

    const tokenOnDB = await Tokens.findOne({ owner: user._id });

    if (tokenOnDB) await Tokens.findOneAndDelete({ owner: user._id });
    await new Tokens({ owner: user._id, token: refreshToken }).save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    console.log("Unable to generate token. User may not be signed in");
  }
};

export default generateToken;
