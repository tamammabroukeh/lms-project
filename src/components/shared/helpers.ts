export const DefaultTypeFile =
	"video/x-flv , video/mp4,application/x-mpegURL , video/MP2T , video/3gpp , video/quicktime , video/x-msvideo , video/x-ms-wmvimage/jpeg , image/* , image/png  , image/jpg ,  image/svg ,  image/svg+xml ,  .rar ,  .zip ,  application/x-zip-compressed ,   application/pdf , application/vnd.openxmlformats-officedocument ,  application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const CHUNK_SIZE = 1024 * 2048;

export function bytesToMegabytes(bytes:number) {
	return bytes / (1024 * 1024);
}

export function calculateChunkSize(fileSize:number) {
	const maxChunkSize = 100 * 1024 * 1024; // 100 MB
	const minChunkSize = 2 * 1024 * 1024;   // 2 MB
	const baseChunkSize = 10 * 1024 * 1024; // 10 MB

	// Define dynamic chunk size based on file size
	if (fileSize > maxChunkSize) {
		return maxChunkSize; // Limit to 100 MB for very large files
	} else if (fileSize > 50 * 1024 * 1024) {
		return baseChunkSize; // Use 10 MB for files > 50 MB
	} else if (fileSize > 5 * 1024 * 1024) {
		return baseChunkSize; // Use 10 MB for files > 5 MB
	} else {
		return Math.max(minChunkSize, Math.ceil(fileSize / 2)); // Dynamic size for smaller files
	}
}

export function formatRemainingTime(seconds:number) {
	if (seconds === Infinity) return "Calculating..."; // Handle infinite case

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	if (hours > 0) {
		return `${hours} hours `; // Show hours if present
	} else if (minutes > 0) {
		return `${minutes} minutes `; // Show minutes if hours are not present
	} else {
		return `${secs} seconds `; // Show seconds if neither hours nor minutes are present
	}
};