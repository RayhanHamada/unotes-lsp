import type { Static, TSchema } from '@sinclair/typebox';
import type {
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify/types/route';
import type { IncomingMessage, Server, ServerResponse } from 'http';

export type ResponseSchema<T extends Record<keyof T, TSchema>> = Static<
  T[keyof T]
>;

export type HandlerGeneric<T extends RouteGenericInterface> = {
  [K in keyof T]: T[K];
};

export type CustomRouteHandler<T extends RouteGenericInterface> =
  RouteHandlerMethod<Server, IncomingMessage, ServerResponse, T>;
