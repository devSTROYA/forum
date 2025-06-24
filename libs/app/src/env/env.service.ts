import { Injectable } from '@nestjs/common';
import { ConfigService, Path } from '@nestjs/config';

@Injectable()
export class EnvService<T> {
  constructor(private configService: ConfigService<T, true>) {}

  get<K extends keyof T>(propertyPath: Path<T>): T[K] {
    return this.configService.get(propertyPath, { infer: true });
  }
}
