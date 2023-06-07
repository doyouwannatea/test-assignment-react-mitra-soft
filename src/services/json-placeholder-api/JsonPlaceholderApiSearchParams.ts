import { JsonPlaceholderApiOptions } from '@/models/json-placeholder-api';

export class JsonPlaceholderApiSearchParams {
  private searchParams = new URLSearchParams();

  constructor(options: JsonPlaceholderApiOptions) {
    const { pagination, filter, sort } = options;

    if (pagination) {
      const { limit, page } = pagination;
      this.searchParams.append('_page', String(page));
      this.searchParams.append('_limit', String(limit));
    }

    if (sort) {
      const { order, sortBy } = sort;
      this.searchParams.append('_order', order);
      this.searchParams.append('_sort', sortBy);
    }

    if (filter) {
      filter.forEach(
        (filterBy) =>
          filterBy.value &&
          this.searchParams.append(filterBy.option, filterBy.value),
      );
    }
  }

  toString() {
    return this.searchParams.toString();
  }
}
