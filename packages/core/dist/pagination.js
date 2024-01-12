export const paginationIterator = (fetch) => {
    let currentResponsePromise = fetch();
    let currentPageIter = null;
    const next = async () => {
        const currentResponse = await currentResponsePromise;
        if (!currentPageIter) {
            currentPageIter = currentResponse.items[Symbol.iterator]();
        }
        const currentNext = currentPageIter.next();
        if (!currentNext.done || !(currentResponse.nextPageToken)) {
            return currentNext;
        }
        currentPageIter = null;
        currentResponsePromise = fetch(currentResponse.nextPageToken);
        return await next();
    };
    const iterator = ({ next, [Symbol.asyncIterator]: () => iterator });
    return iterator;
};
//# sourceMappingURL=pagination.js.map