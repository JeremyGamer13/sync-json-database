interface SnapshotsOptions {
    enabled: boolean;
    path: string;
    interval: number;
    indented?: boolean;
    max?: number;
}

interface DatabaseOptions {
    forceNew?: boolean;
    indented?: boolean;
    snapshots?: SnapshotsOptions;
}

interface DatabaseElement {
    key: string;
    value: unknown;
}

declare class Database {
    /**
     * @param {string} filePath The path of the json file used for the database.
     * @param {DatabaseOptions?} options
     */
    constructor(filePath?: string, options?: DatabaseOptions);

    /**
     * The path of the json file used as database.
     * @type {string}
     */
    public jsonFilePath: string;
    /**
     * The options for the database
     * @type {DatabaseOptions}
     */
    public options: DatabaseOptions;
    /**
     * The data stored in the database.
     * @type {object}
     */
    public data: Record<string, unknown>;

    /**
     * Get data from the json file and store it in the data property.
     * Can be used to resync with the saved file, just be careful that local changes are saved.
     */
    public fetchDataFromFile(): void;
    /**
     * Write data to the json file.
     */
    public saveDataToFile(): void;
    /**
     * Make a snapshot of the database and save it in the provided folder path
     * @param {string} folderPath The path where the snapshot will be stored
     * @param {boolean?} indented 
     */
    public makeSnapshot(folderPath: string, indented: boolean|null): void;

    /**
     * Get data for a key in the database
     * @param {string} key 
     */
    public get(key: string): unknown;
    /**
     * Set new data for a key in the database.
     * @param {string} key
     * @param {*} value 
     */
    public set(key: string, value: unknown): void;
    /**
     * Set new data locally (not saved to the DB file)
     * Recommended for bulk operations.
     * Save using this.saveDataToFile()
     * @param {string} key
     * @param {*} value 
     */
    public setLocal(key: string, value: unknown): void;

    /**
     * Modify a key in the database with a custom callback, using the value of the key as an input to the callback.
     * The callback must return the new value of the key to use.
     * @param {string} key 
     * @param {(value:unknown) => unknown} callback 
     */
    public update(key: string, callback: (value: unknown) => unknown): void;
    /**
     * Modify a key in the database locally with a custom callback, using the value of the key as an input to the callback.
     * The callback must return the new value of the key to use.
     * 
     * Recommended for bulk operations.
     * Save using this.saveDataToFile()
     * @param {string} key 
     * @param {(value:unknown) => unknown} callback 
     */
    public updateLocal(key: string, callback: (value: unknown) => unknown): void;

    /**
     * Delete data for a key from the database.
     * @param {string} key 
     */
    public delete(key: string): void;
    /**
     * Delete data for a key from the database locally (not saved to the DB file)
     * Recommended for bulk operations.
     * Save using this.saveDataToFile()
     * @param {string} key 
     */
    public deleteLocal(key: string): void;
    /**
     * Deletes the entire database.
     */
    public deleteAll(): void;
    /**
     * Deletes the entire database locally (not saved to the DB file)
     * Save using this.saveDataToFile()
     */
    public deleteAllLocal(): void;

    /**
     * Check if a key exists in the database.
     * @param {string} key 
     */
    public has(key: string): boolean;
    /**
     * Get all the data from the database as an array.
     * outputType is an optional parameter that will output the data either as only keys, values, or both.
     * Don't provide the outputType parameter to output both keys and values.
     * 
     * The default output is formatted as [{ key:string, value:unknown }]
     * @param {"keys"|"values"|null} outputType Determines how the data is output.
     * @returns {Array<string|{key:string, value:unknown}>}
     */
    public array(outputType: "keys" | "values" | null): string | DatabaseElement[];
}

export = Database;