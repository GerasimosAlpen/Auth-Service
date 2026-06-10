import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../generated/prisma';

export const Roles = (...roles: (Role | string)[]) => SetMetadata('roles', roles);
