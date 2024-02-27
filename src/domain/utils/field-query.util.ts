export class FieldQuery {
    
    constructor(
        public readonly path: string,
        public readonly msg: string
    ) {}

    static fromObject(object: { [key: string]: any }) {
        const { path, msg } = object;

        if (!path) throw "missing path field";
        if (!msg) throw "missing msg field";

        return new FieldQuery(path, msg);
    }
}
