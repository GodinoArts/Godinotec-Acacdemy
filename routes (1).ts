import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist registration endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      // Check if email already exists
      const existingEntry = await storage.getWaitlistEntryByEmail(validatedData.email);
      if (existingEntry) {
        return res.status(400).json({ 
          message: "This email is already registered for our waitlist." 
        });
      }

      const entry = await storage.createWaitlistEntry(validatedData);
      res.status(201).json({ 
        message: "Successfully joined the waitlist!",
        id: entry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed",
          errors: error.errors 
        });
      }
      
      console.error("Error creating waitlist entry:", error);
      res.status(500).json({ 
        message: "An error occurred while processing your request." 
      });
    }
  });

  // Get waitlist stats (optional endpoint for admin)
  app.get("/api/waitlist/stats", async (req, res) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      res.json({ 
        totalEntries: entries.length,
        recentEntries: entries.slice(-10).reverse()
      });
    } catch (error) {
      console.error("Error fetching waitlist stats:", error);
      res.status(500).json({ 
        message: "An error occurred while fetching stats." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
