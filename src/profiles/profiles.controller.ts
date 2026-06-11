import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProfilesService } from './profiles.service';
import { ProfileResponseDto } from './dto/profile-response.dto';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @Roles('CUSTOMER', 'ADMIN')
  @ApiOperation({ summary: 'Get profile details of the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: ProfileResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized / Invalid token' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden / Insufficient Access Permission',
  })
  async getProfile(@Req() req: any) {
    return this.profilesService.getProfile(req.user.id);
  }
}
