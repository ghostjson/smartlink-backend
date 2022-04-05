import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator for getting the user object of the authorized user
 */
export const GetCurrentUser = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user[data]
})