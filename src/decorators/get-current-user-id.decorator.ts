import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator for getting the user id of the authorized user
 */
export const GetCurrentUserId = createParamDecorator((data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    return request.user['sub']
})