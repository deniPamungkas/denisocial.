import { Router } from "express";
import { addRemoveFriend, getUser, getUserFriend } from "../Controller/User.js";

const route = Router();

route.get('/:id', getUser);
route.get('/:id/friends', getUserFriend);

route.patch('/:id/:friendId', addRemoveFriend);

export default route