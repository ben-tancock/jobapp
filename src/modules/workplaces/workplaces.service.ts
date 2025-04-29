import { Injectable } from "@nestjs/common";
import { type Workplace } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { getNextPage, queryParameters } from "../shared/pagination";
import { Page, PaginatedData } from "../shared/shared.types";
import { CreateWorkplace } from "./workplaces.schemas";
import { getTopWorkplacesFunction } from '../../scripts/top-workplaces';

@Injectable()
export class WorkplacesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWorkplace): Promise<Workplace> {
    return await this.prisma.workplace.create({ data });
  }

  async getById(id: number): Promise<Workplace | null> {
    return await this.prisma.workplace.findUnique({ where: { id } });
  }

  async getTopWorkplaces() {
    const topWorkplaces = await getTopWorkplacesFunction();
    return topWorkplaces;
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
