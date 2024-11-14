import { Injectable } from '@nestjs/common'
import { listEntities } from './common/db/database'
import generateSlug from './common/util/generate-slug'
import { Entity } from './common/types/entities.type'
import convertPlural from './common/util/convert-plural'

@Injectable()
export class AppService {
    getEntities(): Entity[] {
        const entities = listEntities().map((entitiy) => entitiy.replace('Entity', ''))

        return entities.map((entity) => ({
            name: entity,
            slug: convertPlural(generateSlug(entity))
        }))
    }
}
