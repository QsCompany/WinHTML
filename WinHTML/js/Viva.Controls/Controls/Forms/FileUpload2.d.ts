import Command = require("../Command");
import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
export = Main;
declare module Main {
    interface Interface extends ValidatableControl.Interface<string> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    /**
     *  Specifies how the file content should be uploaded.
     */
    enum FileUploadType {
        /**
         *  Full file content will be read. Use this option only for small file sizes less than 2 MB.
         */
        Full = 0,
        /**
         * File content will be read in chunks and provided to user in chunks.
         * Use this option to read large files and if user wants control over where to post the content.
         */
        Stream = 1,
        /**
         * File content will be uploaded to blob store.
         * Use this option for uploading large files in GBs.
         */
        BlobStore = 2,
    }
    /**
     * Specifies how the file content should be read and encoded in memory.
     * These options mimics the html5 file reader options to read the file content.
     */
    enum ContentType {
        /**
         * By default, file content will be read and stored as binary data in an ArrayBuffer.
         */
        Default = 0,
        /**
         * The file content will be read as plain text.
         * By default the string is encoded in 'UTF-8' format. Use the optional encoding parameter to specify a different format.
         */
        Text = 1,
        /**
         * The file content will be available in an ArrayBuffer.
         */
        ArrayBuffer = 2,
        /**
         * The file content will be encoded in the data uri scheme. Use this option for images and if those need to be directly shown in img tag.
         */
        DataUri = 3,
    }
    enum UploadStatus {
        /**
         * Invalid.
         */
        Invalid = 0,
        /**
         * Pending.
         */
        Pending = 1,
        /**
         * Uploading.
         */
        Uploading = 2,
        /**
         * Paused.
         */
        Paused = 3,
        /**
         * Complete.
         */
        Complete = 4,
        /**
         * Canceled.
         */
        Canceled = 5,
    }
    /**
     * The file upload context options around how/where to upload and size limits.
     */
    interface FileUploadContext {
        /**
         * Specify how/where the file should be uploaded.
         */
        type: FileUploadType;
        /**
         * Specify how the file content should be read and encoded in memory.
         */
        contentType: ContentType;
        /**
         * Optionally specify the encoding for Text content type like "UTF-8", "UTF-16" etc.
         * This parameter will be used directly for HTML5 file reader's readAsText method.
         */
        encoding?: string;
        /**
         * Specify the maximum file size that can be uploaded.
         */
        maxFileSize: number;
        /**
         * Specify the maximum chunk size the file should be chunked and uploaded.
         */
        chunkSize: number;
    }
    /**
     * Defines how the uploaded file content will be available for the user.
     */
    interface FileUploadContent {
        /**
         * File upload type. The content will be different for each file upload type.
         */
        type: FileUploadType;
        /**
         * Specifies how the content will be represented in memory.
         */
        contentType: ContentType;
    }
    interface FullFileUploadContent extends FileUploadContent {
        /**
         * The full file content will be available in memory and its content will be represented in the format specified by contentType.
         */
        content: any;
    }
    interface StreamFileUploadContent extends FileUploadContent {
        /**
         * The chunked file content will be available in memory and its content will be represented in the format specified by contentType.
         */
        content: any;
        /**
         * The startbyte of the chunk.
         */
        startByte: number;
        /**
         * The endbyte of the chunk.
         */
        endByte: number;
    }
    interface BlobStoreFileUploadContent extends FileUploadContent {
        /**
         * The SAS uri of the uploaded file will be available once the file upload completes successfully.
         */
        content: string;
    }
    interface FileUploadResult {
        /**
         * Whether the file associated with the upload task is valid or not.
         */
        valid: boolean;
        /**
         * The current status of the upload task.
         */
        status: UploadStatus;
        /**
         * The percent complete of the upload task.
         */
        progressPercent: number;
        /**
         * File upload content will be available in memory based on the specified upload type and content type.
         */
        data: FileUploadContent;
    }
    interface SelectedFile {
        /**
         * The name of the file.
         */
        name: string;
        /**
         * The mimetype of the file.
         */
        mimetype: string;
        /**
         * The size of the file, in bytes.
         */
        size: number;
        /**
         * Whether or not to continue uploading the file.
         */
        cancelUpload: KnockoutObservable<boolean>;
        /**
         * Whether or not to continue uploading the file.
         */
        resumeUpload: KnockoutObservable<boolean>;
        /**
         * The byte to start from when reading.
         */
        uploadStartByte: number;
        /**
         * The object representing the upload for this file.
         */
        uploadResult: KnockoutObservableBase<FileUploadResult>;
    }
    interface ResourceStrings {
        /**
         * Placeholder text used by the control when no files are selected.
         */
        placeholderText: string;
        /**
         * The message to display when a single file is selected.
         */
        singleFileSelectedMessage: string;
        /**
         * The message to display when multiple files are selected.
         * The token {0} will be replaced by the number of files when rendered.
         */
        multipleFilesSelectedMessage: string;
        /**
         * The message displayed when one or more selected files exceed the sizeLimit.
         * The token {0} will be replaced by the sizeLimit property.
         */
        fileSizeExceededMessage: string;
        /**
         * The message to display when a selected file is not found/deleted.
         */
        fileNotFoundMessage: string;
        /**
         * The message to display when a selected file is not readable.
         */
        fileNotReadablMessage: string;
        /**
         * The message to display when a selected file read is canceled/aborted.
         */
        fileReadAbortedMessage: string;
        /**
         * The message to display when a selected file read throws and error.
         */
        fileReadErrorMessage: string;
        /**
         * Progress bar pending display text.
         */
        uploadStatusPending: string;
        /**
         * Progress bar error display text.
         */
        uploadStatusError: string;
        /**
         * Progress bar done display text.
         */
        uploadStatusDone: string;
        /**
         * Progress bar group uploaded text.
         */
        progressBarGroupUploadedMessage: string;
        /**
         * Progress bar group uploading text.
         */
        progressBarGroupUploadingMessage: string;
        /**
         * Progress bar group success upload text.
         */
        progressBarGroupSuccessMessage: string;
        /**
         * Progress bar group failure upload text.
         */
        progressBarGroupFailureMessage: string;
        /**
         * Progress bar group canceled upload text.
         */
        progressBarGroupCanceledMessage: string;
    }
    /**
     * Full file upload context.
     */
    class FullFileUploadContext implements FileUploadContext {
        /**
         * Full file will be read and the entire content will be available in memory.
         */
        type: FileUploadType;
        /**
         * File content will be stored by default in an array buffer.
         */
        contentType: ContentType;
        /**
         * Optionally specify the encoding for Text content type like "UTF-8", "UTF-16" etc.
         * This parameter will be used directly for HTML5 file reader's readAsText method.
         */
        encoding: string;
        /**
         * Specify the maximum file size that can be uploaded.
         * Recommended max file is less than 2 MB for this upload type.
         */
        maxFileSize: number;
        /**
         * Specify the maximum chunk size the file should be chunked and uploaded.
         * Default chunk size should be same as maxFileSize for fill file download.
         */
        chunkSize: number;
    }
    /**
     * Stream file upload context. File will be read in chunks and chunked content will be available in memory.
     */
    class StreamFileUploadContext extends FullFileUploadContext implements FileUploadContext {
        /**
         * Initialize default properties for stream file upload context.
         */
        constructor();
    }
    /**
     * BlobStore file upload context. File will be uploaded directly to blob store specified by the SAS uri.
     */
    class BlobStoreFileUploadContext<T> extends FullFileUploadContext implements FileUploadContext {
        /**
         * Sas uri command context that will be passed to the execute method of the sasUriCommand.
         */
        context: KnockoutObservableBase<T>;
        /**
         * Specify the command to fetch the SAS uri for the target blob store where file will be uploaded.
         * Execute method on the command should provide the SAS uri with correct permissions and calculate the expiration time from the time it was invoked.
         */
        sasUriCommand: Command.Command<T>;
        /**
         * Initialize default properties for blob store file upload context.
         */
        constructor();
    }
    class ViewModel extends ValidatableControl.ViewModel<string> {
        /**
         * A comma-separated list of allowed file mime-types, excluding extensions.
         * This maps directly to the HTML accept attribute for file input controls.
         */
        accept: string;
        /**
         * The maximum number of files allowed to be uploaded at once.
         * This limit is applied post-selection.
         */
        maxFiles: number;
        /**
         * The upload context options around how/where to upload and size limits.
         */
        uploadContext: KnockoutObservableBase<FileUploadContext>;
        /**
         * Resource Strings.
         */
        text: ResourceStrings;
        /**
         * The currently-selected files (as limited by maxFiles).
         */
        files: KnockoutComputed<SelectedFile[]>;
        /**
         * Cancel all uploads that are in progress and clears the files list array.
         */
        cancelAllUploads: KnockoutObservableBase<boolean>;
        /**
         * Show progress bars demonstrating the progress of the file upload.
         * Default is true.
         */
        showProgressBars: KnockoutObservableBase<boolean>;
        /**
         * Callback to handle the file chunk in a domain specific scenarios like uploading to blob store.
         */
        onFileChunkUploadCallback: (selectedFile: SelectedFile, uploadResult: FileUploadResult) => void;
    }
    class Widget extends ValidatableControl.Widget<string> implements Interface {
        private _templateEngine;
        private _name;
        private _input;
        private _inputOverlay;
        private _buttonViewModel;
        private _textBoxViewModel;
        private _inputOverlayFocusHandler;
        private _inputOverlayBlurHandler;
        private _inputOverlayChangeHandler;
        private _inputOverlayMouseEnterHandler;
        private _inputOverlayMouseLeaveHandler;
        private _inputOverlayClickHandler;
        private _progressBarCancelHandler;
        private _progressBarGroupCancelHandler;
        private _progressBarGroupCollapseAllHandler;
        private _selectedFiles;
        private _files;
        private _autoReadBookmarks;
        private _progressInfoBalloon;
        private _displayedString;
        private _lifetimeManger;
        private _uploadSubscribeLifetimeManager;
        private _progressBarGroupValid;
        private _progressBarGroupPercent;
        private _progressBarGroupDetails;
        private _progressBarGroupCollapseAll;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * Reads the specified file and returns a chunk of size options.chunkSize.
         * This function is auto-advancing, so subsequent calls with advance the chunk read
         * until the entire file has been read.
         *
         * @param selectedFile The file to read.
         */
        read(selectedFile: SelectedFile): void;
        /**
         * Reads the specified file and returns a chunk of size options.chunkSize.
         * This function is auto-advancing, so subsequent calls with advance the chunk read
         * until the entire file has been read.
         *
         * @param selectedFile The file to read.
         * @param startByte An optional start byte for the read operation.
         */
        read(selectedFile: SelectedFile, startByte: number): void;
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        /**
         * Reads the selectedFile and returns a chunk of size options.chunkSize starting at startByte.
         *
         * @param selectedFile The file to read.
         * @param startByte The lower byte bound.
         * @param endByte The upper byte bound.
         */
        private readChunk(selectedFile, startByte, endByte);
        private _setTemplates();
        private _getFileReadErrorMessage(evt, selectedFile);
        private _initializeComputeds();
        private _attachEvents();
        private _detachEvents();
        private _focus();
        private _blur();
        private _mouseEnter();
        private _mouseLeave();
        private _getDefaultResourceStrings();
        private _resetValidationState(newState);
        private _toSelectedFileArray(files);
        private _subscribeForResumeUpload(selectedFile);
        private _subscribeForCancelUpload(selectedFile);
        private _getProgressInfoBalloonViewModel(selectedFile);
        private _linkProgressBarInfoBalloonContent(selectedFile, viewModel);
        private _getProgressDetailsLabel(uploadResult);
    }
}
