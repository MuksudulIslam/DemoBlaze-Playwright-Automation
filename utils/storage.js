import fs from 'fs';
import path from 'path';

const storageFile = path.join(process.cwd(), 'test-data.json');

export class TestStorage {
    static read() {
        if (fs.existsSync(storageFile)) {
            const data = fs.readFileSync(storageFile, 'utf8');
            return JSON.parse(data);
        }
        return {};
    }

    static write(data) {
        fs.writeFileSync(storageFile, JSON.stringify(data, null, 2));
    }

    static get(key) {
        const storage = this.read();
        return storage[key];
    }

    static set(key, value) {
        const storage = this.read();
        storage[key] = value;
        this.write(storage);
    }
};