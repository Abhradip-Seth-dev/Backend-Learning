function wrapInArray<T>(val:T):T[]{
    return [val];
}

console.log(wrapInArray('hello'));
console.log(wrapInArray(123));
console.log(wrapInArray(['wdd']));

interface ServiceResult<T>{
    data:T,
    error:string|null,
}
