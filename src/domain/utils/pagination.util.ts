interface Paginate {
  page: number;
  limit: number;
  total: number;
  search: string | undefined;
  url: string;
  results: any;
}

interface PaginateResult {
    page: number,
    limit: number,
    total: number,
    next: string | null,
    prev: string | null,
    results: any
}

export class PaginationGenerate {
  static create(pagine: Paginate): PaginateResult {

    const { page, limit, total, search, url, results } = pagine;

    return {
      page,
      limit,
      total,
      next: limit * page >= total
        ? null
        : `/${url}?page=${page + 1}&limit=${limit}${ search && `&search=${search}`
      }`,
      prev: page - 1 > 0
        ? `/${url}?page=${page - 1}&limit=${limit}`
        : null,
      results: results
    };
  }
}
