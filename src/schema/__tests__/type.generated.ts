// @ts-nocheck
import type { FileUpload } from "@depixy/graphql-upload"
import { DocumentNode } from 'graphql';
import { gql } from './type.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: bigint;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: Date;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: FileUpload;
  /** Represents NULL values */
  Void: null;
};

export type BatchPayload = {
  count: Scalars['Int'];
};

export type BooleanFilter = {
  equal: Scalars['Boolean'];
};

export type DateTimeFilter = {
  equal?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DetailUser = {
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  loginName: Scalars['String'];
  posts: Array<Post>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime'];
};

export type IdFilter = {
  equal?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type Image = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['Int'];
  post: Post;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type LoginInput = {
  loginName: Scalars['String'];
  password: Scalars['String'];
};

export type MeUpdateInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  createPost: Post;
  createRole: Role;
  createTag: Tag;
  createTagCategory: TagCategory;
  createUser: DetailUser;
  login?: Maybe<DetailUser>;
  logout?: Maybe<Scalars['Void']>;
  removePosts: BatchPayload;
  removeRoles: BatchPayload;
  removeTagCategories: BatchPayload;
  removeTags: BatchPayload;
  removeUsers: BatchPayload;
  updateMe: DetailUser;
  updatePost: Post;
  updateRole: Role;
  updateTag: Tag;
  updateTagCategory: TagCategory;
  updateUser: DetailUser;
};


export type MutationCreatePostArgs = {
  input: PostCreateInput;
};


export type MutationCreateRoleArgs = {
  input: RoleCreateInput;
};


export type MutationCreateTagArgs = {
  input: TagCreateInput;
};


export type MutationCreateTagCategoryArgs = {
  input: TagCategoryCreateInput;
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemovePostsArgs = {
  input: PostWhereInput;
};


export type MutationRemoveRolesArgs = {
  input: RoleWhereInput;
};


export type MutationRemoveTagCategoriesArgs = {
  input: TagCategoryWhereInput;
};


export type MutationRemoveTagsArgs = {
  input: TagWhereInput;
};


export type MutationRemoveUsersArgs = {
  input: UserWhereInput;
};


export type MutationUpdateMeArgs = {
  input: MeUpdateInput;
};


export type MutationUpdatePostArgs = {
  input: PostUpdateInput;
};


export type MutationUpdateRoleArgs = {
  input: RoleUpdateInput;
};


export type MutationUpdateTagArgs = {
  input: TagUpdateInput;
};


export type MutationUpdateTagCategoryArgs = {
  input: TagCategoryUpdateInput;
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Pagination = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Post = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Image>;
  name: Scalars['String'];
  slug: Scalars['String'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostCreateInput = {
  description: Scalars['String'];
  images: Array<Scalars['Upload']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type PostOrderBy = {
  createdAt?: InputMaybe<Order>;
  id?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  slug?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type PostUpdateInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  tags?: InputMaybe<TagListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type Posts = {
  count: Scalars['Int'];
  edges: Array<Post>;
  pageInfo: PageInfo;
};


export type PostsCountArgs = {
  input?: InputMaybe<PostWhereInput>;
};


export type PostsEdgesArgs = {
  input?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
  pagination: Pagination;
};

export type Query = {
  me?: Maybe<DetailUser>;
  post?: Maybe<Post>;
  posts: Posts;
  role?: Maybe<Role>;
  roles: Roles;
  tag?: Maybe<Tag>;
  tagCategories: TagCategories;
  tagCategory?: Maybe<TagCategory>;
  tags: Tags;
  user?: Maybe<User>;
  users: Users;
};


export type QueryPostArgs = {
  input: PostWhereUniqueInput;
};


export type QueryPostsArgs = {
  pagination: Pagination;
};


export type QueryRoleArgs = {
  input: RoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  pagination: Pagination;
};


export type QueryTagArgs = {
  input: TagWhereUniqueInput;
};


export type QueryTagCategoriesArgs = {
  pagination: Pagination;
};


export type QueryTagCategoryArgs = {
  input: TagCategoryWhereUniqueInput;
};


export type QueryTagsArgs = {
  pagination: Pagination;
};


export type QueryUserArgs = {
  input: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  pagination: Pagination;
};

export type Role = {
  createdAt: Scalars['DateTime'];
  editable: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RoleCreateInput = {
  name: Scalars['String'];
};

export type RoleOrderBy = {
  createdAt?: InputMaybe<Order>;
  editable?: InputMaybe<Order>;
  id?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type RoleUpdateInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  editable?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Roles = {
  count: Scalars['Int'];
  edges: Array<Role>;
  pageInfo: PageInfo;
};


export type RolesCountArgs = {
  input?: InputMaybe<RoleWhereInput>;
};


export type RolesEdgesArgs = {
  input?: InputMaybe<RoleWhereInput>;
  orderBy?: InputMaybe<Array<RoleOrderBy>>;
  pagination: Pagination;
};

export type StringFilter = {
  contain?: InputMaybe<Scalars['String']>;
  endWith?: InputMaybe<Scalars['String']>;
  equal?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  category: TagCategory;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TagCategories = {
  count: Scalars['Int'];
  edges: Array<TagCategory>;
  pageInfo: PageInfo;
};


export type TagCategoriesCountArgs = {
  input?: InputMaybe<TagCategoryWhereInput>;
};


export type TagCategoriesEdgesArgs = {
  input?: InputMaybe<TagCategoryWhereInput>;
  orderBy?: InputMaybe<Array<TagCategoryOrderBy>>;
  pagination: Pagination;
};

export type TagCategory = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
};

export type TagCategoryCreateInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type TagCategoryOrderBy = {
  createdAt?: InputMaybe<Order>;
  id?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  slug?: InputMaybe<Order>;
  tagCount?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type TagCategoryUpdateInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type TagCategoryWhereInput = {
  AND?: InputMaybe<Array<TagCategoryWhereInput>>;
  NOT?: InputMaybe<Array<TagCategoryWhereInput>>;
  OR?: InputMaybe<Array<TagCategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  tags?: InputMaybe<TagListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagCategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type TagCreateInput = {
  categoryId: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type TagListFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderBy = {
  createdAt?: InputMaybe<Order>;
  id?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  slug?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type TagUpdateInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type Tags = {
  count: Scalars['Int'];
  edges: Array<Tag>;
  pageInfo: PageInfo;
};


export type TagsCountArgs = {
  input?: InputMaybe<TagWhereInput>;
};


export type TagsEdgesArgs = {
  input?: InputMaybe<TagWhereInput>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
  pagination: Pagination;
};

export type User = {
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  id: Scalars['ID'];
  loginName: Scalars['String'];
  posts: Array<Post>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime'];
};

export type UserCreateInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  loginName: Scalars['String'];
  password: Scalars['String'];
};

export type UserOrderBy = {
  createdAt?: InputMaybe<Order>;
  id?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
  userCount?: InputMaybe<Order>;
};

export type UserUpdateInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  password?: InputMaybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  displayName?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  loginName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  displayName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  loginName?: InputMaybe<Scalars['String']>;
};

export type Users = {
  count: Scalars['Int'];
  edges: Array<User>;
  pageInfo: PageInfo;
};


export type UsersCountArgs = {
  input?: InputMaybe<UserWhereInput>;
};


export type UsersEdgesArgs = {
  input?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  pagination: Pagination;
};

export type CreateTagCategoryMutationVariables = Exact<{
  input: TagCategoryCreateInput;
}>;


export type CreateTagCategoryMutation = { createTagCategory: { id: string, slug: string, name: string, createdAt: Date, updatedAt: Date, tags: Array<{ id: string, slug: string, name: string, createdAt: Date, updatedAt: Date }> } };

export type RemoveTagCategoriesMutationVariables = Exact<{
  input: TagCategoryWhereInput;
}>;


export type RemoveTagCategoriesMutation = { removeTagCategories: { count: number } };

export type TagCategoriesQueryVariables = Exact<{
  pagination: Pagination;
  orderBy?: InputMaybe<Array<TagCategoryOrderBy> | TagCategoryOrderBy>;
}>;


export type TagCategoriesQuery = { tagCategories: { count: number, edges: Array<{ id: string, slug: string, name: string, createdAt: Date, updatedAt: Date, tags: Array<{ id: string, slug: string, name: string, createdAt: Date, updatedAt: Date }> }> } };

export type TagCategoryQueryVariables = Exact<{
  input: TagCategoryWhereUniqueInput;
}>;


export type TagCategoryQuery = { tagCategory?: { id: string, slug: string, name: string, createdAt: Date, updatedAt: Date, tags: Array<{ id: string, slug: string, name: string, createdAt: Date, updatedAt: Date }> } | null };

export type UpdateTagCategoryMutationVariables = Exact<{
  input: TagCategoryUpdateInput;
}>;


export type UpdateTagCategoryMutation = { updateTagCategory: { id: string, slug: string, name: string, createdAt: Date, updatedAt: Date, tags: Array<{ id: string, slug: string, name: string, createdAt: Date, updatedAt: Date }> } };

export type CreateUserMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type CreateUserMutation = { createUser: { id: string, loginName: string, displayName: string, email: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login?: { id: string, loginName: string, displayName: string, email: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout?: null | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: { id: string, loginName: string, displayName: string, email: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> } | null };

export type RemoveUsersMutationVariables = Exact<{
  input: UserWhereInput;
}>;


export type RemoveUsersMutation = { removeUsers: { count: number } };

export type UpdateMeMutationVariables = Exact<{
  input: MeUpdateInput;
}>;


export type UpdateMeMutation = { updateMe: { id: string, loginName: string, displayName: string, email: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> } };

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateUserMutation = { updateUser: { id: string, loginName: string, displayName: string, email: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> } };

export type UserQueryVariables = Exact<{
  input: UserWhereUniqueInput;
}>;


export type UserQuery = { user?: { id: string, loginName: string, displayName: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> } | null };

export type UsersQueryVariables = Exact<{
  pagination: Pagination;
  orderBy?: InputMaybe<Array<UserOrderBy> | UserOrderBy>;
}>;


export type UsersQuery = { users: { count: number, edges: Array<{ id: string, loginName: string, displayName: string, createdAt: Date, updatedAt: Date, posts: Array<{ id: string }>, roles: Array<{ id: string, name: string }> }> } };


export const CreateTagCategoryDocument = gql`
    mutation createTagCategory($input: TagCategoryCreateInput!) {
  createTagCategory(input: $input) {
    id
    slug
    name
    tags {
      id
      slug
      name
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const RemoveTagCategoriesDocument = gql`
    mutation removeTagCategories($input: TagCategoryWhereInput!) {
  removeTagCategories(input: $input) {
    count
  }
}
    `;
export const TagCategoriesDocument = gql`
    query tagCategories($pagination: Pagination!, $orderBy: [TagCategoryOrderBy!]) {
  tagCategories(pagination: $pagination) {
    count
    edges(pagination: $pagination, orderBy: $orderBy) {
      id
      slug
      name
      tags {
        id
        slug
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export const TagCategoryDocument = gql`
    query tagCategory($input: TagCategoryWhereUniqueInput!) {
  tagCategory(input: $input) {
    id
    slug
    name
    tags {
      id
      slug
      name
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const UpdateTagCategoryDocument = gql`
    mutation updateTagCategory($input: TagCategoryUpdateInput!) {
  updateTagCategory(input: $input) {
    id
    slug
    name
    tags {
      id
      slug
      name
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: UserCreateInput!) {
  createUser(input: $input) {
    id
    loginName
    displayName
    email
    createdAt
    updatedAt
    posts {
      id
    }
    roles {
      id
      name
    }
  }
}
    `;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    id
    loginName
    displayName
    email
    createdAt
    updatedAt
    posts {
      id
    }
    roles {
      id
      name
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export const MeDocument = gql`
    query me {
  me {
    id
    loginName
    displayName
    email
    createdAt
    updatedAt
    posts {
      id
    }
    roles {
      id
      name
    }
  }
}
    `;
export const RemoveUsersDocument = gql`
    mutation removeUsers($input: UserWhereInput!) {
  removeUsers(input: $input) {
    count
  }
}
    `;
export const UpdateMeDocument = gql`
    mutation updateMe($input: MeUpdateInput!) {
  updateMe(input: $input) {
    id
    loginName
    displayName
    email
    createdAt
    updatedAt
    posts {
      id
    }
    roles {
      id
      name
    }
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    id
    loginName
    displayName
    email
    createdAt
    updatedAt
    posts {
      id
    }
    roles {
      id
      name
    }
  }
}
    `;
export const UserDocument = gql`
    query user($input: UserWhereUniqueInput!) {
  user(input: $input) {
    id
    loginName
    displayName
    createdAt
    updatedAt
    posts {
      id
    }
    roles {
      id
      name
    }
  }
}
    `;
export const UsersDocument = gql`
    query users($pagination: Pagination!, $orderBy: [UserOrderBy!]) {
  users(pagination: $pagination) {
    count
    edges(pagination: $pagination, orderBy: $orderBy) {
      id
      loginName
      displayName
      createdAt
      updatedAt
      posts {
        id
      }
      roles {
        id
        name
      }
    }
  }
}
    `;
export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    createTagCategory(variables: CreateTagCategoryMutationVariables, options?: C): Promise<{ data?: CreateTagCategoryMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<CreateTagCategoryMutation, CreateTagCategoryMutationVariables>(CreateTagCategoryDocument, variables, options);
    },
    removeTagCategories(variables: RemoveTagCategoriesMutationVariables, options?: C): Promise<{ data?: RemoveTagCategoriesMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<RemoveTagCategoriesMutation, RemoveTagCategoriesMutationVariables>(RemoveTagCategoriesDocument, variables, options);
    },
    tagCategories(variables: TagCategoriesQueryVariables, options?: C): Promise<{ data?: TagCategoriesQuery, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<TagCategoriesQuery, TagCategoriesQueryVariables>(TagCategoriesDocument, variables, options);
    },
    tagCategory(variables: TagCategoryQueryVariables, options?: C): Promise<{ data?: TagCategoryQuery, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<TagCategoryQuery, TagCategoryQueryVariables>(TagCategoryDocument, variables, options);
    },
    updateTagCategory(variables: UpdateTagCategoryMutationVariables, options?: C): Promise<{ data?: UpdateTagCategoryMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<UpdateTagCategoryMutation, UpdateTagCategoryMutationVariables>(UpdateTagCategoryDocument, variables, options);
    },
    createUser(variables: CreateUserMutationVariables, options?: C): Promise<{ data?: CreateUserMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options);
    },
    login(variables: LoginMutationVariables, options?: C): Promise<{ data?: LoginMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options);
    },
    logout(variables?: LogoutMutationVariables, options?: C): Promise<{ data?: LogoutMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options);
    },
    me(variables?: MeQueryVariables, options?: C): Promise<{ data?: MeQuery, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<MeQuery, MeQueryVariables>(MeDocument, variables, options);
    },
    removeUsers(variables: RemoveUsersMutationVariables, options?: C): Promise<{ data?: RemoveUsersMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<RemoveUsersMutation, RemoveUsersMutationVariables>(RemoveUsersDocument, variables, options);
    },
    updateMe(variables: UpdateMeMutationVariables, options?: C): Promise<{ data?: UpdateMeMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, variables, options);
    },
    updateUser(variables: UpdateUserMutationVariables, options?: C): Promise<{ data?: UpdateUserMutation, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options);
    },
    user(variables: UserQueryVariables, options?: C): Promise<{ data?: UserQuery, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<UserQuery, UserQueryVariables>(UserDocument, variables, options);
    },
    users(variables: UsersQueryVariables, options?: C): Promise<{ data?: UsersQuery, errors?: Array<{ message: string; extensions?: unknown }>, extensions?: unknown }> {
      return requester<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;