import express from 'express';
import User from '../Models/UserModel.js';


// PUT: update avatar
export const updateAvatar = async (req, res) => {
  const { userId, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    res.status(200).json({ message: "Avatar updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar", error });
  }
};
