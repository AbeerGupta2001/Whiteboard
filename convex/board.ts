import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/add.svg",
  "/1.svg",
  "/2.svg",
  "/3.svg",
  "/4.svg",
  "/5.svg",
  "/6.svg",
  "/7.svg",
  "/8.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const deleteBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject
    const existingFavorite = await ctx.db.query("userFavorites").withIndex("by_user_board",(q)=>q.eq("userId",userId).eq("boardId",args.id)).unique()

    if(existingFavorite){
      await ctx.db.delete(existingFavorite._id)
    }
    await ctx.db.delete(args.id);
  },
});

export const rename = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const title = args.title.trim();
    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }

    await ctx.db.patch(args.id, { title: title });
  },
});

export const favorites = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;
    const existingFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    if (existingFavorites) {
      throw new Error("Board already favorited");
    }

    return await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });
  },
});

export const unfavorites = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;
    const existingFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id))
      .unique();

    if (!existingFavorites) {
      throw new Error("Favorited board not found");
    }

    return await ctx.db.delete(existingFavorites._id);
  },
});


export const get = query({
  args: { id:v.id("boards") },
  handler: async(ctx,args) => {
    const board = await ctx.db.get(args.id)
    return board
  }
})