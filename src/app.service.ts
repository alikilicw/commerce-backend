import { Injectable } from '@nestjs/common'
import { listEntities } from './common/db/database'

@Injectable()
export class AppService {
    getEntities(): string[] {
        return listEntities()
    }
}
