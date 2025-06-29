// import React, { useState, useEffect, useRef } from "react";More actions
// import { useDropzone } from "react-dropzone";
// import FilesList from "./FilesList";
// import styles from "./FileUploader.module.css";
// import {useTypedTranslation, useMutateData, useAuthContext} from "@/hooks"
// import { readFile } from "@/utils/readFile";
// import { toast } from "react-toastify";
// import uploadFileIcon from "@/assets/img/svg/upload file.svg";
// import { Button } from "@/components/ui/button";
// import RFlex from "@/components/Reusable-Components/Reusable-Flex";
// import uuid from "react-uuid";
// import { imageTypes } from "@/config/mimeTypes";
// import axiosInstance from "@/api/axiosInstance";
// import { cancelUploadRoute } from "@/api/routes";
// import { IFiles, IFileUploader, ProgressState, UploadId } from "@/interfaces/FileUploader";

// const baseUrl = import.meta.env.VITE_API_BASE_URL_ONLINE
// function FileUploader({
// 	parentCallback,
// 	parentCallbackToFillData,
// 	handleCloseUploadFile,
// 	typeFile="",
// 	sizeFile = 5000,
// 	singleFile=true,
// 	placeholder="",
// 	value = [{
//         url: "",
// 		file_name: "",
// 		mime_type:""
//     }],
// 	folderId= "",
// 	customAPI = "",
// 	customFormData,
// 	apiMethod = "POST",
// 	successCallback,
// 	showPickFromMyFile = false,
// 	showPickFromCourseFile = false,
// 	setIsOpenChooseFile,
// 	hideDoneButton = false,
// 	hideCancelButton = false,
// 	isEnableToDisableCanceling = false,
// }:IFileUploader) {
//     const {t} = useTypedTranslation()
//     const {auth} = useAuthContext()
// 	const [files, setFiles] = useState<IFiles[]>([]);
// 	const [progress, setProgress] = useState<ProgressState>({});
// 	const [abortControllers, setAbortControllers] = useState<Record<UploadId,AbortController>>({});
// 	const [filesFromBackend, setFilesFromBackend] = useState<IFiles[]>([]);
// 	const [pausedFiles, setPausedFiles] = useState<Record<string, boolean>>({}); // Track paused files

// 	const pausedFilesRef = useRef<Record<string, boolean>>({});

// 	const cancelUploadMutation = useMutateData({
// 		mutationFn: (data) => axiosInstance.post(cancelUploadRoute,data),
// 	});

// 	useEffect(() => {
// 		if (value && value.length > 0) {
// 			setFiles(
// 				value.map((val) => ({
// 					url: val.url,
// 					name: val.file_name,
// 					mimeType: val.mime_type,
// 				}))
// 			);
// 		}
// 	}, [value]);

// 	useEffect(() => {
// 		parentCallback && parentCallback(files);
// 	}, [files]);

// 	useEffect(() => {
// 		if (filesFromBackend?.length > 0) parentCallbackToFillData && parentCallbackToFillData(filesFromBackend);
// 	}, [filesFromBackend]);

// 	// - - - - - - - - - - - - - - onDrop Function - - - - - - - - - - - - - -

// 	const onDrop = async (acceptedFiles:File[]) => {
// 		if ((singleFile && acceptedFiles.length > 1) || (singleFile && acceptedFiles.length == 1 && files.length > 0)) {
// 			// Display an error message or prevent further processing
// 			// toast.warning(`${t(`Multiple files not allowed`)}`);
// 			toast.warning(`${(`Multiple files not allowed`)}`);

// 			return;
// 		}
// 		for (const file of acceptedFiles) {
// 			try {
// 				const abortController = new AbortController();
// 				const signal = abortController.signal;
// 				const uploadId = uuid(); // Generate a UUID for this file

// 				// Save the abort controller for the file
// 				setAbortControllers((prevControllers) => ({
// 					...prevControllers,
// 					[uploadId]: abortController,
// 				}));

// 				// Initialize paused state for this file using its UUID
// 				setPausedFiles((prev) => ({
// 					...prev,
// 					[uploadId]: false,
// 				}));

// 				processFile(file!, signal, uploadId);
// 			} catch (error) {
// 				console.error("Error initiating file upload:", error);
// 			}
// 		}
// 	};

// 	// - - - - - - - - - - - - - - Progress Function - - - - - - - - - - - - - -
// 	const processFile = async (file:File, signal:AbortSignal, uploadId:string, uploadedBytesArray?:number[], chunkProgressArray?:number[], mimeType?:string) => {
// 		console.log("Processing file:", file);

// 		const chunkSize = 35 * 1024 * 1024; // 5 MB
// 		const totalChunks = Math.ceil(file.size / chunkSize);
// 		const fileName = file.name;
// 		const fileMimeType = mimeType || file.type;
// 		console.log("totalChunks", totalChunks);
// 		// Ensure chunkProgressArray and uploadedBytesArray are properly initialized
//         if(chunkProgressArray){
//             if (chunkProgressArray.length === 0) {
//                 chunkProgressArray.length = totalChunks;
//                 chunkProgressArray.fill(0);
//             }
//         }
//         if(uploadedBytesArray){
//             if (uploadedBytesArray.length === 0) {
//                 uploadedBytesArray.length = totalChunks;
//                 uploadedBytesArray.fill(0);
//             }
//         }

// 		const isImage = imageTypes.includes(mimeType!);
// 		// If the file is not already in the `files` state, add it
// 		const existingFile = files.find((f) => f.uploadId === uploadId);
// 		if (!existingFile) {
// 			const filePreview = isImage && Boolean(await readFile(file));
// 			// console.log("filePreview", filePreview)
// 			setFiles((prevFiles) => [
// 				...prevFiles,
// 				{
// 					file,
// 					preview: isImage && filePreview,
// 					mimeType: fileMimeType,
// 					size: file.size, // Include total file size in bytes
// 					uploadId: uploadId,
// 					chunkProgressArray,
// 					uploadedBytesArray,
// 				},
// 			]);
// 		}

// 		// Loop through each chunk and upload
// 		for (let i = 0; i < totalChunks; i++) {
// 			// Skip already uploaded chunks
// 			if (uploadedBytesArray && uploadedBytesArray[i] > 0) {
// 				console.log(`Chunk ${i + 1}/${totalChunks} already uploaded.`);
// 				continue;
// 			}

// 			// Check if the upload is aborted
// 			if (signal.aborted) {
// 				console.log(`Upload for ${uploadId} was aborted.`);
// 				return;
// 			}

// 			// Check the paused state from the ref
// 			if (pausedFilesRef?.current[uploadId]) {
// 				console.log(`Upload for ${uploadId} is paused.`);
// 				return; // Exit if paused
// 			}

// 			const start = i * chunkSize;
// 			const end = Math.min(start + chunkSize, file.size);
// 			const chunk = file.slice(start, end);

// 			// Create a new File object from the sliced Blob
// 			const chunkFile = new File([chunk], fileName, {
// 				type: fileMimeType, // Preserve the original MIME type
// 			});

// 			console.log("Uploading chunk", i + 1, "of", totalChunks);

// 			try {
// 				// Upload the chunk
// 				await uploadChunk(chunkFile, i, totalChunks, fileName, chunkProgressArray || [], uploadedBytesArray || [], signal, file.size, uploadId);

// 				// Mark the chunk as uploaded
//                 if(uploadedBytesArray)
// 				uploadedBytesArray[i] = chunk.size; // Record the size of the uploaded chunk
//                 if(chunkProgressArray)
// 				chunkProgressArray[i] = 1; // Mark as completed (1 = completed)
// 			} catch (error) {
// 				console.error("Error uploading chunk:", error);
// 				// Handle specific errors (e.g., network issues) if needed
// 			}
// 		}

// 		// Finalize the file upload (if needed)
// 		console.log(`File upload for ${uploadId} completed.`);
// 	};

// 	// - - - - - - - - - - - - - - Upload Chunk Function - - - - - - - - - - - - - -
// 	const uploadChunk = (
// 		chunk:File,
// 		chunkNumber:number,
// 		totalChunks:number,
// 		fileName:string,
// 		chunkProgressArray:number[],
// 		uploadedBytesArray:number[],
// 		signal:AbortSignal,
// 		totalFileSize:number,
// 		uploadId:string
// 	) => {
// 		return new Promise((resolve, reject) => {
// 			const formData = new FormData();
// 			// formData.append("file", chunk);
// 			// formData.append("name", chunk.name);

// 			formData.append("files", chunk);
// 			formData.append("name", fileName);
// 			formData.append("chunk_number", (chunkNumber + 1).toString());
// 			formData.append("total_chunks", totalChunks.toString());
// 			formData.append("upload_id", uploadId);
// 			if (!customFormData) {
// 				formData.append("folder", folderId= "");
// 			} else {
// 				Object.keys(customFormData).forEach((key) => {
// 					formData.append(key, customFormData.get(key) as string);
// 				});
// 			}
// 			for (const [key, value] of formData.entries()) {
// 				console.log("formData 123", key, value);
// 			}
// 			const token = auth?.AccessToken;
// 			const xhr = new XMLHttpRequest();
// 			const url = customAPI ? customAPI : `${baseUrl}${"api/file_management/"}files`;

// 			xhr.open(apiMethod, url, true);
// 			xhr.setRequestHeader("Authorization", `Bearer ${token}`);
// 			xhr.setRequestHeader("lang", localStorage.getItem("i18nextLng") as string);

// 			let startTime = Date.now(); // Start time for upload
// 			let lastUploadedBytes = 0; // Bytes uploaded in the last progress event
// 			let uploadSpeed = 0; // Bytes per second

// 			let overallProgress = 0;
// 			let totalUploadedBytes = 0;
// 			let remainingTime = 0;
// 			// Handle progress
// 			xhr.upload.addEventListener("progress", (event) => {
// 				console.log("progress");
// 				const currentTime = Date.now();
// 				const bytesUploaded = event.loaded;
// 				totalUploadedBytes = uploadedBytesArray.reduce((acc, curr) => acc + curr, 0);

// 				// Update upload speed
// 				const timeElapsed = (currentTime - startTime) / 1000; // Time in seconds
// 				uploadSpeed = (bytesUploaded - lastUploadedBytes) / timeElapsed; // Calculate speed
// 				lastUploadedBytes = bytesUploaded;

// 				// Calculate remaining time
// 				remainingTime = calculateRemainingTime(totalUploadedBytes, totalFileSize, uploadSpeed);

// 				// Update chunk progress and total uploaded bytes
// 				const chunkProgress = Math.round((event.loaded / event.total) * 100);
// 				chunkProgressArray[chunkNumber] = chunkProgress;
// 				uploadedBytesArray[chunkNumber] = event.loaded; // Update uploaded bytes for this chunk

// 				overallProgress = calculateOverallProgress(chunkProgressArray);
// 				onUploadProgress(uploadId, overallProgress, totalUploadedBytes, totalFileSize, remainingTime); // Pass remaining time
// 			});

// 			// Handle response
// 			xhr.onload = () => {
// 				console.log("JSON.parse(xhr.response)", JSON.parse(xhr.response));
// 				if (JSON.parse(xhr.response)?.code == 201) {
// 					resolve(xhr.response);
// 					onUploadProgress(uploadId, overallProgress, totalUploadedBytes, totalFileSize, remainingTime, null, true);
// 					if (JSON.parse(xhr.response)?.data?.id || JSON.parse(xhr.response)?.data?.done) {
// 						successCallback && successCallback(JSON.parse(xhr.response));
// 						setFilesFromBackend((prevFiles) => [...prevFiles, JSON.parse(xhr.response)?.data]);
// 					}
// 				} else if (
// 					JSON.parse(xhr.response)?.code == 500 ||
// 					JSON.parse(xhr.response)?.code == 404 ||
// 					JSON.parse(xhr.response)?.code == 403
// 				) {
// 					const errorMessage =
// 						typeof JSON.parse(xhr.response)?.msg == "string" ? JSON.parse(xhr.response)?.msg : JSON.parse(xhr.response)?.msg[0];
// 					onUploadProgress(uploadId, 0, totalUploadedBytes, totalFileSize, 0, errorMessage, false);
// 					reject(xhr.statusText); // Reject the promise if there's an error
// 				} else {
// 					reject(xhr.statusText);
// 				}
// 			};

// 			xhr.onerror = () => {
// 				reject(xhr.statusText);
// 			};

// 			// Abort request if signal is triggered
// 			signal.addEventListener("abort", () => {
// 				xhr.abort();
// 				reject("Upload aborted");
// 			});

// 			xhr.send(formData);
// 		});
// 	};

// 	// - - - - - - - - - - - - - - Calculate Remaining Time - - - - - - - - - - - - - -
// 	const calculateRemainingTime = (uploadedBytes:number, totalFileSize:number, uploadSpeed:number) => {
// 		if (uploadSpeed <= 0) {
// 			return Infinity; // If speed is zero, we can't estimate time
// 		}
// 		const remainingBytes = totalFileSize - uploadedBytes;
// 		return remainingBytes / uploadSpeed; // Remaining time in seconds
// 	};

// 	// - - - - - - - - - - - - - - Calculate Overall Progress - - - - - - - - - - - - - -
// 	const calculateOverallProgress = (chunkProgressArray:number[]) => {
// 		const totalChunks = chunkProgressArray.length;
// 		const totalProgress = chunkProgressArray.reduce((acc, curr) => acc + curr, 0);
// 		return Math.round((totalProgress / (totalChunks * 100)) * 100); // Calculate overall progress as a percentage
// 	};

// 	// - - - - - - - - - - - - - - OnUpload Progress - - - - - - - - - - - - - -
// 	const onUploadProgress = (uploadId:string, overallProgress:number, uploadedBytes:number, totalBytes:number, remainingTime:number, errorMessage?:string | null, isSuccess?:boolean) => {
// 		setProgress((prevProgress) => ({
// 			...prevProgress,
// 			[uploadId]: {
// 				progress: overallProgress,
// 				uploaded: uploadedBytes, // Total uploaded bytes
// 				total: totalBytes, // Total file size
// 				remainingTime: remainingTime,
// 				errorMessage: errorMessage,
// 				isSuccess: isSuccess,
// 			},
// 		}));
// 	};

// 	// - - - - - - - - - - - - - - Remove File - - - - - - - - - - - - - -
// 	const removeFile = (uploadId:string) => {
// 		setFiles((prevFiles) => prevFiles.filter((file) => file?.uploadId !== uploadId));

// 		setProgress((prevProgress) => {
// 			const updatedProgress = { ...prevProgress };
// 			delete updatedProgress[uploadId];
// 			return updatedProgress;
// 		});

// 		const abortController = abortControllers[uploadId];
// 		if (abortController) {
// 			abortController.abort(); // Abort the ongoing upload request
// 			console.log(`Upload for ${uploadId} has been aborted.`);
// 			setAbortControllers((prevControllers) => {
// 				const updatedControllers = { ...prevControllers };
// 				delete updatedControllers[uploadId];
// 				return updatedControllers;
// 			});
// 		}
// 		if (progress[uploadId]?.progress !== 100) cancelUploadMutation.mutate({ upload_id: uploadId });
// 	};

// 	// - - - - - - - - - - - - - - Pause & Resume File - - - - - - - - - - - - - -
// 	const pauseFile = (uploadId:string) => {
// 		pausedFilesRef.current[uploadId] = true; // Update the ref
// 		setPausedFiles((prev) => ({
// 			...prev,
// 			[uploadId]: true,
// 		}));
// 	};

// 	const resumeFile = (uploadId:string) => {
// 		// Update the paused state for this file
// 		pausedFilesRef.current[uploadId] = false; // Update the ref
// 		setPausedFiles((prev) => ({
// 			...prev,
// 			[uploadId]: false,
// 		}));

// 		// Find the file associated with this uploadId
// 		const fileData = files.find((f) => f.uploadId === uploadId);

// 		if (!fileData) {
// 			console.error(`File with uploadId ${uploadId} not found.`);
// 			return;
// 		}
// 		console.log("fileData", fileData);
// 		const { file, mimeType, chunkProgressArray, uploadedBytesArray } = fileData;

// 		// Resume the upload process
// 		const abortController = new AbortController();
// 		setAbortControllers((prev) => ({ ...prev, [uploadId]: abortController }));

// 		// Call processFile with the existing progress data
// 		processFile(file!, abortController.signal, uploadId, uploadedBytesArray, chunkProgressArray, mimeType);
// 	};

// 	// - - - - - - - - - - - - - - Cancel All Uploads - - - - - - - - - - - - - -
// 	const cancelAllUploads = () => {
// 		Object.entries(progress).forEach(([uploadId, fileProgress]) => {
// 			if (fileProgress?.progress !== 100) {
// 				// Call removeFile for each file that is not fully uploaded
// 				removeFile(uploadId);
// 				cancelUploadMutation.mutate({ upload_id: uploadId });
// 			}
// 		});
// 	};
// 	// - - - - - - - - - - - - - - onDrop Hook - - - - - - - - - - - - - -
// 	const baseStyle = {
// 		display: "flex",
// 		alignItems: "center",
// 		// padding: "1px",
// 		borderWidth: 2,
// 		borderRadius: 8,
// 		borderColor: "#668AD7",
// 		borderStyle: "dashed",
// 		transition: "border .3s ease-in-out",
// 		padding: "24px",
// 		cursor: "pointer",
// 	};

// 	const activeStyle = {
// 		borderStyle: "solid",
// 		backgroundColor: "#EEF2FB",
// 	};

// 	const acceptStyle = {
// 		borderColor: "#00e676",
// 	};

// 	const rejectStyle = {
// 		// borderColor: "#ff1744",
// 	};

// 	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
// 		onDrop,
// 		multiple: singleFile ? false : true,
// 		// accept: typeFile ? typeFile : DefaultTypeFile,
// 	});

// 	const style = React.useMemo(
// 		() => ({
// 			...baseStyle,
// 			...(isDragActive ? activeStyle : {}),
// 			...(isDragAccept ? acceptStyle : {}),
// 			...(isDragReject ? rejectStyle : {}),
// 		}),
// 		[isDragActive, isDragReject, isDragAccept]
// 	);

// 	return (
// 		<section>
// 			<div {...getRootProps({ style:{...style, flexDirection:"column"} })} className="mb-2">
// 				<input {...getInputProps()} />
// 				<div className={styles.flex__column}>
// 					<img src={uploadFileIcon} width="75px" alt="uploadFileIcon" />
// 					<div className="flex gap-[5px] mt-3">
// 						<span className="font-semibold text-themePrimary text-[14px]">{`click_here`}</span>
// 						<span className="text-[14px]">{`to_upload_you_file_or_drag_and_drop`}</span>
// 					</div>
// 					<span className="text-themeLight text-[12px] mt-2">
// 						{`max_size_for_uploaded_file_is`} {sizeFile / 1000} GB
// 					</span>
// 					<div className="flex flex-col items-center gap-[15px] mt-[15px] relative">
// 						{showPickFromMyFile || showPickFromCourseFile ? (
// 							<>
// 								<div className="border-[#D9D9D9] border-b w-[100px] absolute top-[9px] right-[40px]"></div>
// 								<span className="text-themeBoldGrey">OR</span>
// 								<div className="border-[#D9D9D9] border-b w-[100px] absolute top-[9px] left-[40px]"></div>
// 							</>
// 						) : null}
// 					</div>
// 					<RFlex classes="gap-[10px]">
// 						{showPickFromCourseFile ? (
// 							<Button
// 								onClick={(e) => {
// 									e.stopPropagation();
// 									setIsOpenChooseFile && setIsOpenChooseFile({ type: "course_files", isOpen: true });
// 									handleCloseUploadFile && handleCloseUploadFile();
// 								}}
// 								variant="outline"
// 								className="rounded-[8px] w-[100px]"
// 							>
// 								{("course_files")}
// 							</Button>
// 						) : null}
// 					</RFlex>
// 				</div>
// 			</div>
// 			<FilesList
// 				files={files}
// 				pausedFiles={pausedFiles}
// 				progress={progress}
// 				removeFile={removeFile}
// 				pauseFile={pauseFile}
// 				resumeFile={resumeFile}
// 			/>
// 			<RFlex classes="w-full mt-4">
// 				{!hideCancelButton && (
// 					<Button
// 						className="w-[50%] text-[16px] h-[44px] rounded-[8px] text-black bg-white border border-themeLight"
// 						// disabled={!Object.values(progress).some(item => item.progress != 100)}
// 						onClick={() => {
// 							handleCloseUploadFile && handleCloseUploadFile();
// 							cancelAllUploads();
// 						}}
// 						disabled={isEnableToDisableCanceling && Object.values(progress).some((item:any) => item.progress == 100)}
// 					>
// 						{("cancel")}
// 					</Button>
// 				)}
// 				{!hideDoneButton && (
// 					<Button
// 						className="w-[50%] text-[16px] h-[44px] rounded-[8px]"
// 						onClick={() => {
// 							handleCloseUploadFile && handleCloseUploadFile();
// 						}}
// 						disabled={Object.values(progress).some((item:any) => item.progress != 100)}
// 					>
// 						{("done")}
// 					</Button>
// 				)}
// 			</RFlex>
// 		</section>
// 	);
// }

// export default FileUploader;


// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import FilesList from "./FilesList";
// import styles from "./FileUploader.module.css";
// import { useTypedTranslation, useMutateData, useAuthContext } from "@/hooks";
// import { readFile } from "@/utils/readFile";
// import { toast } from "react-toastify";
// import uploadFileIcon from "@/assets/img/svg/upload file.svg";
// import { Button } from "@/components/ui/button";
// import RFlex from "@/components/Reusable-Components/Reusable-Flex";
// import uuid from "react-uuid";
// import { imageTypes } from "@/config/mimeTypes";
// import axiosInstance from "@/api/axiosInstance";
// import { cancelUploadRoute } from "@/api/routes";
// // import { IFiles, IFileUploader, ProgressState, UploadId } from "@/interfaces/FileUploader";

// import { IFile, IFileUploader, IUploadProgress, ProgressState, 
//          UploadId, AbortControllers, PausedFilesRef, ProgressRef 
//        } from "@/interfaces/FileUploader";

// const baseUrl = import.meta.env.VITE_API_BASE_URL_ONLINE;

// function FileUploader({
//   parentCallback,
//   parentCallbackToFillData,
//   handleCloseUploadFile,
//   typeFile = "",
//   sizeFile = 5000,
//   singleFile = true,
//   placeholder = "",
//   value = [{
//     url: "",
//     file_name: "",
//     mime_type: ""
//   }],
//   folderId = "",
//   customAPI = "",
//   customFormData,
//   apiMethod = "POST",
//   successCallback,
//   showPickFromMyFile = false,
//   showPickFromCourseFile = false,
//   setIsOpenChooseFile,
//   hideDoneButton = false,
//   hideCancelButton = false,
//   isEnableToDisableCanceling = false,
// }: IFileUploader) {
//   const { t } = useTypedTranslation();
//   const { auth } = useAuthContext();
// //   const [files, setFiles] = useState<IFiles[]>([]);
//   const [files, setFiles] = useState<IFile[]>([]);

// //   const [progress, setProgress] = useState<ProgressState>({});
//     const [progress, setProgress] = useState<ProgressState>({});

// //   const [abortControllers, setAbortControllers] = useState<Record<UploadId, AbortController>>({});
//   const [abortControllers, setAbortControllers] = useState<AbortControllers>({});

// //   const [filesFromBackend, setFilesFromBackend] = useState<IFiles[]>([]);
//     const [filesFromBackend, setFilesFromBackend] = useState<IFile[]>([]);

//   // Use refs for frequently updated states
// //   const pausedFilesRef = useRef<Record<string, boolean>>({});
//     const pausedFilesRef = useRef<Record<string, boolean>>({}) as PausedFilesRef;

//     const progressRef = useRef<ProgressState>({}) as ProgressRef;
// //   const progressRef = useRef(progress);
// //   progressRef.current = progress;

// 	const cancelUploadMutation = useMutateData({
// 		mutationFn: (data) => axiosInstance.post(cancelUploadRoute,data),
// 	});

// 	useEffect(() => {
//     progressRef.current = progress;
//   }, [progress]);

//   // Initialize files from value prop
//   useEffect(() => {
//     if (value && value.length > 0) {
//       const mappedFiles = value.map((val) => ({
//         url: val.url,
//         name: val.file_name,
//         mimeType: val.mime_type,
//       }));

//       // if (JSON.stringify(mappedFiles) !== JSON.stringify(files)) {
//         setFiles(mappedFiles);
//       // }
//     }
//   }, [value]);

//   // Memoized callbacks to prevent unnecessary re-renders
//   const memoizedParentCallback = useCallback(() => {
//     parentCallback && parentCallback(files);
//   }, [files, parentCallback]);

//   const memoizedParentCallbackToFillData = useCallback(() => {
//     parentCallbackToFillData && parentCallbackToFillData(filesFromBackend);
//   }, [filesFromBackend, parentCallbackToFillData]);

//   useEffect(() => {
//     memoizedParentCallback();
//   }, [files, memoizedParentCallback]);

//   useEffect(() => {
//     if (filesFromBackend?.length > 0) {
//       memoizedParentCallbackToFillData();
//     }
//   }, [filesFromBackend, memoizedParentCallbackToFillData]);

//   // Process file function
//   const processFile = useCallback(async (
//     file: File,
//     signal: AbortSignal,
//     uploadId: string,
//     uploadedBytesArray: number[] = [],
//     chunkProgressArray: number[] = [],
//     mimeType?: string
//   ) => {
//     const chunkSize = 35 * 1024 * 1024;
//     const totalChunks = Math.ceil(file.size / chunkSize);
//     const fileName = file.name;
//     const fileMimeType = mimeType || file.type;
//     const isImage = imageTypes.includes(fileMimeType);
//   let preview: string | undefined;
//  if (isImage) {
//     try {
//       preview = await readFile(file);  // Should return a string (data URL)
//     } catch (error) {
//       console.error("Error generating preview:", error);
//     }
//   }
//     // Initialize arrays if needed
//     if (uploadedBytesArray.length === 0) {
//       uploadedBytesArray.length = totalChunks;
//       uploadedBytesArray.fill(0);
//     }

//     if (chunkProgressArray.length === 0) {
//       chunkProgressArray.length = totalChunks;
//       chunkProgressArray.fill(0);
//     }

//     // Add file to state if not exists
// 	setFiles((prevFiles) => {
// 		const existingFile = prevFiles.find(f => f.uploadId === uploadId);
// 		if (!existingFile) {
// 		return [
// 			...prevFiles,
// 			{
// 			file,
// 			preview: isImage ? readFile(file) : undefined, 
// 			mimeType: fileMimeType,
// 			size: file.size,
// 			uploadId,
// 			chunkProgressArray,
// 			uploadedBytesArray,
// 			}
// 		];
//   }
//   return prevFiles;
// });

//     // Upload chunks
//     for (let i = 0; i < totalChunks; i++) {
//       if (signal.aborted || pausedFilesRef.current[uploadId]) {
//         return;
//       }

//       if (uploadedBytesArray[i] > 0) {
//         continue;
//       }

//       try {
//         const start = i * chunkSize;
//         const end = Math.min(start + chunkSize, file.size);
//         const chunk = file.slice(start, end);
//         const chunkFile = new File([chunk], fileName, { type: fileMimeType });

//         await uploadChunk(
//           chunkFile,
//           i,
//           totalChunks,
//           fileName,
//           chunkProgressArray,
//           uploadedBytesArray,
//           signal,
//           file.size,
//           uploadId
//         );

//         uploadedBytesArray[i] = chunk.size;
//         chunkProgressArray[i] = 1;
//       } catch (error) {
//         console.error("Error uploading chunk:", error);
//       }
//     }
//   }, []);

//   // Upload chunk function
//   const uploadChunk = useCallback((
//     chunk: File,
//     chunkNumber: number,
//     totalChunks: number,
//     fileName: string,
//     chunkProgressArray: number[],
//     uploadedBytesArray: number[],
//     signal: AbortSignal,
//     totalFileSize: number,
//     uploadId: string
//   ) => {
//     return new Promise((resolve, reject) => {
//       const formData = new FormData();
//       formData.append("files", chunk);
//       formData.append("name", fileName);
//       formData.append("chunk_number", (chunkNumber + 1).toString());
//       formData.append("total_chunks", totalChunks.toString());
//       formData.append("upload_id", uploadId);

//       if (!customFormData) {
//         formData.append("folder", folderId);
//       } else {
//         Object.keys(customFormData).forEach((key) => {
//           formData.append(key, customFormData.get(key) as string);
//         });
//       }

//       const token = auth?.accessToken;
//       const xhr = new XMLHttpRequest();
//       const url = customAPI || `${baseUrl}api/file_management/files`;

//       xhr.open(apiMethod, url, true);
//       xhr.setRequestHeader("Authorization", `Bearer ${token}`);
//       xhr.setRequestHeader("lang", localStorage.getItem("i18nextLng") as string);

//       let startTime = Date.now();
//       let lastUploadedBytes = 0;
//       let uploadSpeed = 0;
//       let overallProgress = 0;
//       let totalUploadedBytes = 0;
//       let remainingTime = 0;

//       // Progress handler
//       xhr.upload.addEventListener("progress", (event) => {
//         const currentTime = Date.now();
//         const bytesUploaded = event.loaded;
//         totalUploadedBytes = uploadedBytesArray.reduce((acc, curr) => acc + curr, 0);

//         const timeElapsed = (currentTime - startTime) / 1000;
//         uploadSpeed = (bytesUploaded - lastUploadedBytes) / timeElapsed;
//         lastUploadedBytes = bytesUploaded;

//         remainingTime = calculateRemainingTime(totalUploadedBytes, totalFileSize, uploadSpeed);
//         chunkProgressArray[chunkNumber] = Math.round((event.loaded / event.total) * 100);
//         uploadedBytesArray[chunkNumber] = event.loaded;

//         overallProgress = calculateOverallProgress(chunkProgressArray);
//         onUploadProgress(uploadId, overallProgress, totalUploadedBytes, totalFileSize, remainingTime);
//       });

//       // Response handler
//       xhr.onload = () => {
//         try {
//           const response = JSON.parse(xhr.response);
//           if (response?.code === 201) {
//             onUploadProgress(uploadId, 100, totalFileSize, totalFileSize, 0, null, true);
//             if (response?.data?.id || response?.data?.done) {
//               successCallback?.(response);
//               setFilesFromBackend(prev => [...prev, response.data]);
//             }
//             resolve(response);
//           } else {
//             const errorMessage = typeof response?.msg === "string" 
//               ? response.msg 
//               : response?.msg?.[0] || "Upload failed";
//             onUploadProgress(uploadId, overallProgress, totalUploadedBytes, totalFileSize, 0, errorMessage, false);
//             reject(errorMessage);
//           }
//         } catch (error) {
//           reject("Error parsing response");
//         }
//       };

//       xhr.onerror = () => reject(xhr.statusText);
//       signal.addEventListener("abort", () => {
//         xhr.abort();
//         reject("Upload aborted");
//       });

//       xhr.send(formData);
//     });
//   }, [auth, baseUrl, apiMethod, customAPI, customFormData, folderId, successCallback]);

//   // Remaining time calculation
//   const calculateRemainingTime = useCallback((uploadedBytes: number, totalFileSize: number, uploadSpeed: number) => {
//     if (uploadSpeed <= 0) return Infinity;
//     return (totalFileSize - uploadedBytes) / uploadSpeed;
//   }, []);

//   // Overall progress calculation
//   const calculateOverallProgress = useCallback((chunkProgressArray: number[]) => {
//     const totalProgress = chunkProgressArray.reduce((acc, curr) => acc + curr, 0);
//     return Math.round(totalProgress / chunkProgressArray.length);
//   }, []);

//   // Upload progress handler
//   const onUploadProgress = useCallback((
//     uploadId: string,
//     overallProgress: number,
//     uploadedBytes: number,
//     totalBytes: number,
//     remainingTime: number,
//     errorMessage?: string | null,
//     isSuccess?: boolean
//   ) => {
//     setProgress(prev => ({
//       ...prev,
//       [uploadId]: {
//         progress: overallProgress,
//         uploaded: uploadedBytes,
//         total: totalBytes,
//         remainingTime,
//         errorMessage: errorMessage ?? null,
//         isSuccess: isSuccess ?? false,
//       }
//     }));
//   }, []);

//   // Remove file function
//   const removeFile = useCallback((uploadId: string) => {
//     setFiles(prev => prev.filter(file => file?.uploadId !== uploadId));
//     setProgress(prev => {
//       const updated = { ...prev };
//       delete updated[uploadId];
//       return updated;
//     });

//     const controller = abortControllers[uploadId];
//     if (controller) {
//       controller.abort();
//       setAbortControllers(prev => {
//         const updated = { ...prev };
//         delete updated[uploadId];
//         return updated;
//       });
//     }

//     if (progressRef.current[uploadId]?.progress !== 100) {
//       cancelUploadMutation.mutate({ upload_id: uploadId });
//     }
//   }, [abortControllers, cancelUploadMutation]);

//   // Pause file function
//   const pauseFile = useCallback((uploadId: string) => {
//     pausedFilesRef.current[uploadId] = true;
//   }, []);

//   // Resume file function
//   const resumeFile = useCallback((uploadId: string) => {
//     pausedFilesRef.current[uploadId] = false;
//     const fileData = files.find(f => f.uploadId === uploadId);

//     if (fileData?.file) {
//       const controller = new AbortController();
//       setAbortControllers(prev => ({ ...prev, [uploadId]: controller }));

//       processFile(
//         fileData.file,
//         controller.signal,
//         uploadId,
//         fileData.uploadedBytesArray,
//         fileData.chunkProgressArray,
//         fileData.mimeType
//       );
//     }
//   }, [files, processFile]);

//   // Cancel all uploads
//   const cancelAllUploads = useCallback(() => {
//     Object.keys(progressRef.current).forEach(uploadId => {
//       if (progressRef.current[uploadId]?.progress !== 100) {
//         removeFile(uploadId);
//         cancelUploadMutation.mutate({ upload_id: uploadId });
//       }
//     });
//   }, [cancelUploadMutation, removeFile]);

//   // Dropzone setup
//   const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
//     onDrop: useCallback((acceptedFiles: File[]) => {
//       if (singleFile && (acceptedFiles.length > 1 || files.length > 0)) {
//         toast.warning(("Multiple files not allowed"));
//         return;
//       }

//       acceptedFiles.forEach(file => {
//         const uploadId = uuid();
//         const controller = new AbortController();

//         setAbortControllers(prev => ({ ...prev, [uploadId]: controller }));
//         pausedFilesRef.current[uploadId] = false;

//         processFile(file, controller.signal, uploadId);
//       });
//     }, [files.length, processFile, singleFile, t]),
//     multiple: !singleFile,
//   });

//   // Dropzone styles
//   const baseStyle = {
//     display: "flex",
//     alignItems: "center",
//     borderWidth: 2,
//     borderRadius: 8,
//     borderColor: "#668AD7",
//     borderStyle: "dashed",
//     transition: "border .3s ease-in-out",
//     padding: "24px",
//     cursor: "pointer",
//     flexDirection: "column" as const,
//   };

//   const activeStyle = { borderStyle: "solid", backgroundColor: "#EEF2FB" };
//   const acceptStyle = { borderColor: "#00e676" };

//   const style = {
//     ...baseStyle,
//     ...(isDragActive ? activeStyle : {}),
//     ...(isDragAccept ? acceptStyle : {}),
//     ...(isDragReject ? {} : {}),
//   };

//   return (
//     <section>
//       <div {...getRootProps({ style })} className="mb-2">
//         <input {...getInputProps()} />
//         <div className={styles.flex__column}>
//           <img src={uploadFileIcon} width="75px" alt="uploadFileIcon" />
//           <div className="flex gap-[5px] mt-3">
//             <span className="font-semibold text-themePrimary text-[14px]">{("click_here")}</span>
//             <span className="text-[14px]">{("to_upload_you_file_or_drag_and_drop")}</span>
//           </div>
//           <span className="text-themeLight text-[12px] mt-2">
//             {("max_size_for_uploaded_file_is")} {sizeFile / 1000} GB
//           </span>
//           <div className="flex flex-col items-center gap-[15px] mt-[15px] relative">
//             {(showPickFromMyFile || showPickFromCourseFile) && (
//               <>
//                 <div className="border-[#D9D9D9] border-b w-[100px] absolute top-[9px] right-[40px]"></div>
//                 <span className="text-themeBoldGrey">{("or")}</span>
//                 <div className="border-[#D9D9D9] border-b w-[100px] absolute top-[9px] left-[40px]"></div>
//               </>
//             )}
//           </div>
//           <RFlex classes="gap-[10px]">
//             {showPickFromCourseFile && (
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsOpenChooseFile?.({ type: "course_files", isOpen: true });
//                   handleCloseUploadFile?.();
//                 }}
//                 variant="outline"
//                 className="rounded-[8px] w-[100px]"
//               >
//                 {("course_files")}
//               </Button>
//             )}
//           </RFlex>
//         </div>
//       </div>

//       <FilesList
//         files={files}
//         pausedFiles={pausedFilesRef.current}
//         progress={progress}
//         removeFile={removeFile}
//         pauseFile={pauseFile}
//         resumeFile={resumeFile}
//       />

//       <RFlex classes="w-full mt-4">
//         {!hideCancelButton && (
//           <Button
//             className="w-[50%] text-[16px] h-[44px] rounded-[8px] text-black bg-white border border-themeLight"
//             onClick={() => {
//               handleCloseUploadFile?.();
//               cancelAllUploads();
//             }}
//             disabled={isEnableToDisableCanceling && Object.values(progress).some(item => item?.progress === 100)}
//           >
//             {("cancel")}
//           </Button>
//         )}
//         {!hideDoneButton && (
//           <Button
//             className="w-[50%] text-[16px] h-[44px] rounded-[8px]"
//             onClick={() => handleCloseUploadFile?.()}
//             disabled={Object.values(progress).some(item => item?.progress !== 100)}
//           >
//             {("done")}
//           </Button>
//         )}
//       </RFlex>
//     </section>
//   );
// }

// export default React.memo(FileUploader);




import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import FilesList from "./FilesList";
import styles from "./FileUploader.module.css";
import { useMutateData, useAuthContext } from "@/hooks";
import { readFile } from "@/utils/readFile";
import { toast } from "react-toastify";
import uploadFileIcon from "@/assets/img/svg/upload file.svg";
import { Button } from "@/components/ui/button";
import RFlex from "@/components/Reusable-Components/Reusable-Flex";
import uuid from "react-uuid";
import { imageTypes } from "@/config/mimeTypes";
import axiosInstance from "@/api/axiosInstance";
import { deleteFileAfteruploadingRoute } from "@/api/routes";


const baseUrl = import.meta.env.VITE_API_BASE_URL_ONLINE;

function FileUploader({
    // @ts-ignore
    parentFiles,
    // @ts-ignore
	parentCallback,
    // @ts-ignore
    parentCallbackToFillData,
    // @ts-ignore
	handleCloseUploadFile,
    // @ts-ignore
	typeFile,
	sizeFile = 5000,
    // @ts-ignore
	singleFile,
    // @ts-ignore
	placeholder,
	value = [],
    // @ts-ignore
	folderId,
	customAPI = "",

	apiMethod = "POST",
    // @ts-ignore
	successCallback,
	showPickFromMyFile = false,
	showPickFromCourseFile = false,
    // @ts-ignore
	setIsOpenChooseFile,
	hideDoneButton = false,
	hideCancelButton = false,
	isEnableToDisableCanceling = false,
}) {
	const [files, setFiles] = useState([]);
	const [progress, setProgress] = useState({});
	const [abortControllers, setAbortControllers] = useState({});
	const [filesFromBackend, setFilesFromBackend] = useState([]);
	const [pausedFiles, setPausedFiles] = useState({}); // Track paused files
	const pausedFilesRef = useRef({}); // Ref to track paused files

	const cancelUploadMutation = useMutateData({
        // @ts-ignore
		mutationFn: ({public_id}, resourceType) => axiosInstance.delete(`${deleteFileAfteruploadingRoute}/${public_id}`, {...resourceType}),
	});

	useEffect(() => {
		if (value && value.length > 0) {
			setFiles(
        // @ts-ignore
				value.map((val) => ({
        // @ts-ignore
					url: val.url,
        // @ts-ignore
					name: val.file_name,
        // @ts-ignore
					mimeType: val.mime_type,
				}))
			);
		}
	}, [value]);

	useEffect(() => {
		parentCallback([...files,...filesFromBackend]);
	}, [files]);

	useEffect(() => {
		if (filesFromBackend?.length > 0) parentCallbackToFillData(filesFromBackend);
		// if (filesFromBackend?.length > 0) parentCallbackToFillData([{
		// 	...filesFromBackend[0] as Object, ...files[0] as Object}]);
	}, [filesFromBackend]);

	// - - - - - - - - - - - - - - onDrop Function - - - - - - - - - - - - - -

        // @ts-ignore
	const onDrop = async (acceptedFiles) => {
		if ((singleFile && acceptedFiles.length > 1) || (singleFile && acceptedFiles.length == 1 && files.length > 0)) {
			// Display an error message or prevent further processing
			toast.warning(`${`Multiple files not allowed`}`);

			return;
		}
		for (const file of acceptedFiles) {
			try {
				const abortController = new AbortController();
				const signal = abortController.signal;
				const uploadId = uuid(); // Generate a UUID for this file

				// Save the abort controller for the file
				setAbortControllers((prevControllers) => ({
					...prevControllers,
					[uploadId]: abortController,
				}));

				// Initialize paused state for this file using its UUID
				setPausedFiles((prev) => ({
					...prev,
					[uploadId]: false,
				}));

				processFile(file, signal, uploadId);
			} catch (error) {
				console.error("Error initiating file upload:", error);
			}
		}
	};

	// - - - - - - - - - - - - - - Progress Function - - - - - - - - - - - - - -
        // @ts-ignore
	const processFile = async (file, signal, uploadId, uploadedBytesArray = [], chunkProgressArray = [], mimeType = file.type) => {
		console.log("Processing file:", file);

		const chunkSize = 35 * 1024 * 1024; // 5 MB
		const totalChunks = Math.ceil(file.size / chunkSize);
		const fileName = file.name;
		const fileMimeType = mimeType || file.type;
		console.log("totalChunks", totalChunks);
		// Ensure chunkProgressArray and uploadedBytesArray are properly initialized
		if (chunkProgressArray.length === 0) {
			chunkProgressArray.length = totalChunks;
        // @ts-ignore
			chunkProgressArray.fill(0);
		}
		if (uploadedBytesArray.length === 0) {
			uploadedBytesArray.length = totalChunks;
        // @ts-ignore
			uploadedBytesArray.fill(0);
		}

		const isImage = imageTypes.includes(mimeType);
		// If the file is not already in the `files` state, add it
        // @ts-ignore
		const existingFile = files.find((f) => f.uploadId === uploadId);
		if (!existingFile) {
			const filePreview = isImage && (await readFile(file));
			// console.log("filePreview", filePreview)
        // @ts-ignore
			setFiles((prevFiles) => [
				...prevFiles,
				{
					file,
					preview: isImage && filePreview,
					mimeType: fileMimeType,
					size: file.size, // Include total file size in bytes
					uploadId: uploadId,
					chunkProgressArray,
					uploadedBytesArray,
				},
			]);
		}

		// Loop through each chunk and upload
		for (let i = 0; i < totalChunks; i++) {
			// Skip already uploaded chunks
			if (uploadedBytesArray[i] > 0) {
				console.log(`Chunk ${i + 1}/${totalChunks} already uploaded.`);
				continue;
			}

			// Check if the upload is aborted
			if (signal.aborted) {
				console.log(`Upload for ${uploadId} was aborted.`);
				return;
			}

			// Check the paused state from the ref

        // @ts-ignore
			if (pausedFilesRef.current[uploadId]) {
				console.log(`Upload for ${uploadId} is paused.`);
				return; // Exit if paused
			}

			const start = i * chunkSize;
			const end = Math.min(start + chunkSize, file.size);
			const chunk = file.slice(start, end);

			// Create a new File object from the sliced Blob
			const chunkFile = new File([chunk], fileName, {
				type: fileMimeType, // Preserve the original MIME type
			});

			console.log("Uploading chunk", i + 1, "of", totalChunks);

			try {
				// Upload the chunk
				await uploadChunk(chunkFile, i, totalChunks, fileName, chunkProgressArray, uploadedBytesArray, signal, file.size, uploadId);

				// Mark the chunk as uploaded
        // @ts-ignore
				uploadedBytesArray[i] = chunk.size; // Record the size of the uploaded chunk
        // @ts-ignore
				chunkProgressArray[i] = 1; // Mark as completed (1 = completed)
			} catch (error) {
				console.error("Error uploading chunk:", error);
				// Handle specific errors (e.g., network issues) if needed
			}
		}

		// Finalize the file upload (if needed)
		console.log(`File upload for ${uploadId} completed.`);
	};

  const { auth }= useAuthContext()
	// - - - - - - - - - - - - - - Upload Chunk Function - - - - - - - - - - - - - -
	const uploadChunk = (
        // @ts-ignore
		chunk,
        // @ts-ignore
		chunkNumber,
        // @ts-ignore
		totalChunks,
        // @ts-ignore
		fileName,
        // @ts-ignore
		chunkProgressArray,
        // @ts-ignore
		uploadedBytesArray,
        // @ts-ignore
		signal,
        // @ts-ignore
        totalFileSize,
        // @ts-ignore
		uploadId
	) => {
		return new Promise((resolve, reject) => {
			const formData = new FormData();
			formData.append("chunk", chunk);
			formData.append("fileName", fileName);
			formData.append("chunkNumber", chunkNumber);
			formData.append("totalChunks", totalChunks);
			formData.append("uploadId", uploadId);










			for (const [key, value] of formData.entries()) {
				console.log("formData 123", key, value);
			}
			const token = auth?.accessToken;
			const xhr = new XMLHttpRequest();
			const url = customAPI || `${baseUrl}/upload/chunk`;

			xhr.open(apiMethod, url, true);
			xhr.setRequestHeader("Authorization", `Bearer ${token}`);

			let startTime = Date.now(); // Start time for upload
			let lastUploadedBytes = 0; // Bytes uploaded in the last progress event
			let uploadSpeed = 0; // Bytes per second

			let overallProgress = 0;
			let totalUploadedBytes = 0;
			let remainingTime = 0;
			// Handle progress
			xhr.upload.addEventListener("progress", (event) => {
				console.log("progress");
				const currentTime = Date.now();
				const bytesUploaded = event.loaded;
        // @ts-ignore
				totalUploadedBytes = uploadedBytesArray.reduce((acc, curr) => acc + curr, 0);

				// Update upload speed
				const timeElapsed = (currentTime - startTime) / 1000; // Time in seconds
				uploadSpeed = (bytesUploaded - lastUploadedBytes) / timeElapsed; // Calculate speed
				lastUploadedBytes = bytesUploaded;

				// Calculate remaining time
				remainingTime = calculateRemainingTime(totalUploadedBytes, totalFileSize, uploadSpeed);

				// Update chunk progress and total uploaded bytes
				const chunkProgress = Math.round((event.loaded / event.total) * 100);
				chunkProgressArray[chunkNumber] = chunkProgress;
				uploadedBytesArray[chunkNumber] = event.loaded; // Update uploaded bytes for this chunk

				overallProgress = calculateOverallProgress(chunkProgressArray);
        // @ts-ignore
				onUploadProgress(uploadId, overallProgress, totalUploadedBytes, totalFileSize, remainingTime); // Pass remaining time
			});

			// Handle response
			xhr.onload = () => {
				console.log("response",xhr.response)
				console.log("JSON.parse(xhr.response)", JSON.parse(xhr.response));
				if (JSON.parse(xhr.response)?.url) {
        // @ts-ignore
					resolve();
					onUploadProgress(uploadId, overallProgress, totalUploadedBytes, totalFileSize, remainingTime, null, true);
					if (JSON.parse(xhr.response)?.url || JSON.parse(xhr.response)?.api_key
) {
						successCallback && successCallback(JSON.parse(xhr.response));
        // @ts-ignore
						setFilesFromBackend((prevFiles) => [...prevFiles, JSON.parse(xhr.response)]);
					}
				} else if (
					JSON.parse(xhr.response)?.statusCode == 500 ||
					JSON.parse(xhr.response)?.statusCode == 404 ||
					JSON.parse(xhr.response)?.statusCode == 401 ||
					JSON.parse(xhr.response)?.statusCode == 403
				) {
					console.log("hereeeeee")
					const errorMessage =
						typeof JSON.parse(xhr.response)?.message == "string" ? JSON.parse(xhr.response)?.message : JSON.parse(xhr.response)?.message[0];
					onUploadProgress(uploadId, 0, totalUploadedBytes, totalFileSize, 0, errorMessage, false);
					reject(xhr.statusText); // Reject the promise if there's an error
				} else {
					reject(xhr.statusText);
				}
			};

			xhr.onerror = () => {
				reject(xhr.statusText);
			};

			// Abort request if signal is triggered
			signal.addEventListener("abort", () => {
				xhr.abort();
				reject("Upload aborted");
			});

			xhr.send(formData);
		});
	};

	// - - - - - - - - - - - - - - Calculate Remaining Time - - - - - - - - - - - - - -
        // @ts-ignore
	const calculateRemainingTime = (uploadedBytes, totalFileSize, uploadSpeed) => {
		if (uploadSpeed <= 0) {
			return Infinity; // If speed is zero, we can't estimate time
		}
		const remainingBytes = totalFileSize - uploadedBytes;
		return remainingBytes / uploadSpeed; // Remaining time in seconds
	};

	// - - - - - - - - - - - - - - Calculate Overall Progress - - - - - - - - - - - - - -
        // @ts-ignore
	const calculateOverallProgress = (chunkProgressArray) => {
		const totalChunks = chunkProgressArray.length;
        // @ts-ignore
		const totalProgress = chunkProgressArray.reduce((acc, curr) => acc + curr, 0);
		return Math.round((totalProgress / (totalChunks * 100)) * 100); // Calculate overall progress as a percentage
	};

	// - - - - - - - - - - - - - - OnUpload Progress - - - - - - - - - - - - - -
        // @ts-ignore
	const onUploadProgress = (uploadId, overallProgress, uploadedBytes, totalBytes, remainingTime, errorMessage, isSuccess) => {
		setProgress((prevProgress) => ({
			...prevProgress,
			[uploadId]: {
				progress: overallProgress,
				uploaded: uploadedBytes, // Total uploaded bytes
				total: totalBytes, // Total file size
				remainingTime: remainingTime,
				errorMessage: errorMessage,
				isSuccess: isSuccess,
			},
		}));
	};

	// - - - - - - - - - - - - - - Remove File - - - - - - - - - - - - - -
        // @ts-ignore
	const removeFile = ({uploadId,public_id,resourceType}) => {
        // @ts-ignore
		setFiles((prevFiles) => prevFiles.filter((file) => file?.uploadId !== uploadId));

		setProgress((prevProgress) => {
			const updatedProgress = { ...prevProgress };
        // @ts-ignore
			delete updatedProgress[uploadId];
			return updatedProgress;
		});

        // @ts-ignore
		const abortController = abortControllers[uploadId];
		if (abortController) {
			abortController.abort(); // Abort the ongoing upload request
			console.log(`Upload for ${uploadId} has been aborted.`);
			setAbortControllers((prevControllers) => {
				const updatedControllers = { ...prevControllers };
        // @ts-ignore
				delete updatedControllers[uploadId];
				return updatedControllers;
			});
		}
        // @ts-ignore
		if (progress[uploadId]?.progress == 100)
			cancelUploadMutation.mutate({ public_id }, resourceType);
	};

	// - - - - - - - - - - - - - - Pause & Resume File - - - - - - - - - - - - - -
        // @ts-ignore
	const pauseFile = (uploadId) => {
        // @ts-ignore
		pausedFilesRef.current[uploadId] = true; // Update the ref
		setPausedFiles((prev) => ({
			...prev,
			[uploadId]: true,
		}));
	};

        // @ts-ignore
	const resumeFile = (uploadId) => {
		// Update the paused state for this file
        // @ts-ignore
		pausedFilesRef.current[uploadId] = false; // Update the ref
		setPausedFiles((prev) => ({
			...prev,
			[uploadId]: false,
		}));

		// Find the file associated with this uploadId
        // @ts-ignore
		const fileData = files.find((f) => f.uploadId === uploadId);

		if (!fileData) {
			console.error(`File with uploadId ${uploadId} not found.`);
			return;
		}
		console.log("fileData", fileData);
		const { file, mimeType, chunkProgressArray, uploadedBytesArray, chunkProgressArrayForFile } = fileData;

		// Resume the upload process
		const abortController = new AbortController();
		setAbortControllers((prev) => ({ ...prev, [uploadId]: abortController }));

		// Call processFile with the existing progress data
        // @ts-ignore
		processFile(file, abortController.signal, uploadId, uploadedBytesArray, chunkProgressArray, mimeType, chunkProgressArrayForFile);
	};

	// - - - - - - - - - - - - - - Cancel All Uploads - - - - - - - - - - - - - -
	const cancelAllUploads = () => {
		Object.entries(progress).forEach(([uploadId, fileProgress]) => {
        // @ts-ignore
			if (fileProgress.progress !== 100) {
				// Call removeFile for each file that is not fully uploaded
				removeFile({uploadId, public_id:"", resourceType:""});
				cancelUploadMutation.mutate({ upload_id: uploadId });
			}
		});
	};
	// - - - - - - - - - - - - - - onDrop Hook - - - - - - - - - - - - - -
	const baseStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		borderWidth: 2,
		borderRadius: 8,
		borderColor: "#668AD7",
		borderStyle: "dashed",
		transition: "border .3s ease-in-out",
        // @ts-ignore
		padding: "24px",
		cursor: "pointer",
	};

	const activeStyle = {
		borderStyle: "solid",
		backgroundColor: "#EEF2FB",
	};

	const acceptStyle = {
		borderColor: "#00e676",
	};

	const rejectStyle = {
		// borderColor: "#ff1744",
	};

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		multiple: singleFile ? false : true,
		accept: typeFile ? typeFile : undefined,
	});

	const style = React.useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	);

	return (
		<section>
			<div {...getRootProps({ 
        // @ts-ignore
        style })} className="mb-2">
				<input {...getInputProps()} />
				<div className={styles.flex__column}>
					<img src={uploadFileIcon} width="75px" alt="uploadFileIcon" />
					<div className="flex gap-[5px] mt-3">
						<span className="font-semibold text-themePrimary text-[14px]">{`click_here`}</span>
						<span className="text-[14px]">{`to_upload_you_file_or_drag_and_drop`}</span>
					</div>
					<span className="text-themeLight text-[12px] mt-2">
						{`max_size_for_uploaded_file_is`} {sizeFile / 1000} GB
					</span>
					<div className="flex flex-col items-center gap-[15px] mt-[15px] relative">
						{showPickFromMyFile || showPickFromCourseFile ? (
							<>
								<div className="border-[#D9D9D9] border-b w-[100px] absolute top-[9px] right-[40px]"></div>
								<span className="text-themeBoldGrey">OR</span>
								<div className="border-[#D9D9D9] border-b w-[100px] absolute top-[9px] left-[40px]"></div>
							</>
						) : null}
					</div>
				</div>
			</div>
			<FilesList
				files={files}
				parentFiles={filesFromBackend}
				pausedFiles={pausedFiles}
				progress={progress}
				removeFile={removeFile}
				pauseFile={pauseFile}
				resumeFile={resumeFile}
			/>
			<RFlex classes="w-full gap-2 mt-4">
				{!hideCancelButton && (
					<Button
					variant={"secondary"}
						className="w-[50%] text-[16px] h-[44px] rounded-[8px] text-black bg-white border border-gray-400"
						// disabled={!Object.values(progress).some(item => item.progress != 100)}
						onClick={() => {
							handleCloseUploadFile();
							cancelAllUploads();
						}}
        // @ts-ignore
						disabled={isEnableToDisableCanceling && Object.values(progress).some((item) => item.progress == 100)}
					>
						{("cancel")}
					</Button>
				)}
				{!hideDoneButton && (
					<Button
						className="w-[50%] text-[16px] h-[44px] rounded-[8px]"
						onClick={() => {
							handleCloseUploadFile();
						}}
        // @ts-ignore
						disabled={Object.values(progress).some((item) => item.progress != 100)}
					>
						{("done")}
					</Button>
				)}
			</RFlex>More actions
		</section>
	);
}

export default FileUploader;