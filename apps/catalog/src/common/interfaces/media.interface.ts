import { Observable } from 'rxjs';
import { MediaEntity } from '../../items/entities/media.entity';

export interface MediaService {
  GetMedia(getMediaDto: { id: string }): Observable<MediaEntity>;
  GetManyMedia(getManyMediaDto: { ids: Array<string> }): Observable<MediaList>;
}
export interface MediaList {
  payload: Array<MediaEntity>;
}
