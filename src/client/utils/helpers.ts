// returns a deep copy of an object
// TODO: hacky and only copies serializable fields (e.g. no functions) - move to object?
export function cloneObject(object: any) {
    return JSON.parse(JSON.stringify(object));
}