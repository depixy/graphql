import tagCategory from "./tag-category.js";
import tag from "./tag.js";
import filter from "./filter.js";
import user from "./user.js";
import post from "./post.js";

const adapters = {
  tagCategory,
  filter,
  tag,
  user,
  post
};

export type Adapters = typeof adapters;
export default adapters;
