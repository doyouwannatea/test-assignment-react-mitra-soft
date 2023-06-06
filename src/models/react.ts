import { ReactNode } from 'react';

export type PropsWithChildren<P = object> = P & { children?: ReactNode };
