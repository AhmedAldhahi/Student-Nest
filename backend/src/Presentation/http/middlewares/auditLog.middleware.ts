import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../../Infrastructure/Database/orm/TypeOrm/data-source";
import { AuditLogModel } from "../../../Infrastructure/Database/orm/TypeOrm/entity/AuditLog.entity";
import geoip from "geoip-lite"; // Optional: Remove if you don't want real locations

export const auditMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.audit = undefined;

  res.on("finish", async () => {
    // 1. Skip if no audit data was set in the controller
    if (!req.audit) return;

    try {
      const repo = AppDataSource.getInstance().getRepository(AuditLogModel);

      // ---------------------------------------------------------
      // 🛠️ FIX 1: Get Clean IPv4 Address
      // ---------------------------------------------------------
      let ip =
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        "";

      // Handle proxy array (sometimes x-forwarded-for is a list)
      if (Array.isArray(ip)) {
        ip = ip[0];
      }

      // Convert IPv6 Localhost (::1) to IPv4 (127.0.0.1)
      if (ip === "::1") {
        ip = "127.0.0.1";
      }

      // Clean IPv6-mapped IPv4 (e.g., ::ffff:192.168.1.5 -> 192.168.1.5)
      if (ip.startsWith("::ffff:")) {
        ip = ip.substring(7);
      }

      // ---------------------------------------------------------
      // 🌍 FIX 2: Get Location (Requires geoip-lite)
      // ---------------------------------------------------------
      let location = "UNKNOWN";

      if (ip === "127.0.0.1" || ip === "localhost") {
        location = "Localhost (Development)";
      } else {
        // Look up real country from IP
        const geo = geoip.lookup(ip);
        if (geo) {
          location = `${geo.country}, ${geo.city || "Unknown City"}`; // e.g., "JO, Amman"
        }
      }

      const audit = repo.create({
        ...req.audit,

        // User Info
        performedByUserId: req.user?.id ?? null,

        // Network Info
        ipAddress: ip,
        deviceInfo: req.headers["user-agent"] || "UNKNOWN",
        location: location,
      });

      await repo.save(audit);
    } catch (err) {
      console.error("Audit log failed:", err);
    }
  });

  next();
};
