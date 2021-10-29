import {getRepository, Repository} from "typeorm";
import {Item} from "../entities/item";

export default class ItemService {

    itemRepository: Repository<Item>;

    constructor() {
        this.itemRepository = getRepository(Item);
    }

    getAll = async (): Promise<Item[]> => {
        const items = await this.itemRepository.find();
        if (!items) {
            throw new Error('Items could not be retrieved');
        }
        return items;
    }

    get = async (id: string): Promise<Item> => {
        const item = await this.itemRepository.findOne(id);
        if (!item) {
            throw new Error('Item was not found');
        }
        return item;
    }

    create = async (item: any): Promise<Item[]> => {
        try {
            return await this.itemRepository.save(this.itemRepository.create(item));
        } catch {
            throw new Error('The item(s) could not be created');
        }
    }
}