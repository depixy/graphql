import type { FileUpload } from "@depixy/graphql-upload";
import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
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
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: Date;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: string;
  /** Represents NULL values */
  Void: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: FileUpload;
  _FieldSet: any;
};

export type BooleanFilter = {
  equal: Scalars["Boolean"];
};

export type StringFilter = {
  contain?: InputMaybe<Scalars["String"]>;
  endWith?: InputMaybe<Scalars["String"]>;
  equal?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startWith?: InputMaybe<Scalars["String"]>;
};

export type StringNullableFilter = {
  contain?: InputMaybe<Scalars["String"]>;
  endWith?: InputMaybe<Scalars["String"]>;
  equal?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startWith?: InputMaybe<Scalars["String"]>;
};

export type IDFilter = {
  equal?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<Scalars["ID"]>>;
  not?: InputMaybe<IDFilter>;
  notIn?: InputMaybe<Array<Scalars["ID"]>>;
};

export type DateTimeFilter = {
  equal?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type DateTimeNullableFilter = {
  equal?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type TagListFilter = {
  every?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  slug: Scalars["String"];
  name: Scalars["String"];
  post: Post;
  user: User;
  number: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  slug: Scalars["String"];
  name: Scalars["String"];
  tags: Array<Tag>;
  images: Array<Image>;
  description: Scalars["String"];
  user: User;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type Posts = {
  __typename?: "Posts";
  count: Scalars["Int"];
  edges: Array<Post>;
  pageInfo: PageInfo;
};

export type PostscountArgs = {
  input?: InputMaybe<PostWhereInput>;
};

export type PostsedgesArgs = {
  input?: InputMaybe<PostWhereInput>;
  pagination: Pagination;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  id?: InputMaybe<IDFilter>;
  slug?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  tags?: InputMaybe<TagListFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostOrderBy = {
  id?: InputMaybe<Order>;
  slug?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  createdAt?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type Query = {
  __typename?: "Query";
  post?: Maybe<Post>;
  posts: Posts;
  tagCategory?: Maybe<TagCategory>;
  tagCategories: TagCategories;
  tag?: Maybe<Tag>;
  tags: Tags;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: Users;
};

export type QuerypostArgs = {
  input: PostWhereUniqueInput;
};

export type QuerypostsArgs = {
  pagination: Pagination;
};

export type QuerytagCategoryArgs = {
  input: TagCategoryWhereUniqueInput;
};

export type QuerytagCategoriesArgs = {
  pagination: Pagination;
};

export type QuerytagArgs = {
  input: TagWhereUniqueInput;
};

export type QuerytagsArgs = {
  pagination: Pagination;
};

export type QueryuserArgs = {
  input: UserWhereUniqueInput;
};

export type QueryusersArgs = {
  pagination: Pagination;
};

export type PostCreateInput = {
  slug: Scalars["String"];
  name: Scalars["String"];
  description: Scalars["String"];
  images: Array<Scalars["Upload"]>;
};

export type PostUpdateInput = {
  id: Scalars["ID"];
  slug?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  updatePost: Post;
  removePosts: BatchPayload;
  createTagCategory: TagCategory;
  updateTagCategory: TagCategory;
  removeTagCategories: BatchPayload;
  createTag: Tag;
  updateTag: Tag;
  removeTags: BatchPayload;
  login?: Maybe<User>;
  logout?: Maybe<Scalars["Void"]>;
  createUser: User;
  updateUser: User;
  removeUsers: BatchPayload;
};

export type MutationcreatePostArgs = {
  input: PostCreateInput;
};

export type MutationupdatePostArgs = {
  input: PostUpdateInput;
};

export type MutationremovePostsArgs = {
  input: PostWhereInput;
};

export type MutationcreateTagCategoryArgs = {
  input: TagCategoryCreateInput;
};

export type MutationupdateTagCategoryArgs = {
  input: TagCategoryUpdateInput;
};

export type MutationremoveTagCategoriesArgs = {
  input: TagCategoryWhereInput;
};

export type MutationcreateTagArgs = {
  input: TagCreateInput;
};

export type MutationupdateTagArgs = {
  input: TagUpdateInput;
};

export type MutationremoveTagsArgs = {
  input: TagWhereInput;
};

export type MutationloginArgs = {
  input: LoginInput;
};

export type MutationcreateUserArgs = {
  input: UserCreateInput;
};

export type MutationupdateUserArgs = {
  input: UserUpdateInput;
};

export type MutationremoveUsersArgs = {
  input: UserWhereInput;
};

export type TagCategory = {
  __typename?: "TagCategory";
  id: Scalars["ID"];
  slug: Scalars["String"];
  name: Scalars["String"];
  tags: Array<Tag>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type TagCategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type TagCategories = {
  __typename?: "TagCategories";
  count: Scalars["Int"];
  edges: Array<TagCategory>;
  pageInfo: PageInfo;
};

export type TagCategoriescountArgs = {
  input?: InputMaybe<TagCategoryWhereInput>;
};

export type TagCategoriesedgesArgs = {
  input?: InputMaybe<TagCategoryWhereInput>;
  pagination: Pagination;
  orderBy?: InputMaybe<Array<TagCategoryOrderBy>>;
};

export type TagCategoryWhereInput = {
  AND?: InputMaybe<Array<TagCategoryWhereInput>>;
  OR?: InputMaybe<Array<TagCategoryWhereInput>>;
  NOT?: InputMaybe<Array<TagCategoryWhereInput>>;
  id?: InputMaybe<IDFilter>;
  slug?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  tags?: InputMaybe<TagListFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagCategoryOrderBy = {
  id?: InputMaybe<Order>;
  slug?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  tagCount?: InputMaybe<Order>;
  createdAt?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type TagCategoryCreateInput = {
  slug: Scalars["String"];
  name: Scalars["String"];
};

export type TagCategoryUpdateInput = {
  id: Scalars["ID"];
  slug?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  slug: Scalars["String"];
  name: Scalars["String"];
  category: TagCategory;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Tags = {
  __typename?: "Tags";
  count: Scalars["Int"];
  edges: Array<Tag>;
  pageInfo: PageInfo;
};

export type TagscountArgs = {
  input?: InputMaybe<TagWhereInput>;
};

export type TagsedgesArgs = {
  input?: InputMaybe<TagWhereInput>;
  pagination: Pagination;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  id?: InputMaybe<IDFilter>;
  slug?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagOrderBy = {
  id?: InputMaybe<Order>;
  slug?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  createdAt?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type TagCreateInput = {
  categoryId: Scalars["String"];
  slug: Scalars["String"];
  name: Scalars["String"];
};

export type TagUpdateInput = {
  id: Scalars["ID"];
  slug?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Role = {
  __typename?: "Role";
  id: Scalars["ID"];
  name: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Pagination = {
  skip: Scalars["Int"];
  take: Scalars["Int"];
};

export enum Order {
  asc = "asc",
  desc = "desc",
}

export type PageInfo = {
  __typename?: "PageInfo";
  skip: Scalars["Int"];
  take: Scalars["Int"];
};

export type BatchPayload = {
  __typename?: "BatchPayload";
  count: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  loginName: Scalars["String"];
  displayName: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  posts: Array<Post>;
  roles: Array<Role>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  loginName?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
};

export type Users = {
  __typename?: "Users";
  count: Scalars["Int"];
  edges: Array<User>;
  pageInfo: PageInfo;
};

export type UserscountArgs = {
  input?: InputMaybe<UserWhereInput>;
};

export type UsersedgesArgs = {
  input?: InputMaybe<UserWhereInput>;
  pagination: Pagination;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  id?: InputMaybe<IDFilter>;
  displayName?: InputMaybe<StringFilter>;
  loginName?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserOrderBy = {
  id?: InputMaybe<Order>;
  name?: InputMaybe<Order>;
  userCount?: InputMaybe<Order>;
  createdAt?: InputMaybe<Order>;
  updatedAt?: InputMaybe<Order>;
};

export type UserCreateInput = {
  loginName: Scalars["String"];
  displayName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UserUpdateInput = {
  id: Scalars["ID"];
  loginName?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
};

export type LoginInput = {
  loginName: Scalars["String"];
  password: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BooleanFilter: BooleanFilter;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  StringFilter: StringFilter;
  String: ResolverTypeWrapper<Scalars["String"]>;
  StringNullableFilter: StringNullableFilter;
  IDFilter: IDFilter;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  DateTimeFilter: DateTimeFilter;
  DateTimeNullableFilter: DateTimeNullableFilter;
  TagListFilter: TagListFilter;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Post: ResolverTypeWrapper<Post>;
  PostWhereUniqueInput: PostWhereUniqueInput;
  Posts: ResolverTypeWrapper<Posts>;
  PostWhereInput: PostWhereInput;
  PostOrderBy: PostOrderBy;
  Query: ResolverTypeWrapper<{}>;
  PostCreateInput: PostCreateInput;
  PostUpdateInput: PostUpdateInput;
  Mutation: ResolverTypeWrapper<{}>;
  TagCategory: ResolverTypeWrapper<TagCategory>;
  TagCategoryWhereUniqueInput: TagCategoryWhereUniqueInput;
  TagCategories: ResolverTypeWrapper<TagCategories>;
  TagCategoryWhereInput: TagCategoryWhereInput;
  TagCategoryOrderBy: TagCategoryOrderBy;
  TagCategoryCreateInput: TagCategoryCreateInput;
  TagCategoryUpdateInput: TagCategoryUpdateInput;
  Tag: ResolverTypeWrapper<Tag>;
  TagWhereUniqueInput: TagWhereUniqueInput;
  Tags: ResolverTypeWrapper<Tags>;
  TagWhereInput: TagWhereInput;
  TagOrderBy: TagOrderBy;
  TagCreateInput: TagCreateInput;
  TagUpdateInput: TagUpdateInput;
  Role: ResolverTypeWrapper<Role>;
  BigInt: ResolverTypeWrapper<Scalars["BigInt"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Time: ResolverTypeWrapper<Scalars["Time"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  UUID: ResolverTypeWrapper<Scalars["UUID"]>;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  Pagination: Pagination;
  Order: Order;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  BatchPayload: ResolverTypeWrapper<BatchPayload>;
  User: ResolverTypeWrapper<User>;
  UserWhereUniqueInput: UserWhereUniqueInput;
  Users: ResolverTypeWrapper<Users>;
  UserWhereInput: UserWhereInput;
  UserOrderBy: UserOrderBy;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
  LoginInput: LoginInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BooleanFilter: BooleanFilter;
  Boolean: Scalars["Boolean"];
  StringFilter: StringFilter;
  String: Scalars["String"];
  StringNullableFilter: StringNullableFilter;
  IDFilter: IDFilter;
  ID: Scalars["ID"];
  DateTimeFilter: DateTimeFilter;
  DateTimeNullableFilter: DateTimeNullableFilter;
  TagListFilter: TagListFilter;
  Image: Image;
  Int: Scalars["Int"];
  Post: Post;
  PostWhereUniqueInput: PostWhereUniqueInput;
  Posts: Posts;
  PostWhereInput: PostWhereInput;
  PostOrderBy: PostOrderBy;
  Query: {};
  PostCreateInput: PostCreateInput;
  PostUpdateInput: PostUpdateInput;
  Mutation: {};
  TagCategory: TagCategory;
  TagCategoryWhereUniqueInput: TagCategoryWhereUniqueInput;
  TagCategories: TagCategories;
  TagCategoryWhereInput: TagCategoryWhereInput;
  TagCategoryOrderBy: TagCategoryOrderBy;
  TagCategoryCreateInput: TagCategoryCreateInput;
  TagCategoryUpdateInput: TagCategoryUpdateInput;
  Tag: Tag;
  TagWhereUniqueInput: TagWhereUniqueInput;
  Tags: Tags;
  TagWhereInput: TagWhereInput;
  TagOrderBy: TagOrderBy;
  TagCreateInput: TagCreateInput;
  TagUpdateInput: TagUpdateInput;
  Role: Role;
  BigInt: Scalars["BigInt"];
  Date: Scalars["Date"];
  Time: Scalars["Time"];
  DateTime: Scalars["DateTime"];
  UUID: Scalars["UUID"];
  Void: Scalars["Void"];
  Upload: Scalars["Upload"];
  Pagination: Pagination;
  PageInfo: PageInfo;
  BatchPayload: BatchPayload;
  User: User;
  UserWhereUniqueInput: UserWhereUniqueInput;
  Users: Users;
  UserWhereInput: UserWhereInput;
  UserOrderBy: UserOrderBy;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
  LoginInput: LoginInput;
};

export type ImageResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Image"] = ResolversParentTypes["Image"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["Tag"]>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Posts"] = ResolversParentTypes["Posts"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<PostscountArgs>
  >;
  edges?: Resolver<
    Array<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<PostsedgesArgs, "pagination">
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  post?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<QuerypostArgs, "input">
  >;
  posts?: Resolver<
    ResolversTypes["Posts"],
    ParentType,
    ContextType,
    RequireFields<QuerypostsArgs, "pagination">
  >;
  tagCategory?: Resolver<
    Maybe<ResolversTypes["TagCategory"]>,
    ParentType,
    ContextType,
    RequireFields<QuerytagCategoryArgs, "input">
  >;
  tagCategories?: Resolver<
    ResolversTypes["TagCategories"],
    ParentType,
    ContextType,
    RequireFields<QuerytagCategoriesArgs, "pagination">
  >;
  tag?: Resolver<
    Maybe<ResolversTypes["Tag"]>,
    ParentType,
    ContextType,
    RequireFields<QuerytagArgs, "input">
  >;
  tags?: Resolver<
    ResolversTypes["Tags"],
    ParentType,
    ContextType,
    RequireFields<QuerytagsArgs, "pagination">
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryuserArgs, "input">
  >;
  users?: Resolver<
    ResolversTypes["Users"],
    ParentType,
    ContextType,
    RequireFields<QueryusersArgs, "pagination">
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createPost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationcreatePostArgs, "input">
  >;
  updatePost?: Resolver<
    ResolversTypes["Post"],
    ParentType,
    ContextType,
    RequireFields<MutationupdatePostArgs, "input">
  >;
  removePosts?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationremovePostsArgs, "input">
  >;
  createTagCategory?: Resolver<
    ResolversTypes["TagCategory"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTagCategoryArgs, "input">
  >;
  updateTagCategory?: Resolver<
    ResolversTypes["TagCategory"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTagCategoryArgs, "input">
  >;
  removeTagCategories?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationremoveTagCategoriesArgs, "input">
  >;
  createTag?: Resolver<
    ResolversTypes["Tag"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTagArgs, "input">
  >;
  updateTag?: Resolver<
    ResolversTypes["Tag"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTagArgs, "input">
  >;
  removeTags?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationremoveTagsArgs, "input">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationloginArgs, "input">
  >;
  logout?: Resolver<Maybe<ResolversTypes["Void"]>, ParentType, ContextType>;
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, "input">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserArgs, "input">
  >;
  removeUsers?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationremoveUsersArgs, "input">
  >;
};

export type TagCategoryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["TagCategory"] = ResolversParentTypes["TagCategory"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["Tag"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagCategoriesResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["TagCategories"] = ResolversParentTypes["TagCategories"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<TagCategoriescountArgs>
  >;
  edges?: Resolver<
    Array<ResolversTypes["TagCategory"]>,
    ParentType,
    ContextType,
    RequireFields<TagCategoriesedgesArgs, "pagination">
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  category?: Resolver<ResolversTypes["TagCategory"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Tags"] = ResolversParentTypes["Tags"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<TagscountArgs>
  >;
  edges?: Resolver<
    Array<ResolversTypes["Tag"]>,
    ParentType,
    ContextType,
    RequireFields<TagsedgesArgs, "pagination">
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Role"] = ResolversParentTypes["Role"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface TimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
  name: "Time";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface UUIDScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["UUID"], any> {
  name: "UUID";
}

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type PageInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  skip?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  take?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BatchPayloadResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["BatchPayload"] = ResolversParentTypes["BatchPayload"]
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  loginName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes["Post"]>, ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes["Role"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Users"] = ResolversParentTypes["Users"]
> = {
  count?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    Partial<UserscountArgs>
  >;
  edges?: Resolver<
    Array<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<UsersedgesArgs, "pagination">
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Image?: ImageResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Posts?: PostsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  TagCategory?: TagCategoryResolvers<ContextType>;
  TagCategories?: TagCategoriesResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Tags?: TagsResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  BatchPayload?: BatchPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Users?: UsersResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  }
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  }
> {
  Image?: {
    id?: LoaderResolver<Scalars["ID"], Image, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Image, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Image, {}, TContext>;
    post?: LoaderResolver<Post, Image, {}, TContext>;
    user?: LoaderResolver<User, Image, {}, TContext>;
    number?: LoaderResolver<Scalars["Int"], Image, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], Image, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], Image, {}, TContext>;
  };

  Post?: {
    id?: LoaderResolver<Scalars["ID"], Post, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Post, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Post, {}, TContext>;
    tags?: LoaderResolver<Array<Tag>, Post, {}, TContext>;
    images?: LoaderResolver<Array<Image>, Post, {}, TContext>;
    description?: LoaderResolver<Scalars["String"], Post, {}, TContext>;
    user?: LoaderResolver<User, Post, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], Post, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], Post, {}, TContext>;
  };

  Posts?: {
    count?: LoaderResolver<Scalars["Int"], Posts, PostscountArgs, TContext>;
    edges?: LoaderResolver<Array<Post>, Posts, PostsedgesArgs, TContext>;
    pageInfo?: LoaderResolver<PageInfo, Posts, {}, TContext>;
  };

  TagCategory?: {
    id?: LoaderResolver<Scalars["ID"], TagCategory, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], TagCategory, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], TagCategory, {}, TContext>;
    tags?: LoaderResolver<Array<Tag>, TagCategory, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], TagCategory, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], TagCategory, {}, TContext>;
  };

  TagCategories?: {
    count?: LoaderResolver<
      Scalars["Int"],
      TagCategories,
      TagCategoriescountArgs,
      TContext
    >;
    edges?: LoaderResolver<
      Array<TagCategory>,
      TagCategories,
      TagCategoriesedgesArgs,
      TContext
    >;
    pageInfo?: LoaderResolver<PageInfo, TagCategories, {}, TContext>;
  };

  Tag?: {
    id?: LoaderResolver<Scalars["ID"], Tag, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Tag, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Tag, {}, TContext>;
    category?: LoaderResolver<TagCategory, Tag, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], Tag, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], Tag, {}, TContext>;
  };

  Tags?: {
    count?: LoaderResolver<Scalars["Int"], Tags, TagscountArgs, TContext>;
    edges?: LoaderResolver<Array<Tag>, Tags, TagsedgesArgs, TContext>;
    pageInfo?: LoaderResolver<PageInfo, Tags, {}, TContext>;
  };

  Role?: {
    id?: LoaderResolver<Scalars["ID"], Role, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Role, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], Role, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], Role, {}, TContext>;
  };

  PageInfo?: {
    skip?: LoaderResolver<Scalars["Int"], PageInfo, {}, TContext>;
    take?: LoaderResolver<Scalars["Int"], PageInfo, {}, TContext>;
  };

  BatchPayload?: {
    count?: LoaderResolver<Scalars["Int"], BatchPayload, {}, TContext>;
  };

  User?: {
    id?: LoaderResolver<Scalars["ID"], User, {}, TContext>;
    loginName?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    displayName?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    email?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["DateTime"], User, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["DateTime"], User, {}, TContext>;
    posts?: LoaderResolver<Array<Post>, User, {}, TContext>;
    roles?: LoaderResolver<Array<Role>, User, {}, TContext>;
  };

  Users?: {
    count?: LoaderResolver<Scalars["Int"], Users, UserscountArgs, TContext>;
    edges?: LoaderResolver<Array<User>, Users, UsersedgesArgs, TContext>;
    pageInfo?: LoaderResolver<PageInfo, Users, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
