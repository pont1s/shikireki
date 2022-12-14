import {
  Body, Controller, Get, Logger, OnApplicationBootstrap, Param, ParseArrayPipe, Post, Query,
} from '@nestjs/common';

import { AnimesService } from './animes.service';
import { FindAnimesDto } from './dto/find-animes.dto';
import { GetAnimesDto } from './dto/get-animes.dto';
import { GetRecommendationDto } from './dto/get-recommendation.dto';

@Controller('animes')
export class AnimesController implements OnApplicationBootstrap {
  private readonly logger = new Logger(AnimesController.name);

  constructor(
    private readonly animesService: AnimesService,
  ) {}

  onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.animesService.shikimoriAnimesParsingBootstrap();
    }
  }

  @Get()
  async getAllAnimesHandler(
  @Query() query: GetAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = await this.animesService.find({}, {
      skip: page * count,
      limit: count,
    });

    return animes;
  }

  @Get('popular')
  async getPopularAnimesHandler(
  @Query() query: GetAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = await this.animesService.find({}, {
      skip: page * count,
      limit: count,
      sort: { score: 'desc' },
    });

    return animes;
  }

  @Get(':id')
  async getAnimeById(@Param('id') id: string) {
    return this.animesService.getAnimeById(id);
  }

  @Get('ongoing')
  async getOngoingAnimesHandler(
  @Query() query: GetAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = await this.animesService.find({
      ongoing: true,
    }, {
      skip: page * count,
      limit: count,
      sort: { score: 'desc' },
    });

    return animes;
  }

  @Get('find')
  async findAnimesHandler(
  @Query() query: FindAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = await this.animesService.find({
      $text: {
        $search: query.search,
      },
    }, {
      skip: page * count,
      limit: count,
      sort: { score: 'desc' },
    });

    return animes;
  }

  @Post('recommend-anime')
  async getRecommendationHandler(
  @Body(new ParseArrayPipe({ items: GetRecommendationDto })) body: GetRecommendationDto[],
  ) {
    return this.animesService.getNeuronetRecommendation(body);
  }

  @Get('similar-animes/:id')
  async getSimilarAnimesHandler(@Param('id') id: string) {
    return this.animesService.getSimilarAnimes(id);
  }
}
