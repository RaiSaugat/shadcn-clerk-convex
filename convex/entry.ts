import { v } from 'convex/values';
import { mutation } from './_generated/server';

// Create a new entry
export const createEntry = mutation({
  args: {
    name: v.string(),
    food: v.string(),
    mood: v.number(),
    water: v.string(),
  },
  handler: async (ctx, args) => {
    const newEntryId = await ctx.db.insert('tasks', {
      name: args.name,
      food: args.food,
      mood: args.mood,
      water: args.water,
    });
    return newEntryId;
  },
});
