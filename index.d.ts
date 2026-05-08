/// <reference types="node" />
 
// Extend the NodeJS namespace with Next.js-defined properties
declare namespace NodeJS {
  interface Process {
    /**
     * @deprecated Use `typeof window` instead
     */
    readonly browser: boolean;
  }

}