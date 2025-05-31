import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  Account,
  Auth,
  BigIntPipe,
  Operator,
  Permission,
  PermissionJudge,
} from '@app/decorator';
import { CreateRole } from './dto/create-role.dto';
import { UpdateRole } from './dto/update-role.dto';
import { ApplyDecorator } from '@app/decorator/apply-decorator';
import { RequiredClientAdministrator } from '@app/decorator/required-client-administrator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApplyDecorator(
    Auth(),
    Permission(['AUTH::ROLE::CREATE']),
    RequiredClientAdministrator(
      {
        lhs: { op: Operator.HAS, expr: 'AUTH::*' },
        op: Operator.OR,
        rhs: { op: Operator.HAS, expr: 'AUTH::ROLE::CREATE::*' },
      },
      'body',
      'clientId',
    ),
  )
  @Post('/')
  createRole(@Body() data: CreateRole) {
    return this.roleService.createRole(data);
  }
  @Auth()
  @Permission(['AUTH::ROLE::REMOVE'])
  @RequiredClientAdministrator({
    lhs: {
      op: Operator.HAS,
      expr: 'AUTH::*',
    },
    op: Operator.OR,
    rhs: { op: Operator.HAS, expr: 'AUTH::ROLE::REMOVE::*' },
  })
  @Delete('/:id')
  removeRole(@Param('id', BigIntPipe) id: bigint) {
    return this.roleService.removeRole(id);
  }

  @Auth()
  @Permission(['AUTH::ROLE::UPDATE'])
  @RequiredClientAdministrator(
    {
      lhs: { op: Operator.HAS, expr: 'AUTH::*' },
      op: Operator.OR,
      rhs: { op: Operator.HAS, expr: 'AUTH::ROLE::UPDATE::*' },
    },
    'body',
  )
  @Patch(':id')
  updateRole(
    @Param('id', BigIntPipe) id: bigint,
    @Body() data: UpdateRole,
    @Account('id') actor: string,
    @PermissionJudge({
      lhs: { op: Operator.HAS, expr: 'AUTH::*' },
      op: Operator.OR,
      rhs: { op: Operator.HAS, expr: 'AUTH::ROLE::UPDATE::*' },
    })
    force: boolean,
  ) {
    return this.roleService.updateRole(id, data, BigInt(actor), force);
  }

  @Auth()
  @Get('/:id')
  @Permission(['AUTH::ROLE::QUERY::INFO'])
  @RequiredClientAdministrator({
    lhs: {
      op: Operator.HAS,
      expr: 'AUTH::*',
    },
    op: Operator.OR,
    rhs: { op: Operator.HAS, expr: 'AUTH::ROLE::QUERY::INFO::*' },
  })
  findRoleInfo(@Param('id', BigIntPipe) id: bigint) {
    return this.roleService.findRole(
      { id },
      {
        permission: true,
        parents: {
          select: {
            id: true,
            name: true,
            clientId: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            clientId: true,
          },
        },
      },
    );
  }

  @Auth()
  @Get()
  @Permission(['AUTH::ROLE::QUERY::LIST'])
  @RequiredClientAdministrator({
    lhs: {
      op: Operator.HAS,
      expr: 'AUTH::*',
    },
    op: Operator.OR,
    rhs: { op: Operator.HAS, expr: 'AUTH::ROLE::QUERY::LIST::*' },
  })
  findRoleList(
    @Query('clientId') clientId: string,
    @Query('preId', new BigIntPipe({ optional: true })) preId: bigint,
    @Query('size', new ParseIntPipe({ optional: true })) size: number,
    @PermissionJudge({
      op: Operator.HAS,
      expr: 'AUTH::*',
    })
    getAll: boolean,
    @Query('name') name?: string,
  ) {
    return this.roleService.findRoleList(size, preId, clientId, getAll, name);
  }
}
