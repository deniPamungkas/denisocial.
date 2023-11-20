import User from "../Models/User.js";

/* GET USER */
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getUserFriend = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => {
        return User.findById(id);
      })
    );
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        email,
        occupation,
        location,
        picturePath,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          email,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(201).json(formattedFriends);
  } catch (error) {
    res.status(500).json("errrr" + error);
  }
};
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => {
        return id !== friendId;
      });
      friend.friends = friend.friends.filter((ide) => {
        return ide !== id;
      });
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
        user.friends.map((id) => {
          return User.findById(id);
        })
      );
      const formattedFriends = friends.map(
        ({
          _id,
          firstName,
          lastName,
          email,
          occupation,
          location,
          picturePath,
        }) => {
          return {
            _id,
            firstName,
            lastName,
            email,
            occupation,
            location,
            picturePath,
          };
        }
      );

    res.status(201).json(formattedFriends);
  } catch (error) {
    res.status(500).json({ error: "error" + error.message });
  }
};
