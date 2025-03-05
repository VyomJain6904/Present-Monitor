import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.ts";
import attendanceRoutes from "./routes/attendanceRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { authenticateRequest } from "./middleware/authMiddleware";
import { scheduleAttendanceJob } from "./services/attendanceService";

class AttendanceServer {
	public app: express.Application;
	public httpServer: any;
	private io: Server;

	constructor() {
		this.app = express();
		this.httpServer = createServer(this.app);
		this.io = new Server(this.httpServer, {
			cors: {
				origin: process.env.FRONTEND_URL || "http://localhost:3000",
				methods: ["GET", "POST"],
			},
		});

		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeSocketIO();
		this.initializeScheduledJobs();
		this.initializeErrorHandling();
	}

	private initializeMiddlewares() {
		this.app.use(helmet());
		this.app.use(
			cors({
				origin: process.env.FRONTEND_URL || "http://localhost:3000",
				credentials: true,
			}),
		);
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeRoutes() {
		this.app.use("/api/auth", authRoutes);
		this.app.use("/api/attendance", authenticateRequest, attendanceRoutes);
		this.app.use(
			"/api/notifications",
			authenticateRequest,
			notificationRoutes,
		);
	}

	private initializeSocketIO() {
		this.io.on("connection", (socket) => {
			console.log("New client connected");

			socket.on("disconnect", () => {
				console.log("Client disconnected");
			});
		});
	}

	private initializeScheduledJobs() {
		// Schedule daily attendance calculation and notifications
		scheduleAttendanceJob(this.io);
	}

	private initializeErrorHandling() {
		this.app.use(errorHandler);
	}

	public listen() {
		const PORT = process.env.PORT || 5000;
		this.httpServer.listen(PORT, () => {
			console.log(`🚀 Server running on port ${PORT}`);
			console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
		});
	}
}

// Graceful shutdown
const server = new AttendanceServer();
server.listen();

process.on("SIGTERM", () => {
	console.log("SIGTERM received. Shutting down gracefully");
	server.httpServer.close(() => {
		console.log("Process terminated");
	});
});
