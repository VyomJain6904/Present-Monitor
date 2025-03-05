import { PrismaClient } from "@prisma/client";
import { ENV } from "./environment";

class DatabaseConnection {
	private static instance: PrismaClient;

	private constructor() {}

	public static getInstance(): PrismaClient {
		if (!DatabaseConnection.instance) {
			DatabaseConnection.instance = new PrismaClient({
				log:
					ENV.NODE_ENV === "development"
						? ["query", "error", "warn"]
						: ["error"],
			});
		}
		return DatabaseConnection.instance;
	}

	public static async connect() {
		try {
			await this.getInstance().$connect();
			console.log("✅ Database connected successfully");
		} catch (error) {
			console.error("❌ Database connection error:", error);
			process.exit(1);
		}
	}

	public static async disconnect() {
		await this.getInstance().$disconnect();
		console.log("📴 Database disconnected");
	}
}

export default DatabaseConnection;
