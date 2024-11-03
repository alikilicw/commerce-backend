import { Injectable } from '@nestjs/common'
import { listEntities } from './common/db/database'

@Injectable()
export class AppService {
    getEntities(): string[] {
        const entities = listEntities().map((entitiy) => entitiy.replace('Entity', ''))
        return entities
    }
}
