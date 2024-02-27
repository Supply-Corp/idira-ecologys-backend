import { Request } from "express";

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly search?: string
  ) {}

  static create(req: Request): [string?, PaginationDto?] {

    const { page = 10, limit = 10, search = '' } = req.query;

    if (+page <= 0) return ["Page must be greater than 0"];
    if (+limit <= 0) return ["Limit must be greater than 0"];

    return [undefined, new PaginationDto(+page, +limit, String(search))];
  }
}
