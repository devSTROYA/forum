import { SetMetadata } from '@nestjs/common';

export const permissionActions = ['create', 'read', 'update', 'delete'] as const;
export type PermissionActionValue = (typeof permissionActions)[number];
export const PERMISSION_ACTION_KEY = 'permission-action';
export const PermissionAction = (action: PermissionActionValue) => SetMetadata(PERMISSION_ACTION_KEY, action);
