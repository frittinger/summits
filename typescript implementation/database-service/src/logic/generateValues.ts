
export function getNextID(data: Array<any>, idIdentifier: string)
{
    if(data.length == 0)
        return 1;

    if(data[0][idIdentifier] == undefined)
        throw new Error("No value found for the Key "+ idIdentifier);
    
    if(data.length == data[data.length-1][idIdentifier])
        return data.length + 1;
    
    for (let i = 0; i< data.length;i++) {
        
        if (data[i][idIdentifier] != i + 1)
            return i + 1;
    }

    throw new Error()
}