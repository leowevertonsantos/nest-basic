import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersI } from 'src/players/interfaces/players.interface';
import { PlayersService } from 'src/players/services/players.service';
import { CreateCategoryDTO } from '../dtos/create-categories.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { CategoriesI } from '../interfaces/categories.interfaces';

@Injectable()
export class CategoriesService {


    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<CategoriesI>,
        private readonly playersService: PlayersService) { }

    public async createCategory(categoryDTO: CreateCategoryDTO): Promise<CategoriesI> {

        const categoryCreate: CategoriesI = await this.categoryModel.findOne({ category: categoryDTO.category }).exec();
        if (categoryCreate) {
            throw new ConflictException(`Category ${categoryDTO.category} already exist`);
        }

        return await new this.categoryModel(categoryDTO).save();
    }


    public async findAll(): Promise<CategoriesI[]> {
        return await this.categoryModel.find().populate('players');
    }

    public async findById(_id: string): Promise<CategoriesI> {

        const categoryFinded: CategoriesI = await this.categoryModel.findById(_id).populate('players');
        if (!categoryFinded) {
            throw new NotFoundException(`category not found with id: ${_id}`);
        }

        return categoryFinded;
    }


    public async update(id: string, categoryDTO: UpdateCategoryDTO): Promise<CategoriesI> {

        const categoryUpdated: CategoriesI = await this.categoryModel.findOneAndUpdate({ _id: id }, { $set: categoryDTO }).exec();
        if (!categoryUpdated) {
            throw new NotFoundException(`category not found with id: ${id}`);
        }
        return categoryUpdated;
    }

    public async updateByCategoryName(category: string, categoryDTO: UpdateCategoryDTO): Promise<CategoriesI> {

        const categoryUpdated: CategoriesI = await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryDTO }).exec();
        if (!categoryUpdated) {
            throw new NotFoundException(`category not found with id: ${category}`);
        }
        return categoryUpdated;
    }

    public async addPlayerToCategory(category: string, playerId: string): Promise<CategoriesI> {

        const categoryFinded: CategoriesI = await this.categoryModel.findOne({ category }).exec();

        if (!categoryFinded) {
            throw new NotFoundException(`category not found with category name: ${category}`);
        }


        const categoryWithPlayerFinded: CategoriesI = await this.categoryModel
            .findOne()
            .where('players')
            .in([playerId])
            .exec();

        if (categoryWithPlayerFinded) {
            throw new BadRequestException(`Player ${playerId} already in a category: ${categoryWithPlayerFinded.category}`);
        }

        const playerFinded: PlayersI = await this.playersService.findById(playerId);

        if (!playerFinded) {
            throw new NotFoundException(`Player ${playerId} not found`);
        }


        categoryFinded.players.push(playerFinded);
        const categoryUpdated: CategoriesI = await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryFinded }).exec();

        return categoryUpdated;
    }

    public async findCategoryByPlayer(playerId: string): Promise<CategoriesI> {

        const player: PlayersI = await this.playersService.findById(playerId);

        if (!player) {
            throw new NotFoundException(`Player ${playerId} not found`);
        }

        return await this.categoryModel.findOne().where('players').in([playerId]).exec()

    }



}
