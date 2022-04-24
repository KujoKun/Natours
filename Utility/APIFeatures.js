import _ from "lodash";

const APIFeatures = class {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const qObj = _.omit({ ...this.queryString }, [
      "page",
      "sort",
      "limit",
      "fields",
    ]);
    let qStr = JSON.stringify(qObj);
    qStr = qStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(qStr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limitVal = this.queryString.limit * 1 || 100;

    const skipVal = (page - 1) * limitVal;
    this.query = this.query.skip(skipVal).limit(limitVal);
    return this;
  }
};
export default APIFeatures;
