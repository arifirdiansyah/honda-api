import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
// Query builder for general purpose
export default function QueryBuilder(query) {
  let number = query.pageNumber ? Number(query.pageNumber) : 0;
  let size = query.pageSize ? Number(query.pageSize) : 10;
  let filed = query.sortField ? query.sortField : 'updatedAt';
  let order = query.sortOrder ? query.sortOrder : 'desc';

  // Define filter object
  let filters = {};
  // Remove filter if empty and add to filters collection if have a value
  if (query.filter) {
    for (const fil in query.filter) {
      if (query.filter.hasOwnProperty(fil)) {
        if (query.filter[fil] !== '' && query.filter[fil] !== undefined) {
          if (typeof query.filter[fil] === 'number') {
            filters[fil] = query.filter[fil];
          } else if (ObjectId.isValid(query.filter[fil])) {
            filters[fil] = query.filter[fil];
          } else if (typeof query.filter[fil] === 'object') {
            filters[fil] = query.filter[fil];
          } else if (Array.isArray(query.filter[fil])) {
            filters[fil] = query.filter[fil];
          } else {
            filters[fil] = new RegExp(query.filter[fil].toString(), 'i');
          }
        }
      }
    }
  }

  return {
    filter: filters,
    pageNumber: number,
    pageSize: size,
    sortField: filed,
    sortOrder: order,
  };
}
