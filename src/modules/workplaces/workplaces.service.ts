import { Injectable } from "@nestjs/common";
import { type Workplace } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { getNextPage, queryParameters } from "../shared/pagination";
import { Page, PaginatedData } from "../shared/shared.types";
import { CreateWorkplace } from "./workplaces.schemas";

@Injectable()
export class WorkplacesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWorkplace): Promise<Workplace> {
    return await this.prisma.workplace.create({ data });
  }

  async getById(id: number): Promise<Workplace | null> {
    return await this.prisma.workplace.findUnique({ where: { id } });
  }


  //   export interface Page {
  //   num: number;
  //   size: number;
  //   shard?: number;
  // }


  async getTopWorkplaces() {
    // Do your logic here (e.g., fetch from DB, transform data, etc.)
    var myPage = { num: 1, size: 10 }; // Example page object
    var stuff = this.get({page: myPage});
    console.log(stuff);
    return stuff;
  }
  

  async get(parameters: { page: Page }): Promise<PaginatedData<Workplace>> {
    const { page } = parameters;

    const workplaces = await this.prisma.workplace.findMany({
      ...queryParameters({ page }),
      orderBy: { id: "asc" },
    });

    const nextPage = await getNextPage({
      currentPage: page,
      collection: this.prisma.workplace,
    });

    return { data: workplaces, nextPage };
  }
}
