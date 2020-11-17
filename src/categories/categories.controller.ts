import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Put } from '@nestjs/common';
import { throws } from 'assert';
import { ValidatorParameter } from 'src/common/pipes/validator-parameter.pipe';
import { CreateCategoryDTO } from './dtos/create-categories.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { CategoriesI } from './interfaces/categories.interfaces';
import { CategoriesService } from './services/categories.service';

@Controller('categories')
export class CategoriesController {

    constructor(
        private readonly categoryService: CategoriesService
    ) {
    }


    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() categoryDTO: CreateCategoryDTO): Promise<CategoriesI> {
        return await this.categoryService.createCategory(categoryDTO);
    }

    @Get()
    public async findAll(): Promise<CategoriesI[]> {
        return await this.categoryService.findAll();
    }

    @Get(':id')
    public async findById(@Param('id', ValidatorParameter) id: string): Promise<CategoriesI> {
        return await this.categoryService.findById(id);
    }


    @Put(':id')
    public async update(@Param(':id', ValidatorParameter) id: string, @Body() categoryDTO: UpdateCategoryDTO): Promise<CategoriesI> {
        return await this.categoryService.update(id, categoryDTO);
    }

    @Put('category/:category')
    public async updateByCategory(@Param(':category', ValidatorParameter) category: string, @Body() categoryDTO: UpdateCategoryDTO): Promise<CategoriesI> {
        return await this.categoryService.updateByCategoryName(category, categoryDTO);
    }

    @Post(':category/players/:playerId')
    public async addPlayerToCategory(@Param('category', ValidatorParameter) category: string, @Param('playerId', ValidatorParameter) playerId: string): Promise<any> {
        return await this.categoryService.addPlayerToCategory(category, playerId);
    }

}
