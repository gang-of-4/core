import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { VariantsService } from '../services/variants.service';
import { instanceToPlain } from 'class-transformer';
import { GetManyVariantsDto } from '../dto/variants/get-many-variants.dto';
import { GetVariantDto } from '../dto/variants/get-variant.dto';

@GrpcService()
export class VariantsGrpcService {
  constructor(private readonly variantsService: VariantsService) {}

  @GrpcMethod('VariantsService')
  async GetVariant(getVariantDto: GetVariantDto) {
    const result = await this.variantsService.findOneOrFail(getVariantDto.id);
    return instanceToPlain(result);
  }

  @GrpcMethod('VariantsService')
  async GetManyVariants(getManyVariantsDto: GetManyVariantsDto) {
    const result = await this.variantsService.findManyById(
      getManyVariantsDto.ids,
    );
    const p = {
      payload: result.map((media) => instanceToPlain(media)),
    };
    console.log(p);
    return p;
  }
}
