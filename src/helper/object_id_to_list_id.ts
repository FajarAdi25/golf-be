
export const objectIdToListId = (object) : Array<number> =>{
    let list_id = []

    for (const value of object) {
        list_id.push(value.id)
    }
    return list_id
}