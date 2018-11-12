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
    }
    interface UploadTask {
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
         * The content of the current file chunk as an ArrayBuffer.
         */
        chunk: FileChunk;
    }
    interface FileChunk {
        /**
         * The content of the chunk.
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
        upload: KnockoutObservable<boolean>;
        /**
         * The byte to start from when reading.
         */
        uploadStartByte: number;
        /**
         * The object representing the upload for this file.
         */
        uploadTask: KnockoutObservableBase<UploadTask>;
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
         * The limit of the file size in bytes.
         * Default is 200MB.
         */
        sizeLimit: number;
        /**
         * The size of chunks to break the file into to stream read it.
         * Default is 1MB.
         */
        chunkSize: number;
        /**
         * Resource Strings.
         */
        text: ResourceStrings;
        /**
         * The currently-selected files (as limited by maxFiles).
         */
        files: KnockoutComputed<SelectedFile[]>;
    }
    class Widget extends ValidatableControl.Widget<string> implements Interface {
        private _name;
        private _input;
        private _inputOverlay;
        private _buttonViewModel;
        private _textBoxViewModel;
        private _inputOverlayChangeHandler;
        private _inputOverlayClickHandler;
        private _selectedFiles;
        private _files;
        private _autoReadBookmarks;
        private _displayedString;
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
    }
}
