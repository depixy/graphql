import tagCategory from "./tag-category.js";
import tag from "./tag.js";
import filter from "./filter.js";
import user from "./user.js";
import role from "./role.js";
import post from "./post.js";

const adapters = {
  tagCategory,
  filter,
  tag,
  user,
  post,
  role
};

export type Adapters = typeof adapters;
export default adapters;
